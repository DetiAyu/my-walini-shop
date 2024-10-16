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
        <p>Price: Rp ${product.price.toLocaleString("id-ID")}</p>
        <br>  
        <div class="quantity-control">
          <label for="quantity-${product.id}">Quantity: </label>
          <select id="quantity-${product.id}">
            ${generateQuantityOptions()}
          </select>
        </div>
        <br>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
      </div>
    `;
  });
  // Masukkan HTML yang dihasilkan ke dalam elemen `product-list`
  productList.innerHTML = productsHTML;
}

document.addEventListener("DOMContentLoaded", displayProducts);

//--------------------------------------------------

// Fungsi untuk menghasilkan opsi kuantitas 1 sampai 10
function generateQuantityOptions() {
  let optionsHTML = "";

  for (let i = 1; i <= 10; i++) {
    optionsHTML += `<option value="${i}">${i}</option>`;
  }

  return optionsHTML;
}

//--------------------------------------------------

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

//--------------------------------------------------

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
      <p>Price: <br>Rp ${item.price.toLocaleString("id-ID")}</p>
      <p>Quantity: <br>${item.quantity}</p>
      <p>Total: <br>Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p>
      <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
    `;

    cartContainer.appendChild(productElement);

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-quantity").textContent = totalQuantity;
  document.getElementById("total-price").textContent = totalPrice.toLocaleString("id-ID");
  return totalPrice;
}

//--------------------------------------------------

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
  document.getElementById("total-price").textContent = "0";
}

// Panggil displayCart saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayCart);

//--------------------------------------------------

function showShippingOptions() {
  const shippingOptionsContainer = document.getElementById("shipping-options");

  // Pilihan pengiriman (harga dan tanggal)
  const shippingOptions = `
    <h3>Pilih Opsi Pengiriman:</h3>
    <div>
      <input type="radio" id="option1" name="shipping" value="10000" />
      <label for="option1">Pengiriman Ekonomi - Rp 10.000 (2-3 hari)</label><br>
      
      <input type="radio" id="option2" name="shipping" value="20000" />
      <label for="option2">Pengiriman Reguler - Rp 20.000 (1-2 hari)</label><br>
      
      <input type="radio" id="option3" name="shipping" value="30000" />
      <label for="option3">Pengiriman Express - Rp 30.000 (1 hari)</label><br>
    </div>
  `;

  // Menambahkan pilihan pengiriman ke dalam elemen
  shippingOptionsContainer.innerHTML = shippingOptions;

  // Tambahkan event listener ke setiap pilihan pengiriman
  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", calculateTotalPrice);
  });
}

// Fungsi untuk menghitung total harga
function calculateTotalPrice() {
  const totalPrice = displayCart();
  const selectedShipping = document.querySelector('input[name="shipping"]:checked');
  if (selectedShipping) {
    const shippingCost = parseInt(selectedShipping.value);
    const totalPriceShipping = totalPrice + shippingCost;

    // Format total harga ke dalam format rupiah
    document.getElementById("total-price-shipping").textContent = `Total Price and Shipping: Rp ${totalPriceShipping.toLocaleString("id-ID")}`;
  }
}
