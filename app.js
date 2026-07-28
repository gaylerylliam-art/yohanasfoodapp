const images = {
  silog: "https://images.unsplash.com/photo-1780130808973-2cbf58cc91e9?auto=format&fit=crop&fm=jpg&q=72&w=900",
  rice: "https://images.unsplash.com/photo-1567030422165-af7ea28f987c?auto=format&fit=crop&fm=jpg&q=72&w=900",
  bowl: "https://images.unsplash.com/photo-1580835267448-536d00f9cd4c?auto=format&fit=crop&fm=jpg&q=72&w=900",
  noodles: "https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?auto=format&fit=crop&fm=jpg&q=72&w=900",
  stirNoodles: "https://images.unsplash.com/photo-1758979690131-11e2aa0b142b?auto=format&fit=crop&fm=jpg&q=72&w=900",
  snacks: "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?auto=format&fit=crop&fm=jpg&q=72&w=900",
  drinks: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&fm=jpg&q=72&w=900",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&fm=jpg&q=72&w=900",
  fries: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&fm=jpg&q=72&w=900",
  pasta: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&fm=jpg&q=72&w=900",
  pack: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&fm=jpg&q=72&w=900",
  beefBulgogi: "assets/menu/beef-bulgogi.jpeg",
  chicksilog: "assets/menu/chicksilog-v2.jpeg",
  chaoFanFriedCarajay: "assets/menu/chao-fan-fried-carajay.png",
  bangsilog: "assets/menu/bangsilog.png",
};

const yohanaPhotoKeys = new Set(["beefBulgogi", "chicksilog", "chaoFanFriedCarajay", "bangsilog"]);

