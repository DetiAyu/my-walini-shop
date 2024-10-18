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
          <p>${product.type}</p>
          <h4>Price: Rp ${product.price.toLocaleString("id-ID")}</h4> 
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

// Fungsi untuk mengirim komentar
function submitComment() {
  const comment = document.getElementById("user-comment").value;

  // Validasi agar tidak mengirim komentar kosong
  if (comment.trim() === "") {
    alert("Comment cannot be empty!");
    return;
  }

  // Tambahkan komentar ke localStorage (untuk menyimpan komentar)
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  // Reset textarea setelah mengirim
  document.getElementById("user-comment").value = "";

  // Tampilkan komentar yang telah dikirim
  displayComments();
}

// Fungsi untuk menampilkan semua komentar
function displayComments() {
  const commentList = document.getElementById("comment-list");
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Kosongkan daftar komentar sebelum menambahkan komentar baru
  commentList.innerHTML = "";

  // Tampilkan setiap komentar di dalam <ul>
  comments.forEach((comment, index) => {
    const li = document.createElement("li");
    li.textContent = comment;

    // Tambahkan tombol hapus untuk setiap komentar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = function () {
      deleteComment(index);
    };

    li.appendChild(deleteButton); // Tambahkan tombol delete ke dalam list item

    commentList.appendChild(li);
  });
}

// Fungsi untuk menghapus komentar
function deleteComment(index) {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Hapus komentar berdasarkan index
  comments.splice(index, 1);

  // Update localStorage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Tampilkan kembali komentar yang sudah diperbarui
  displayComments();
}

// Tampilkan komentar saat halaman dimuat
window.onload = function () {
  displayComments();
};

// Event listener untuk menampilkan produk saat halaman dimuat

document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  updateCartNotification();
});
