//Fungsi untuk memilih harga dan tanggal pengiriman

function showShippingOptions() {
  const shippingOptionsContainer = document.getElementById("shipping-options");

  // Fungsi untuk menghitung tanggal pengiriman berdasarkan jumlah hari dari hari ini
  function calculateDeliveryDate(days) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);

    // Format tanggal dalam bahasa Indonesia
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return deliveryDate.toLocaleDateString("en-US", options);
  }

  // Pilihan pengiriman (harga dan tanggal)
  const shippingOptions = `
      <h3>Choose Delivery Option:</h3>
      <div id= delivery-option>
        <input type="radio" id="option1" name="shipping" value="10000" />
        <label for="option1">Economy - Rp 10.000 (Arrive: ${calculateDeliveryDate(3)})</label><br>
        
        <input type="radio" id="option2" name="shipping" value="20000" />
        <label for="option2">Regular - Rp 20.000 (Arrive: ${calculateDeliveryDate(2)})</label><br>
        
        <input type="radio" id="option3" name="shipping" value="30000" />
        <label for="option3">Express - Rp 30.000 (Arrive: ${calculateDeliveryDate(1)})</label><br>
      </div>
    `;

  // Menambahkan pilihan pengiriman ke dalam elemen
  shippingOptionsContainer.innerHTML = shippingOptions;

  // Tambahkan event listener ke setiap pilihan pengiriman
  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", calculateTotalPrice);
  });
}

//---------------------------------------------------
// Fungsi untuk menghitung total harga
function calculateTotalPrice() {
  const totalPrice = displayCart();
  const selectedShipping = document.querySelector('input[name="shipping"]:checked');
  if (selectedShipping) {
    const shippingCost = parseInt(selectedShipping.value);
    const totalPriceShipping = totalPrice + shippingCost;

    // Ambil teks label yang berisi informasi tanggal pengiriman
    const selectedShippingLabel = document.querySelector(`label[for="${selectedShipping.id}"]`).innerHTML;

    // Pecah teks label menggunakan tanda kurung "(" dan ")" lalu ambil bagian yang mengandung tanggal
    const labelParts = selectedShippingLabel.split("(Arrive: ");
    const deliveryDate = labelParts[1].split(")")[0]; // Ambil tanggal di antara tanda kurung

    // Format total harga ke dalam format rupiah
    document.getElementById("total-price-shipping").innerHTML = `Total Price and Shipping: Rp ${totalPriceShipping.toLocaleString("id-ID")} <br>(Arrive: ${deliveryDate})`;
  }
}