const menu = [
  ["Silog Meals", "Longsilog", 99, "Sweet homemade longganisa, garlic rice and sunny egg.", "silog"],
  ["Silog Meals", "Tapsilog", 99, "Tender beef tapa with garlic rice and egg.", "silog"],
  ["Silog Meals", "Tosilog", 99, "Sweet-savoury tocino, garlic rice and egg.", "silog"],
  ["Silog Meals", "Hotsilog", 99, "Juicy hotdogs, garlic rice and egg.", "silog"],
  ["Silog Meals", "Sisig Silog", 99, "Sizzling-style sisig over garlic rice with egg.", "silog"],
  ["Silog Meals", "Bangsilog", 99, "Crispy boneless bangus, garlic rice and egg.", "bangsilog"],
  ["Silog Meals", "Hamsilog", 99, "Savoury ham, garlic rice and egg.", "silog"],
  ["Silog Meals", "Spamsilog", 99, "Pan-fried Spam, garlic rice and egg.", "silog"],
  ["Silog Meals", "Chicksilog", 120, "Golden fried chicken, garlic rice and egg.", "chicksilog"],
  ["Silog Meals", "Sausagesilog", 120, "Hearty sausage, garlic rice and egg.", "silog"],
  ["Silog Meals", "Beef Bulgogi Silog", 130, "Korean-style sweet beef bulgogi, garlic rice and egg.", "beefBulgogi"],
  ["Silog Meals", "Pork Silog", 165, "Generous pork serving with garlic rice and egg.", "silog"],

  ["Rice Meals", "Sisig Tofu", 99, "Crispy tofu sisig, a meat-free bestseller.", "rice"],
  ["Rice Meals", "Beef Pares", 99, "Slow-braised beef in sweet-savoury sauce with rice.", "rice"],
  ["Rice Meals", "Chicken Teriyaki", 140, "Glazed teriyaki chicken over steaming rice.", "rice"],
  ["Rice Meals", "Crispy Chicken Curry", 145, "Crispy chicken in rich, creamy curry.", "rice"],
  ["Rice Meals", "Crispy Pork Curry", 155, "Crispy pork simmered in fragrant curry.", "rice"],
  ["Rice Meals", "Pork Alaking", 160, "Pork in a creamy, peppery cream sauce.", "rice"],
  ["Rice Meals", "Burger Steak", 165, "Juicy patties smothered in mushroom gravy.", "rice"],
  ["Rice Meals", "Sweet & Sour Chicken", 165, "Crispy chicken in tangy sweet-and-sour sauce.", "rice"],
  ["Rice Meals", "Sweet & Sour Pork", 169, "Crispy pork in tangy sweet-and-sour sauce.", "rice"],
  ["Rice Meals", "Chicken Wings", 169, "Choose Honey Butter, Teriyaki or Buffalo.", "rice"],
  ["Rice Meals", "Sweet & Sour Fish Fillet", 185, "Crispy fillet in tangy sweet-and-sour sauce.", "rice"],

  ["Rice Bowl Special", "Chicken Pastil with Egg", 85, "Mindanao-style shredded chicken pastil topped with egg.", "bowl"],
  ["Rice Bowl Special", "Shawarma Rice", 99, "Shawarma-spiced meat over rice with garlic sauce.", "bowl"],
  ["Rice Bowl Special", "Tofu Tonkatsu", 99, "Crispy panko tofu on a bed of rice.", "bowl"],
  ["Rice Bowl Special", "Pork Katsu", 99, "Thick, crunchy pork katsu with rice.", "bowl"],
  ["Rice Bowl Special", "Chicken Popper", 125, "Bite-sized crispy chicken poppers over rice.", "bowl"],
  ["Rice Bowl Special", "Stir Fry Pork", 199, "Wok-tossed pork with vegetables over rice.", "bowl"],
  ["Rice Bowl Special", "Fish Katsudon", 218, "Crispy fish katsu simmered with egg over rice.", "bowl"],

  ["Chaofan Meals", "Chao Fan - Fried Egg", 65, "Classic fried rice topped with a fried egg.", "bowl"],
  ["Chaofan Meals", "Chao Fan - Shanghai", 75, "Fried rice with crispy lumpiang shanghai.", "bowl"],
  ["Chaofan Meals", "Chao Fan - Siomai", 75, "Fried rice paired with steamed siomai.", "bowl"],
  ["Chaofan Meals", "Chao Fan - Fried Carajay", 80, "Our signature carajay-style fried rice.", "chaoFanFriedCarajay"],

  ["Solo Boodle", "YK SB1", 199, "Fried tilapia, shanghai, red egg, veggies, rice and fruits.", "rice"],
  ["Solo Boodle", "YK SB2", 239, "Fried chicken, hotdog, red egg, veggies, rice and fruits.", "rice"],
  ["Solo Boodle", "YK SB3", 259, "Boneless bangus, shanghai, red egg, veggies, rice and fruits.", "rice"],
  ["Solo Boodle", "YK SB4", 269, "Pork chop, shanghai, red egg, veggies, rice and fruits.", "rice"],
  ["Solo Boodle", "YK SB5", 299, "Buttered shrimp, pork tocino, shanghai, red egg, veggies, rice and fruits.", "rice"],

  ["YK Burger", "Classic Burger", 199, "A straightforward, proper-sized classic burger.", "burger"],
  ["YK Burger", "Original Burger", 239, "The original YK build, stacked and juicy.", "burger"],
  ["YK Burger", "Spicy Burger", 259, "For those who like a bit of heat.", "burger"],
  ["YK Burger", "Special Burger", 269, "Loaded with everything we've got.", "burger"],
  ["YK Burger", "Mushroom Burger", 299, "Smothered in mushrooms, YK's top-tier burger.", "burger"],

  ["Noodles", "Lomi", 60, "Thick noodles in rich broth - beef, pork or chicken.", "noodles", ["R ₱60", "S ₱125", "P ₱260"]],
  ["Noodles", "Mami", 60, "Comforting noodle soup - beef, pork or chicken.", "noodles", ["R ₱60", "S ₱125", "P ₱260"]],
  ["Noodles", "Miki Gisado", 60, "Sauteed miki noodles loaded with veggies.", "stirNoodles", ["R ₱60", "S ₱125", "P ₱260"]],
  ["Noodles", "Bihon Guisado", 85, "Classic sauteed bihon with vegetables and meat.", "stirNoodles", ["R ₱85", "S ₱150", "P ₱350"]],
  ["Noodles", "Canton", 90, "Everyone's favourite pancit canton.", "stirNoodles", ["R ₱90", "S ₱160", "P ₱400"]],
  ["Noodles", "Cabagan", 95, "The Cagayan Valley classic, done right.", "noodles", ["R ₱95", "S ₱145", "P ₱320"]],
  ["Noodles", "Mami Beef Pares", 95, "Beef pares and mami noodles in one bowl.", "noodles", ["R ₱95", "S ₱145", "P ₱269"]],
  ["Noodles", "Palabok", 95, "Rice noodles under thick shrimp-orange sauce.", "stirNoodles", ["R ₱95", "S ₱169", "P ₱450"]],
  ["Noodles", "Miki Stir Fry", 95, "Wok-fried miki with a savoury finish.", "stirNoodles", ["R ₱95"]],
  ["Noodles", "Sotanghon", 99, "Clear, comforting glass-noodle soup.", "noodles", ["R ₱99", "S ₱159", "P ₱450"]],
  ["Noodles", "Batil Patong", 100, "Tuguegarao-style miki topped with egg and crispy bits.", "noodles", ["R ₱100", "S ₱175", "P ₱410"]],
  ["Noodles", "Sotanghon Spicy Noodles", 115, "Glass noodles with a warming kick of heat.", "noodles", ["R ₱115", "S ₱155"]],
  ["Noodles", "Lomi Cabagan", 115, "Cabagan-style lomi, rich and hearty.", "noodles", ["R ₱115", "S ₱175", "P ₱385"]],
  ["Noodles", "Crispy Palabok", 120, "Palabok crowned with extra crispy toppings.", "stirNoodles", ["R ₱120", "S ₱175"]],

  ["Mix Noodles", "Miki - Bihon", 85, "Thick miki and thin bihon tossed together.", "stirNoodles", ["R ₱85", "S ₱145", "P ₱400"]],
  ["Mix Noodles", "Bihon - Canton", 90, "The all-time pancit favourite combination.", "stirNoodles", ["R ₱90", "S ₱150", "P ₱450"]],
  ["Mix Noodles", "Miki - Sotanghon", 95, "Chewy miki meets silky sotanghon.", "stirNoodles", ["R ₱95", "S ₱169", "P ₱425"]],
  ["Mix Noodles", "Canton - Sotanghon", 100, "Canton and glass noodles in one savoury plate.", "stirNoodles", ["R ₱100", "S ₱175", "P ₱450"]],

  ["Healthy Veggy Noodles", "Veggy Lomi", 110, "Veggie-noodle lomi with beef, pork or chicken.", "noodles", ["R ₱110", "S ₱185", "P ₱320"]],
  ["Healthy Veggy Noodles", "Veggy Mami", 110, "Veggie noodle mami in a clean, comforting broth.", "noodles", ["R ₱110", "S ₱185", "P ₱320"]],
  ["Healthy Veggy Noodles", "Canton Gisado", 145, "Sauteed veggie canton loaded with vegetables.", "stirNoodles", ["R ₱145", "S ₱185"]],
  ["Healthy Veggy Noodles", "Cabagan", 165, "Cabagan-style noodles made with veggie canton.", "noodles", ["R ₱165", "S ₱215", "P ₱370"]],
  ["Healthy Veggy Noodles", "Canton Stir Fry", 165, "Wok-fried veggie canton with a savoury finish.", "stirNoodles", ["R ₱165"]],
  ["Healthy Veggy Noodles", "Batil Patong", 170, "Veggie-noodle batil patong with egg and crispy toppings.", "noodles", ["R ₱170", "S ₱245", "P ₱460"]],

  ["Veggie Canton Packs", "Malunggay Veggie Canton (150g)", 50, "Malunggay-infused canton noodles, ready to cook.", "pack"],
  ["Veggie Canton Packs", "Spinach Veggie Canton (150g)", 50, "Spinach canton noodles for a greener plate.", "pack"],
  ["Veggie Canton Packs", "Carrot Veggie Canton (150g)", 50, "Bright carrot canton noodles the kids will eat.", "pack"],
  ["Veggie Canton Packs", "Squash Veggie Canton (150g)", 50, "Golden squash canton noodles.", "pack"],
  ["Veggie Canton Packs", "Saluyot Veggie Canton (150g)", 50, "Saluyot canton noodles, an Ilocano favourite.", "pack"],
  ["Veggie Canton Packs", "Soybeans Veggie Canton (150g)", 50, "Protein-rich soybean canton noodles.", "pack"],
  ["Veggie Canton Packs", "Mix 6-in-1 Pack (240g)", 180, "All six veggie flavours in one 240g pack.", "pack"],

  ["Pasta & Extra Rice", "Spaghetti", 120, "Sweet-style Filipino spaghetti loaded with cheese.", "pasta"],
  ["Pasta & Extra Rice", "Carbonara", 165, "Creamy carbonara with plenty of bacon bits.", "pasta"],
  ["Pasta & Extra Rice", "Plain Rice", 15, "Steamed white rice.", "bowl"],
  ["Pasta & Extra Rice", "Garlic Fried Rice", 25, "Fragrant garlic sinangag.", "bowl"],
  ["Pasta & Extra Rice", "Java Rice", 30, "Golden turmeric-tinted java rice.", "bowl"],
  ["Pasta & Extra Rice", "Chao Fan Rice", 40, "Our house fried rice, on its own.", "bowl"],

  ["French Fries & Snacks", "Regular Fries", 85, "Plain, hot and crispy.", "fries"],
  ["French Fries & Snacks", "Flavoured Fries", 129, "Choose Cheese, Sour Cream or BBQ.", "fries"],
  ["French Fries & Snacks", "Loaded Fries", 165, "Fries piled high with cheese sauce and toppings.", "fries"],
  ["French Fries & Snacks", "Cheesy Nachos", 179, "Crunchy nachos drowned in melted cheese.", "fries"],

  ["Street Foods", "Fish Ball (16 pcs)", 25, "16 pieces with signature sweet-and-spicy sauce.", "snacks"],
  ["Street Foods", "Kikiam (9 pcs)", 25, "9 pieces of crispy, savoury kikiam.", "snacks"],
  ["Street Foods", "Squid Ball (10 pcs)", 30, "10 pieces, freshly fried to order.", "snacks"],
  ["Street Foods", "Shanghai (4 pcs)", 35, "4 pieces of crispy lumpiang shanghai.", "snacks"],
  ["Street Foods", "Big Siomai (4 pcs)", 50, "4 big, meaty siomai with chilli-garlic sauce.", "snacks"],

  ["Drinks & Refreshment", "Halo-Halo Special", 129, "Loaded halo-halo with all the toppings.", "drinks"],
  ["Drinks & Refreshment", "Halo-Halo Regular", 85, "The classic cooler for Solano afternoons.", "drinks"],
  ["Drinks & Refreshment", "Halo-Halo Coffee Special", 129, "Halo-halo with a coffee kick.", "drinks"],
  ["Drinks & Refreshment", "Halo-Halo Coffee Regular", 85, "Coffee halo-halo, regular size.", "drinks"],
  ["Drinks & Refreshment", "Cucumber Lemonade (16 oz)", 75, "Cool cucumber lemonade.", "drinks"],
  ["Drinks & Refreshment", "Carrot Juice Lemonade (16 oz)", 75, "Carrot and lemon, surprisingly refreshing.", "drinks"],
  ["Drinks & Refreshment", "Yakult Lemonade (16 oz)", 70, "Tangy Yakult lemonade.", "drinks"],
  ["Drinks & Refreshment", "Fruit Soda (16 oz)", 49, "Green apple, blueberry, lychee or strawberry.", "drinks"],
  ["Drinks & Refreshment", "Soy Milk", 35, "Fresh soy milk.", "drinks"],
  ["Drinks & Refreshment", "Buko Juice", 30, "Chilled buko juice.", "drinks"],
  ["Drinks & Refreshment", "Softdrinks (8 oz)", 15, "Coke, Royal, Sprite or Pepsi.", "drinks"],
  ["Drinks & Refreshment", "Softdrinks 1 Litre", 50, "1 litre for sharing.", "drinks"],
  ["Drinks & Refreshment", "Bottled Water 500 ml", 20, "Cold bottled water.", "drinks"],
  ["Drinks & Refreshment", "Bottled Water 1 L", 30, "1 litre bottled water.", "drinks"],
].map(([category, name, price, description, imageKey, options], index) => ({
  id: `item-${index}`,
  category,
  name,
  price,
  description,
  image: images[imageKey],
  isYohanaPhoto: yohanaPhotoKeys.has(imageKey),
  options: options || null,
}));

