"use strict";

const namaToko = "Saudi Coffee";

const produkUmkm = [
  { nama: "Arabika Gayo", kategori: "Kopi", harga: 85000, stok: 2 },
  { nama: "Robusta Temanggung", kategori: "Kopi", harga: 65000, stok: 4 },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 125000, stok: 0 },
  { nama: "Kopi Susu Saudi", kategori: "Minuman", harga: 28000, stok: 18 },
  { nama: "Kurma Premium", kategori: "Camilan", harga: 42000, stok: 9 },
  { nama: "Paket Keluarga", kategori: "Bundling", harga: 210000, stok: 3 },
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

function buatElemen(tag, className, isi) {
  const elemen = document.createElement(tag);
  if (className) elemen.className = className;
  elemen.textContent = isi;
  return elemen;
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
  const kartu = document.createElement("article");
  kartu.className = "catalog-card js-product-card";

  kartu.append(
    buatElemen("h2", "", produk.nama),
    buatElemen("p", "", labelKategori(produk.kategori)),
    buatElemen("p", "price", formatRupiah.format(produk.harga)),
  );

  const badgeStok = buatElemen("span", "stock-badge", status.label);
  if (status.className) badgeStok.classList.add(status.className);
  kartu.append(badgeStok, buatElemen("p", "product-action", labelAksi));

  return kartu;
}

function renderProduk() {
  const targetProduk = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // app.js hanya dipanggil di produk.html; pengecekan ini menjaga halaman lain.
  if (!targetProduk || !ringkasan) {
    console.warn("Target katalog P09 tidak ditemukan pada halaman ini.");
    return;
  }

  let jumlahTersedia = 0;
  targetProduk.replaceChildren();

  for (const produk of produkUmkm) {
    if (produk.stok > 0) {
      jumlahTersedia += 1;
    }
    targetProduk.append(buatKartuProduk(produk));
  }

  ringkasan.textContent = `${namaToko}: ${jumlahTersedia} produk memiliki stok dari ${produkUmkm.length} produk.`;
}

// Bukti data dan pengujian conditional dapat dilihat melalui DevTools Console.
console.log("P09 JavaScript aktif —", namaToko);
console.table(produkUmkm);
console.table(
  produkUmkm.map((produk) => ({
    nama: produk.nama,
    stok: produk.stok,
    status: statusStok(produk.stok).label,
  })),
);

// Script menggunakan atribut defer, sehingga DOM sudah selesai diparsing.
renderProduk();
