const fs = require("fs");
const http = require("http");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

const PORT = Number(process.env.PORT || 4174);
const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "db.json");
const PUBLIC_FILES = new Set(["/", "/index.html", "/styles.css", "/app.js", "/record-walkthrough.js"]);

function ensureDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ orders: [], ratings: [], notifications: [] }, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDb(db) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function money(value) {
  return `PHP ${Number(value || 0).toLocaleString("en-PH")}`;
}

function makeOrderReference() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `YK-${ymd}-${suffix}`;
}

function summarizeOrder(order) {
  const lines = order.items
    .map((item) => `${item.quantity}x ${item.name} - ${money(item.lineTotal)}`)
    .join("\n");
  return [
    `Order Reference: ${order.reference}`,
    `Customer: ${order.customer.name}`,
    `Mobile: ${order.customer.phone}`,
    order.customer.email ? `Email: ${order.customer.email}` : null,
    `Order Type: ${order.fulfillment}`,
    order.address ? `Address/Note: ${order.address}` : null,
    "",
    "Order Summary:",
    lines,
    "",
    `Amount: ${money(order.total)}`,
    `Payment: ${order.payment.method}`,
    `GCash Reference: ${order.payment.reference}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function sendSmsViaTwilio(to, message) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    return { sent: false, provider: "outbox", reason: "Twilio environment variables are not configured." };
  }

  const body = new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: message }).toString();
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  const options = {
    method: "POST",
    hostname: "api.twilio.com",
    path: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    headers: {
      authorization: `Basic ${auth}`,
      "content-type": "application/x-www-form-urlencoded",
      "content-length": Buffer.byteLength(body),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({
          sent: res.statusCode >= 200 && res.statusCode < 300,
          provider: "twilio",
          statusCode: res.statusCode,
          response: data.slice(0, 600),
        }),
      );
    });
    req.on("error", (error) => resolve({ sent: false, provider: "twilio", error: error.message }));
    req.write(body);
    req.end();
  });
}

async function sendEmail(to, subject, message) {
  if (!to) {
    return { sent: false, provider: "outbox", reason: "No customer email was provided." };
  }
  const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;
  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
    return { sent: false, provider: "outbox", reason: "SendGrid environment variables are not configured." };
  }

  const body = JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: SENDGRID_FROM_EMAIL, name: "Yohana's Kitchenette" },
    subject,
    content: [{ type: "text/plain", value: message }],
  });

  const options = {
    method: "POST",
    hostname: "api.sendgrid.com",
    path: "/v3/mail/send",
    headers: {
      authorization: `Bearer ${SENDGRID_API_KEY}`,
      "content-type": "application/json",
      "content-length": Buffer.byteLength(body),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({
          sent: res.statusCode >= 200 && res.statusCode < 300,
          provider: "sendgrid",
          statusCode: res.statusCode,
          response: data.slice(0, 600),
        }),
      );
    });
    req.on("error", (error) => resolve({ sent: false, provider: "sendgrid", error: error.message }));
    req.write(body);
    req.end();
  });
}

async function notifyCustomer(order) {
  const summary = summarizeOrder(order);
  const smsMessage = `Yohana's Kitchenette ${order.reference}: ${money(order.total)} paid by GCash (${order.payment.reference}). Thank you.`;
  const smsResult = await sendSmsViaTwilio(order.customer.phone, smsMessage);
  const emailResult = await sendEmail(
    order.customer.email,
    `Yohana's Kitchenette Order ${order.reference}`,
    summary,
  );
  return { summary, channels: { sms: smsResult, email: emailResult } };
}

function ratingsSummary(ratings) {
  const grouped = {};
  for (const rating of ratings) {
    grouped[rating.itemId] ||= { itemId: rating.itemId, average: 0, count: 0, comments: [] };
    grouped[rating.itemId].count += 1;
    grouped[rating.itemId].average += rating.stars;
    grouped[rating.itemId].comments.push({
      name: rating.name,
      comment: rating.comment,
      stars: rating.stars,
      createdAt: rating.createdAt,
    });
  }
  return Object.values(grouped).map((entry) => ({
    ...entry,
    average: Number((entry.average / entry.count).toFixed(1)),
    comments: entry.comments.slice(-3).reverse(),
  }));
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname === "/" ? "/index.html" : url.pathname;
  const isWalkthrough = route.endsWith(".mp4") || route.endsWith(".webm");
  const isMenuPhoto = route.startsWith("/assets/menu/") && /\.(?:jpe?g|png)$/i.test(route);
  if (!PUBLIC_FILES.has(url.pathname) && !isWalkthrough && !isMenuPhoto) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const filePath = path.join(__dirname, route.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  const type =
    ext === ".html"
      ? "text/html; charset=utf-8"
      : ext === ".css"
        ? "text/css; charset=utf-8"
        : ext === ".js"
          ? "application/javascript; charset=utf-8"
        : ext === ".mp4"
          ? "video/mp4"
          : ext === ".jpeg" || ext === ".jpg"
            ? "image/jpeg"
            : ext === ".png"
              ? "image/png"
          : "video/webm";
  res.writeHead(200, { "content-type": type });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      });
      res.end();
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/ratings") {
      const db = readDb();
      sendJson(res, 200, { ratings: ratingsSummary(db.ratings) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/ratings") {
      const body = await readBody(req);
      const stars = Number(body.stars);
      if (!body.itemId || !body.itemName || !Number.isInteger(stars) || stars < 1 || stars > 5) {
        sendJson(res, 400, { error: "A food item and 1-5 star rating are required." });
        return;
      }
      const db = readDb();
      const rating = {
        id: crypto.randomUUID(),
        itemId: String(body.itemId),
        itemName: String(body.itemName).slice(0, 120),
        stars,
        name: String(body.name || "Guest").slice(0, 80),
        comment: String(body.comment || "").slice(0, 600),
        createdAt: new Date().toISOString(),
      };
      db.ratings.push(rating);
      writeDb(db);
      sendJson(res, 201, { rating, ratings: ratingsSummary(db.ratings) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/orders") {
      const body = await readBody(req);
      if (!body.customer?.name || !body.customer?.phone || !body.payment?.reference || !Array.isArray(body.items)) {
        sendJson(res, 400, { error: "Customer name, phone, GCash reference, and items are required." });
        return;
      }
      const items = body.items
        .map((item) => ({
          id: String(item.id || ""),
          name: String(item.name || "").slice(0, 120),
          quantity: Math.max(1, Number(item.quantity || 1)),
          price: Math.max(0, Number(item.price || 0)),
        }))
        .filter((item) => item.id && item.name && item.price > 0);
      if (!items.length) {
        sendJson(res, 400, { error: "Order must include at least one valid food item." });
        return;
      }
      const normalizedItems = items.map((item) => ({ ...item, lineTotal: item.price * item.quantity }));
      const total = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
      const order = {
        id: crypto.randomUUID(),
        reference: makeOrderReference(),
        createdAt: new Date().toISOString(),
        customer: {
          name: String(body.customer.name).slice(0, 100),
          phone: String(body.customer.phone).slice(0, 40),
          email: String(body.customer.email || "").slice(0, 160),
        },
        fulfillment: String(body.fulfillment || "Pickup").slice(0, 40),
        address: String(body.address || "").slice(0, 300),
        items: normalizedItems,
        total,
        payment: {
          method: "GCash",
          reference: String(body.payment.reference).slice(0, 120),
          amount: total,
        },
        status: "received",
      };
      const notification = await notifyCustomer(order);
      const db = readDb();
      db.orders.push(order);
      db.notifications.push({
        id: crypto.randomUUID(),
        orderReference: order.reference,
        createdAt: new Date().toISOString(),
        ...notification,
      });
      writeDb(db);
      sendJson(res, 201, { order, notification });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/orders") {
      const db = readDb();
      sendJson(res, 200, { orders: db.orders.slice().reverse() });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(PORT, () => {
  ensureDb();
  console.log(`Yohana's Kitchenette app is running at http://localhost:${PORT}`);
});