const categories = ["All", ...new Set(menu.map((item) => item.category))];
const state = {
  category: "All",
  search: "",
  cart: new Map(),
  ratings: new Map(),
};

const categoryStrip = document.querySelector("#categoryStrip");
const menuGrid = document.querySelector("#menuGrid");
const searchInput = document.querySelector("#searchInput");
const cartPanel = document.querySelector("#cartPanel");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const checkoutButton = document.querySelector("#checkoutButton");
const checkoutDialog = document.querySelector("#checkoutDialog");
const checkoutForm = document.querySelector("#checkoutForm");
const toast = document.querySelector("#toast");
const API_BASE = window.location.protocol === "file:" ? "http://localhost:4174" : "";

function peso(value) {
  return `₱${value.toLocaleString("en-PH")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getRatingSummary(itemId) {
  return state.ratings.get(itemId) || { average: 0, count: 0, comments: [] };
}

function renderStars(value) {
  const rounded = Math.round(Number(value || 0));
  return Array.from({ length: 5 }, (_, index) => (index < rounded ? "★" : "☆")).join("");
}

function renderCategories() {
  categoryStrip.innerHTML = categories
    .map(
      (category) => `
        <button class="category-button ${category === state.category ? "active" : ""}" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
}

function getVisibleItems() {
  const query = state.search.trim().toLowerCase();
  return menu.filter((item) => {
    const matchesCategory = state.category === "All" || item.category === state.category;
    const matchesSearch = !query || `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
}

function renderMenu() {
  const visibleItems = getVisibleItems();
  menuGrid.innerHTML = visibleItems
    .map((item) => {
      const rating = getRatingSummary(item.id);
      return `
        <article class="menu-card">
          <div class="food-photo">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <span class="sample-pill">${item.isYohanaPhoto ? "Yohana's photo" : "Sample photo"}</span>
          </div>
          <div class="card-body">
            <div class="card-top">
              <div>
                <h3>${item.name}</h3>
                <span class="category-name">${item.category}</span>
              </div>
              <strong class="price">${peso(item.price)}</strong>
            </div>
            <p class="description">${item.description}</p>
            ${item.options ? `<div class="option-row">${item.options.map((option) => `<span class="option-chip">${option}</span>`).join("")}</div>` : ""}
            <div class="rating-summary">
              <strong>${renderStars(rating.average)}</strong>
              <span>${rating.count ? `${rating.average}/5 from ${rating.count} rating${rating.count === 1 ? "" : "s"}` : "No ratings yet"}</span>
            </div>
            <form class="rating-form" data-rating-form="${item.id}">
              <label>
                Stars
                <select name="stars" required>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Okay</option>
                  <option value="2">2 - Needs improvement</option>
                  <option value="1">1 - Lowest</option>
                </select>
              </label>
              <label>
                Comment
                <textarea name="comment" rows="2" placeholder="Share a short comment"></textarea>
              </label>
              <button class="secondary-button" type="submit">Rate food</button>
            </form>
            ${
              rating.comments?.length
                ? `<div class="comment-list">${rating.comments
                    .map(
                      (comment) => `
                        <div class="comment-item">
                          <strong>${renderStars(comment.stars)} ${escapeHtml(comment.name || "Guest")}</strong>
                          <p>${escapeHtml(comment.comment || "No comment added.")}</p>
                        </div>
                      `,
                    )
                    .join("")}</div>`
                : ""
            }
            <button class="add-button" data-id="${item.id}">Add to cart</button>
          </div>
        </article>
      `;
    })
    .join("");

  if (!visibleItems.length) {
    menuGrid.innerHTML = `<div class="notice"><strong>No matches found.</strong><span>Try another dish name or category.</span></div>`;
  }
}

function getCartLines() {
  return [...state.cart.entries()].map(([id, qty]) => ({
    ...menu.find((item) => item.id === id),
    qty,
  }));
}

function renderCart() {
  const lines = getCartLines();
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.qty * line.price, 0);

  cartCount.textContent = count;
  cartTotal.textContent = peso(total);
  checkoutButton.disabled = !count;
  cartEmpty.hidden = !!count;
  cartItems.hidden = !count;
  cartItems.innerHTML = lines
    .map(
      (line) => `
        <div class="cart-line">
          <div>
            <h3>${line.name}</h3>
            <small>${peso(line.price)} each</small>
          </div>
          <div class="qty-control" aria-label="Quantity for ${line.name}">
            <button data-dec="${line.id}" aria-label="Decrease ${line.name}">-</button>
            <span>${line.qty}</span>
            <button data-inc="${line.id}" aria-label="Increase ${line.name}">+</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function addToCart(id) {
  state.cart.set(id, (state.cart.get(id) || 0) + 1);
  renderCart();
  showToast("Added to cart.");
}

function changeQty(id, delta) {
  const nextQty = (state.cart.get(id) || 0) + delta;
  if (nextQty <= 0) {
    state.cart.delete(id);
  } else {
    state.cart.set(id, nextQty);
  }
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }
  return payload;
}

async function loadRatings() {
  try {
    const payload = await apiFetch("/api/ratings");
    state.ratings = new Map(payload.ratings.map((rating) => [rating.itemId, rating]));
    renderMenu();
  } catch (error) {
    showToast("Start the server to load ratings.");
  }
}

async function submitRating(itemId, form) {
  const item = menu.find((menuItem) => menuItem.id === itemId);
  const formData = new FormData(form);
  const payload = await apiFetch("/api/ratings", {
    method: "POST",
    body: JSON.stringify({
      itemId,
      itemName: item.name,
      stars: Number(formData.get("stars")),
      name: "Customer",
      comment: formData.get("comment"),
    }),
  });
  state.ratings = new Map(payload.ratings.map((rating) => [rating.itemId, rating]));
  form.reset();
  renderMenu();
  showToast("Rating saved.");
}

categoryStrip.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderMenu();
});

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (!button) return;
  addToCart(button.dataset.id);
});

menuGrid.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-rating-form]");
  if (!form) return;
  event.preventDefault();
  try {
    await submitRating(form.dataset.ratingForm, form);
  } catch (error) {
    showToast(error.message);
  }
});

cartItems.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderMenu();
});

document.querySelector("#openCart").addEventListener("click", () => cartPanel.classList.add("open"));
document.querySelector("#closeCart").addEventListener("click", () => cartPanel.classList.remove("open"));
checkoutButton.addEventListener("click", () => checkoutDialog.showModal());

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const lines = getCartLines();
  try {
    const payload = await apiFetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        customer: {
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
        },
        fulfillment: formData.get("fulfillment"),
        address: formData.get("address"),
        payment: {
          method: "GCash",
          reference: formData.get("gcash"),
        },
        items: lines.map((line) => ({
          id: line.id,
          name: line.name,
          quantity: line.qty,
          price: line.price,
        })),
      }),
    });
    state.cart.clear();
    checkoutForm.reset();
    checkoutDialog.close();
    renderCart();
    showToast(`Order ${payload.order.reference} received. Notification prepared.`);
  } catch (error) {
    showToast(error.message);
  }
});

renderCategories();
renderMenu();
renderCart();
loadRatings();
