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

  if (className) {
    elemen.className = className;
  }

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
  if (status.className) {
    badgeStok.classList.add(status.className);
  }

  kartu.append(badgeStok, buatElemen("p", "product-action", labelAksi));

  return kartu;
}

function renderProduk() {
  const targetProduk = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!targetProduk || !ringkasan) {
    console.warn("Target katalog P09 tidak ditemukan pada halaman ini.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);

  const kartuProduk = produkTersedia.map((produk) => buatKartuProduk(produk));

  const produkUnggulan = produkUmkm.find(
    (produk) => produk.nama === "Arabika Gayo",
  );

  targetProduk.replaceChildren(...kartuProduk);

  ringkasan.textContent = `${namaToko}: ${produkTersedia.length} produk memiliki stok dari ${produkUmkm.length} produk.`;

  produkUmkm.forEach((produk) => {
    console.log(
      produk.nama,
      "| Stok:",
      produk.stok,
      "| Status:",
      statusStok(produk.stok).label,
    );
  });

  console.log("Produk unggulan:", produkUnggulan);

  console.table(
    produkUmkm.map((produk) => ({
      nama: produk.nama,
      kategori: produk.kategori,
      harga: formatRupiah.format(produk.harga),
      stok: produk.stok,
      status: statusStok(produk.stok).label,
    })),
  );

  console.log("Nama UMKM:", namaToko);
  console.log("Jumlah seluruh produk:", produkUmkm.length);
  console.log("Jumlah produk tersedia:", produkTersedia.length);
  console.log(
    "Jumlah produk habis:",
    produkUmkm.length - produkTersedia.length,
  );
  console.log("Kartu produk ditampilkan:", kartuProduk.length);
}

console.log("P10 JavaScript aktif —", namaToko);

console.log("Pengujian format Rupiah:", formatRupiah.format(85000));

console.table([
  { stok: 0, hasil: statusStok(0).label },
  { stok: 3, hasil: statusStok(3).label },
  { stok: 10, hasil: statusStok(10).label },
]);

console.table(produkUmkm);
renderProduk();
