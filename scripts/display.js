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

// Fungsi untuk menghasilkan opsi kuantitas 1 sampai 10
function generateQuantityOptions() {
  let optionsHTML = "";

  for (let i = 1; i <= 10; i++) {
    optionsHTML += `<option value="${i}">${i}</option>`;
  }

  return optionsHTML;
}

// Event listener untuk menampilkan produk saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayProducts);
