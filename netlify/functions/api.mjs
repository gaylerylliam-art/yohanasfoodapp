import { getStore } from "@netlify/blobs";
import { randomBytes, randomUUID } from "node:crypto";
import https from "node:https";

const store = getStore({ name: "yohanas-kitchenette", consistency: "strong" });
const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
};

function json(status, payload) {
  return new Response(JSON.stringify(payload), { status, headers: jsonHeaders });
}

function money(value) {
  return `PHP ${Number(value || 0).toLocaleString("en-PH")}`;
}

function makeOrderReference() {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `YK-${ymd}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function env(name) {
  return globalThis.Netlify?.env?.get(name) || process.env[name] || "";
}

async function listRecords(prefix) {
  const { blobs } = await store.list({ prefix });
  const records = await Promise.all(blobs.map(({ key }) => store.get(key, { type: "json" })));
  return records.filter(Boolean);
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
    comments: entry.comments.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3),
  }));
}

function summarizeOrder(order) {
  const lines = order.items.map((item) => `${item.quantity}x ${item.name} - ${money(item.lineTotal)}`).join("\n");
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
  ].filter((line) => line !== null).join("\n");
}

function postJson({ hostname, path, headers, body }) {
  return new Promise((resolve) => {
    const request = https.request({ method: "POST", hostname, path, headers }, (response) => {
      let data = "";
      response.on("data", (chunk) => (data += chunk));
      response.on("end", () => resolve({
        sent: response.statusCode >= 200 && response.statusCode < 300,
        statusCode: response.statusCode,
        response: data.slice(0, 600),
      }));
    });
    request.on("error", (error) => resolve({ sent: false, error: error.message }));
    request.write(body);
    request.end();
  });
}

async function sendSms(to, message) {
  const accountSid = env("TWILIO_ACCOUNT_SID");
  const authToken = env("TWILIO_AUTH_TOKEN");
  const from = env("TWILIO_FROM_NUMBER");
  if (!accountSid || !authToken || !from) return { sent: false, provider: "outbox", reason: "Twilio is not configured." };
  const body = new URLSearchParams({ To: to, From: from, Body: message }).toString();
  const result = await postJson({
    hostname: "api.twilio.com",
    path: `/2010-04-01/Accounts/${accountSid}/Messages.json`,
    headers: {
      authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
      "content-length": Buffer.byteLength(body),
    },
    body,
  });
  return { provider: "twilio", ...result };
}

async function sendEmail(to, subject, message) {
  const apiKey = env("SENDGRID_API_KEY");
  const from = env("SENDGRID_FROM_EMAIL");
  if (!to) return { sent: false, provider: "outbox", reason: "No customer email was provided." };
  if (!apiKey || !from) return { sent: false, provider: "outbox", reason: "SendGrid is not configured." };
  const body = JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from, name: "Yohana's Kitchenette" },
    subject,
    content: [{ type: "text/plain", value: message }],
  });
  const result = await postJson({
    hostname: "api.sendgrid.com",
    path: "/v3/mail/send",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "content-length": Buffer.byteLength(body),
    },
    body,
  });
  return { provider: "sendgrid", ...result };
}

async function notifyCustomer(order) {
  const summary = summarizeOrder(order);
  const sms = await sendSms(order.customer.phone, `Yohana's Kitchenette ${order.reference}: ${money(order.total)} paid by GCash (${order.payment.reference}). Thank you.`);
  const email = await sendEmail(order.customer.email, `Yohana's Kitchenette Order ${order.reference}`, summary);
  return { summary, channels: { sms, email } };
}

async function readRequest(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

async function handleRatings(req) {
  if (req.method === "GET") return json(200, { ratings: ratingsSummary(await listRecords("ratings/")) });
  if (req.method !== "POST") return json(405, { error: "Method not allowed." });

  const body = await readRequest(req);
  const stars = Number(body.stars);
  if (!body.itemId || !body.itemName || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return json(400, { error: "A food item and 1-5 star rating are required." });
  }
  const rating = {
    id: randomUUID(),
    itemId: String(body.itemId),
    itemName: String(body.itemName).slice(0, 120),
    stars,
    name: String(body.name || "Guest").slice(0, 80),
    comment: String(body.comment || "").slice(0, 600),
    createdAt: new Date().toISOString(),
  };
  await store.setJSON(`ratings/${rating.createdAt}-${rating.id}`, rating);
  return json(201, { rating, ratings: ratingsSummary(await listRecords("ratings/")) });
}

async function handleOrders(req) {
  if (req.method === "GET") {
    const orders = await listRecords("orders/");
    return json(200, { orders: orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  }
  if (req.method !== "POST") return json(405, { error: "Method not allowed." });

  const body = await readRequest(req);
  if (!body.customer?.name || !body.customer?.phone || !body.payment?.reference || !Array.isArray(body.items)) {
    return json(400, { error: "Customer name, phone, GCash reference, and items are required." });
  }
  const items = body.items.map((item) => ({
    id: String(item.id || ""),
    name: String(item.name || "").slice(0, 120),
    quantity: Math.max(1, Number(item.quantity || 1)),
    price: Math.max(0, Number(item.price || 0)),
  })).filter((item) => item.id && item.name && item.price > 0);
  if (!items.length) return json(400, { error: "Order must include at least one valid food item." });

  const normalizedItems = items.map((item) => ({ ...item, lineTotal: item.price * item.quantity }));
  const total = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const order = {
    id: randomUUID(),
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
    payment: { method: "GCash", reference: String(body.payment.reference).slice(0, 120), amount: total },
    status: "received",
  };
  const notification = await notifyCustomer(order);
  const notificationRecord = {
    id: randomUUID(),
    orderReference: order.reference,
    createdAt: new Date().toISOString(),
    ...notification,
  };
  await Promise.all([
    store.setJSON(`orders/${order.createdAt}-${order.id}`, order),
    store.setJSON(`notifications/${notificationRecord.createdAt}-${notificationRecord.id}`, notificationRecord),
  ]);
  return json(201, { order, notification });
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { ...jsonHeaders, "access-control-allow-methods": "GET, POST, OPTIONS" },
    });
  }
  const path = new URL(req.url).pathname;
  if (path === "/api/ratings") return handleRatings(req);
  if (path === "/api/orders") return handleOrders(req);
  return json(404, { error: "Not found." });
};

export const config = {
  path: ["/api/ratings", "/api/orders"],
};
