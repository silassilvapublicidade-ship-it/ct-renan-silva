const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("#main-menu");
const fixedButton = document.querySelector(".floating-whatsapp");
const year = document.querySelector("[data-year]");
const sections = [...document.querySelectorAll("main[id], main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];
const startSteps = [...document.querySelectorAll("[data-start-step]")];
const startProgressItems = [...document.querySelectorAll(".start-progress span")];
const advisorTabs = [...document.querySelectorAll("[data-objective]")];
const advisorTitle = document.querySelector("[data-advisor-title]");
const advisorText = document.querySelector("[data-advisor-text]");
const advisorList = document.querySelector("[data-advisor-list]");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.querySelector(".gallery-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const advisorContent = {
  forca: {
    title: "For&ccedil;a, sa&uacute;de e evolu&ccedil;&atilde;o f&iacute;sica",
    text: "Treino organizado para desenvolver t&eacute;cnica, const&acirc;ncia e progress&atilde;o segura dentro da muscula&ccedil;&atilde;o.",
    items: [
      "Avalia&ccedil;&atilde;o inicial para entender rotina e limita&ccedil;&otilde;es",
      "Treino montado pelo Renan e acess&iacute;vel pelo celular",
      "Acompanhamento para ajustar o caminho quando necess&aacute;rio",
    ],
  },
  emagrecimento: {
    title: "Emagrecimento com rotina e orienta&ccedil;&atilde;o",
    text: "Organiza&ccedil;&atilde;o de treino para apoiar uma rotina mais ativa, consistente e alinhada ao seu momento.",
    items: [
      "Treinos pensados para const&acirc;ncia e gasto energ&eacute;tico",
      "Acompanhamento para reduzir d&uacute;vidas no processo",
      "Ajustes conforme disponibilidade, resposta e necessidade",
    ],
  },
  massa: {
    title: "Ganho de massa com progress&atilde;o",
    text: "Estrutura, pesos livres e treino planejado para evoluir volume muscular com mais dire&ccedil;&atilde;o.",
    items: [
      "Exerc&iacute;cios organizados por grupos musculares",
      "Progress&atilde;o de carga com mais clareza",
      "Rotina acess&iacute;vel pelo app de acompanhamento",
    ],
  },
  condicionamento: {
    title: "Condicionamento para mais disposi&ccedil;&atilde;o",
    text: "Treinos para melhorar f&ocirc;lego, ritmo e preparo geral com apoio da estrutura do CT.",
    items: [
      "Uso combinado de muscula&ccedil;&atilde;o e cardio",
      "Rotina mais objetiva para manter frequ&ecirc;ncia",
      "Orienta&ccedil;&atilde;o para treinar com seguran&ccedil;a",
    ],
  },
  acompanhamento: {
    title: "Acompanhamento para n&atilde;o treinar perdido",
    text: "O Renan monta o treino e o aluno acessa a rotina por uma ferramenta digital de apoio.",
    items: [
      "Treino organizado pelo aplicativo de acompanhamento",
      "Mais clareza sobre o que fazer no dia de treino",
      "Ajustes conforme objetivo e evolu&ccedil;&atilde;o do aluno",
    ],
  },
};

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

const updateStartStep = (index) => {
  startSteps.forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex === index);
  });

  startProgressItems.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex <= index);
  });
};

const updateAdvisor = (key) => {
  const content = advisorContent[key];
  if (!content || !advisorTitle || !advisorText || !advisorList) return;

  advisorTabs.forEach((tab) => {
    const isActive = tab.dataset.objective === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  advisorTitle.innerHTML = content.title;
  advisorText.innerHTML = content.text;
  advisorList.innerHTML = content.items.map((item) => `<li>${item}</li>`).join("");
};

const openLightbox = (item) => {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption");
  if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption?.textContent || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
};

const setupReveal = () => {
  const revealItems = [
    ...document.querySelectorAll(
      ".feature-card, .objective-card, .app-card, .gallery-item, .testimonial-card, .start-step, .contact-list > div"
    ),
  ];

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  revealItems.forEach((item) => item.classList.add("reveal-ready"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
setupReveal();

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

startSteps.forEach((step, index) => {
  ["mouseenter", "focus", "click"].forEach((eventName) => {
    step.addEventListener(eventName, () => updateStartStep(index));
  });
});

advisorTabs.forEach((tab) => {
  tab.addEventListener("click", () => updateAdvisor(tab.dataset.objective));
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

fixedButton?.addEventListener("click", () => {
  fixedButton.classList.add("is-active");
  window.setTimeout(() => fixedButton.classList.remove("is-active"), 220);
});

if (year) {
  year.textContent = new Date().getFullYear();
}
