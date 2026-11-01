"use strict";

console.log("P09 JavaScript aktif");

const namaToko = "Saudi Coffee";
const biayakemasan = 2000;

let jumlahprodukaktif = 0;
jumlahprodukaktif = jumlahprodukaktif + 1;

const produkutama = {
  nama: "Arabian Qahwa",
  kategori: "Kopi",
  harga: 25000,
  stok: 10,
  unggulan: true,
};

console.log(produkutama.nama);
console.log(produkutama.harga);

const produkUmkm = [
  { nama: "Arabian Qahwa", kategori: "Kopi", harga: 25000, stok: 10 },
  { nama: "Saudi Dates Coffee", kategori: "Kopi", harga: 28000, stok: 40 },
  {
    nama: "Arabian Coffee Tester",
    kategori: "Bundling",
    harga: 15000,
    stok: 100,
  },
  { nama: "Paket Keluarga Saudi", kategori: "Minuman", harga: 75000, stok: 18 },
];

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup += `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProduk);
} else {
  renderProduk();
}

console.log(statusStok(produkUmkm[0].stok));
console.table(produkUmkm);
