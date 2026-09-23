const contactForm = document.querySelector("#contactForm");
const formResult = document.querySelector("#formResult");

if (contactForm && formResult) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formResult.textContent = "Mohon lengkapi semua field yang wajib diisi.";
      formResult.classList.add("error");

      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const nama = formData.get("nama");
    const email = formData.get("email");
    const telepon = formData.get("telepon");
    const paket = formData.get("paket");
    const topik = formData.get("topik");
    const pesan = formData.get("pesan");
    const waktu = formData.get("waktu");

    formResult.classList.remove("error");

    formResult.innerHTML = `
      <h2>Pesan berhasil disiapkan</h2>

      <p>
        Terima kasih, <strong>${nama}</strong>.
      </p>

      <p>
        Email: <strong>${email}</strong>
      </p>

      <p>
        WhatsApp:
        <strong>${telepon || "Tidak diisi"}</strong>
      </p>

      <p>
        Paket:
        <strong>${paket}</strong>
      </p>

      <p>
        Topik:
        <strong>${topik}</strong>
      </p>

      <p>
        Waktu:
        <strong>${waktu || "Tidak dipilih"}</strong>
      </p>

      <p>
        Pesan:
        <strong>${pesan}</strong>
      </p>
    `;

    contactForm.reset();
  });
}
