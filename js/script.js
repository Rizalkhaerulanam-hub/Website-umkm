const promoButton = document.querySelector("#promoButton");
const promoMessage = document.querySelector("#promoMessage");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoMessage.textContent =
      "Promo: Gratis kurma untuk setiap pembelian Qahwa!";
    promoButton.textContent = "Promo sudah dilihat";
  });
}
