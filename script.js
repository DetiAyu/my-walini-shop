// Array produk
const products = [
  { id: 1, name: "Walini Black", price: 25.99, image: "images/WaliniBlack.jpg" },
  { id: 2, name: "Walini Green", price: 30.99, image: "images/WaliniGreen.jpg" },
  { id: 3, name: "Walini Lemon", price: 15.99, image: "images/WaliniLemon.jpg" },
];

function displayProducts() {
  const productList = document.getElementById("product-list");

  // Buat variabel kosong untuk menampung HTML dari produk
  let productsHTML = "";

  // Gunakan forEach untuk iterasi melalui array products
  products.forEach((product) => {
    productsHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px;" />
        <h3>${product.name}</h3>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
      </div>
    `;
  });
  // Masukkan HTML yang dihasilkan ke dalam elemen `product-list`
  productList.innerHTML = productsHTML;
}

document.addEventListener("DOMContentLoaded", displayProducts);

// Mendapatkan cart dari localStorage atau membuat cart kosong jika belum ada
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menambahkan produk ke cart
function addToCart(id, name, price, image) {
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Menampilkan alert bahwa produk berhasil ditambahkan
  alert(`${name} berhasil ditambahkan ke keranjang!`);
}

// Fungsi untuk menampilkan produk di cart (dipanggil dari cart.html)
function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");

    productElement.innerHTML = `
       <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;" />
      <p><strong>${item.name}</strong></p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
      <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
    `;

    cartContainer.appendChild(productElement);

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-quantity").textContent = totalQuantity;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
  // Hapus item dari cart
  cart.splice(index, 1);

  // Simpan cart yang diperbarui ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Tampilkan cart yang diperbarui
  displayCart();
}

// Fungsi untuk menghapus semua produk di cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart(); // Refresh tampilan cart

  // Set total quantity dan total price ke 0 setelah keranjang dikosongkan
  document.getElementById("total-quantity").textContent = 0;
  document.getElementById("total-price").textContent = "0.00";
}

// Panggil displayCart saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayCart);

// Fungsi untuk pergi ke halaman checkout (placeholder)
function goToCheckout() {
  alert("Checkout functionality is not implemented yet.");
}

// Jika berada di halaman cart.html, panggil displayCart()
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
