// Mendapatkan cart dari localStorage atau membuat cart kosong jika belum ada
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menambahkan produk ke cart
function addToCart(id, name, price, image) {
  const quantity = parseInt(document.getElementById(`quantity-${id}`).value);
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id, name, price, quantity, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Menampilkan alert bahwa produk berhasil ditambahkan
  alert(`Add ${quantity} ${name} to cart!`);

  // Memperbarui notifikasi jumlah produk di keranjang
  updateCartNotification();
}

//---------------------------------------------------
// Fungsi untuk menampilkan produk di cart (dipanggil dari cart.html)
function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-summary").innerHTML = ""; // Clear summary when cart is empty
    return;
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  let cartHTML = "";

  cart.forEach((item, index) => {
    cartHTML += `
      <div class="cart-item">
       <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;" />
      <p><strong>${item.name}</strong></p>
      <p>Price: Rp ${item.price.toLocaleString("id-ID")}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p>
      <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
      </div>
    `;

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartContainer.innerHTML = cartHTML;

  document.getElementById("total-quantity").innerHTML = `Total Quantity: ${totalQuantity}`;
  document.getElementById("total-price").innerHTML = `Total Price: Rp ${totalPrice.toLocaleString("id-ID")}`;

  return totalPrice;
}

// Fungsi untuk memperbarui jumlah produk di header
function updateCartNotification() {
  // Ambil data cart dari localStorage saat memperbarui notifikasi
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-notification").textContent = `🛒 ${totalItems} items`;
}

//---------------------------------------------------
// Fungsi untuk menghapus satu item di cart
function removeFromCart(index) {
  // Hapus item dari cart
  cart.splice(index, 1); // Menghapus item dari cart berdasarkan index
  // Simpan cart yang diperbarui ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart)); // Simpan perubahan ke localStorage
  displayCart(); // Perbarui tampilan keranjang
  updateCartNotification(); // Perbarui notifikasi jumlah produk di keranjang
}

// Fungsi untuk menghapus semua produk di cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart(); // Refresh tampilan cart
  updateCartNotification();

  // Set total quantity dan total price ke 0 setelah keranjang dikosongkan
  document.getElementById("total-quantity").innerHTML = 0;
  document.getElementById("total-price").innerHTML = "0";
}

//---------------------------------------------------

// Panggil displayCart saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  displayCart();
  updateCartNotification();
});
