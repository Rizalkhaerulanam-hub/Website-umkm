// 1. Mengambil elemen berdasarkan ID yang baru (sesuai HTML dosen)
const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview");

// 2. Menjalankan fungsi saat tombol Kirim ditekan
form.addEventListener("submit", (event) => {
  // Mencegah halaman me-refresh otomatis
  event.preventDefault();

  // 3. Mengambil data dari form
  const data = new FormData(form);

  // 4. Menampilkan data ke dalam kotak <pre>
  // menggunakan .join("\n") untuk memberikan jarak (Enter) antar baris
  preview.textContent = [
    "Nama: " + data.get("nama"),
    "Email: " + data.get("email"),
    "Paket: " + data.get("paket"),
    "Topik: " + data.get("topik"),
    "Pesan: " + data.get("pesan"),
  ].join("\n");
});
