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
  alert(`${quantity} ${name} berhasil ditambahkan ke keranjang!`);
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

  cart.forEach((item, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");

    productElement.innerHTML = `
       <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;" />
      <p><strong>${item.name}</strong></p>
      <p>Price: Rp ${item.price.toLocaleString("id-ID")}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p>
      <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
    `;

    cartContainer.appendChild(productElement);

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("cart-summary").innerHTML = `Total Quantity: ${totalQuantity} <br> Total Price: Rp ${totalPrice.toLocaleString("id-ID")}`;
  return totalPrice;
}

//---------------------------------------------------
// Fungsi untuk menghapus satu item di cart
function removeFromCart(index) {
  // Hapus item dari cart
  cart.splice(index, 1);
  // Simpan cart yang diperbarui ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh tampilan cart
}

// Fungsi untuk menghapus semua produk di cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart(); // Refresh tampilan cart

  // Set total quantity dan total price ke 0 setelah keranjang dikosongkan
  document.getElementById("total-quantity").innerHTML = 0;
  document.getElementById("total-price").innerHTML = "0";
}

//---------------------------------------------------
// Panggil displayCart saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayCart);
