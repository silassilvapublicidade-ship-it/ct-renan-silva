const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("#main-menu");
const fixedButton = document.querySelector(".floating-whatsapp");
const year = document.querySelector("[data-year]");
const sections = [...document.querySelectorAll("main[id], main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
};

const updateActiveNav = () => {
  let current = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= window.scrollY + 130) {
      current = section;
    }
  });

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.getAttribute("href") === `#${current?.id}`);
  });
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");

  document.body.classList.toggle("menu-open", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".faq-list details").forEach((otherItem) => {
      if (otherItem !== item) otherItem.removeAttribute("open");
    });
  });
});

fixedButton?.addEventListener("click", () => {
  fixedButton.classList.add("is-active");
  window.setTimeout(() => fixedButton.classList.remove("is-active"), 220);
});

if (year) {
  year.textContent = new Date().getFullYear();
}
