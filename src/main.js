/**
 * MAIN.JS — JavaScript mínimo da landing page
 * ============================================
 * Mantemos o JS pequeno de propósito: menos código = carregamento mais rápido.
 * Só tratamos de:
 *   1. Menu mobile (hamburger)
 *   2. Formulário de contacto (demo)
 *   3. Scroll suave com offset para o header sticky
 */

// --- 1. MENU MOBILE ---
// document.getElementById busca um elemento pelo id definido no HTML
const menuBtn = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile");

if (menuBtn && menuMobile) {
  // toggleMenu alterna entre abrir e fechar o menu
  const toggleMenu = () => {
    // classList.toggle: se a classe existe remove, se não existe adiciona
    const isOpen = menuMobile.classList.toggle("hidden") === false;

    // aria-expanded comunica o estado a leitores de ecrã
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };

  // addEventListener: reage ao clique no botão hamburger
  menuBtn.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar num link (melhor UX em mobile)
  const menuLinks = menuMobile.querySelectorAll(".menu-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuMobile.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// --- 2. FORMULÁRIO DE CONTACTO (DEMO) ---
const form = document.getElementById("form-contacto");
const formSucesso = document.getElementById("form-sucesso");

if (form && formSucesso) {
  form.addEventListener("submit", (event) => {
    // preventDefault impede o reload da página (comportamento default de forms)
    event.preventDefault();

    // checkValidity usa validação nativa do HTML5 (required, type="email", etc.)
    if (!form.checkValidity()) {
      form.reportValidity(); // Mostra mensagens de erro ao utilizador
      return;
    }

    // Em produção: enviarias os dados para um servidor aqui (fetch/axios)
    // Por agora, mostramos apenas uma mensagem de sucesso
    formSucesso.classList.remove("hidden");
    form.reset(); // Limpa os campos

    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
      formSucesso.classList.add("hidden");
    }, 5000);
  });
}

// --- 3. SCROLL COM OFFSET PARA HEADER STICKY ---
// Links com href="#secção" podem ficar escondidos atrás do header fixo
// Interceptamos o clique e ajustamos a posição manualmente
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    // Ignora links vazios (#) ou inválidos
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    // Offset de 80px = altura aproximada do header sticky
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// --- 4. ANIMAÇÃO DE ENTRADA LEVE (OPCIONAL) ---
// Adiciona fade-in à secção hero quando a página carrega
// Só corre se o utilizador não desactivou animações (acessibilidade)
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const hero = document.querySelector("main > section:first-of-type > div");
  if (hero) {
    hero.classList.add("animate-fade-in");
  }
}
