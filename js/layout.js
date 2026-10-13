// P06 — mengubah layout katalog tanpa mengubah urutan DOM.
const catalog = document.querySelector("#catalog");
const status = document.querySelector("#layoutStatus");
const layoutButtons = document.querySelectorAll("[data-layout]");

if (catalog && status && layoutButtons.length) {
  layoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.layout;
      if (mode !== "grid" && mode !== "flex") return;

      catalog.classList.remove("layout-grid", "layout-flex");
      catalog.classList.add(`layout-${mode}`);

      layoutButtons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      status.textContent =
        mode === "grid"
          ? "Mode aktif: Grid dua dimensi"
          : "Mode aktif: Flexbox satu dimensi dengan wrapping";
    });
  });
}
