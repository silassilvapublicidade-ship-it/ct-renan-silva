const header = document.querySelector("[data-header]");
const fixedButton = document.querySelector(".floating-whatsapp");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

fixedButton?.addEventListener("click", () => {
  fixedButton.classList.add("is-active");
  window.setTimeout(() => fixedButton.classList.remove("is-active"), 220);
});
