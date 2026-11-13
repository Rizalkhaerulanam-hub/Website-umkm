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

const targetProduk = document.querySelector("#produk-dinamis");
const ringkasanProduk = document.querySelector("#produk-ringkasan");
const tombolFilter = document.querySelectorAll("[data-filter]");

function statusStok(stok) {
  if (stok === 0) return { label: "Habis", className: "empty" };
  if (stok <= 5) return { label: "Stok terbatas", className: "warning" };
  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    case "Minuman":
      return "Minuman khas Saudi Coffee";
    case "Camilan":
      return "Camilan pilihan";
    default:
      return "Produk UMKM";
  }
}

function buatElemenProduk(produk) {
  const kartu = document.createElement("article");
  kartu.className = "catalog-card js-product-card";

  const judul = document.createElement("h2");
  judul.textContent = produk.nama;
  const kategori = document.createElement("p");
  kategori.textContent = labelKategori(produk.kategori);
  const harga = document.createElement("p");
  harga.className = "price";
  harga.textContent = formatRupiah.format(produk.harga);
  const stok = document.createElement("span");
  const infoStok = statusStok(produk.stok);
  stok.className = "stock-badge";
  stok.textContent = `${infoStok.label} (${produk.stok})`;
  if (infoStok.className) stok.classList.add(infoStok.className);
  const aksi = document.createElement("p");
  aksi.className = "product-action";
  aksi.textContent = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  kartu.append(judul, kategori, harga, stok, aksi);
  return kartu;
}

function buatEmptyState(kategori) {
  const pesan = document.createElement("p");
  pesan.className = "empty-state";
  pesan.setAttribute("role", "status");
  pesan.textContent =
    kategori === "Semua"
      ? "Belum ada produk yang dapat ditampilkan."
      : `Belum ada produk untuk kategori ${kategori}.`;
  return pesan;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!targetProduk || !ringkasanProduk) {
    console.warn(
      "Target #produk-dinamis atau #produk-ringkasan tidak ditemukan.",
    );
    return;
  }

  const hasilFilter =
    kategoriAktif === "Semua"
      ? produkUmkm
      : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  targetProduk.replaceChildren();

  if (hasilFilter.length === 0) {
    targetProduk.append(buatEmptyState(kategoriAktif));
  } else {
    hasilFilter.forEach((produk) => {
      targetProduk.append(buatElemenProduk(produk));
    });
  }

  ringkasanProduk.textContent =
    kategoriAktif === "Semua"
      ? `Menampilkan ${hasilFilter.length} dari ${produkUmkm.length} produk Saudi Coffee.`
      : `Kategori ${kategoriAktif}: ${hasilFilter.length} produk ditemukan.`;

  console.log(
    `Filter ${kategoriAktif}: ${hasilFilter.length} produk ditampilkan.`,
  );
}

function aturFilterAktif(tombolDipilih) {
  tombolFilter.forEach((tombol) => {
    const aktif = tombol === tombolDipilih;
    tombol.classList.toggle("is-active", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const kategori = tombol.dataset.filter;
    aturFilterAktif(tombol);
    renderProduk(kategori);
  });
});

if (targetProduk && ringkasanProduk) {
  renderProduk();
  console.table(produkUmkm);

  const elemenUji = document.createElement("span");
  elemenUji.textContent = "Elemen uji remove";
  targetProduk.append(elemenUji);
  elemenUji.remove();
  console.log("Latihan remove(): elemen uji berhasil dihapus.");
}
