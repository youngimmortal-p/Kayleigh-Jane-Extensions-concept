document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  const faqQuestions = document.querySelectorAll(".faq-question");

  /*
   * Mobile navigation
   */

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.remove("active");

    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");

    body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.add("active");

    navigation.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Close navigation");

    body.classList.add("menu-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /*
   * Header state on scroll
   */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /*
   * FAQ accordion
   */

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.closest(".faq-item");

      const isCurrentlyOpen = question.getAttribute("aria-expanded") === "true";

      /*
       * Close all other FAQ items.
       */

      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          const otherItem = otherQuestion.closest(".faq-item");

          otherQuestion.setAttribute("aria-expanded", "false");

          otherItem.classList.remove("open");
        }
      });

      /*
       * Toggle selected FAQ item.
       */

      question.setAttribute("aria-expanded", String(!isCurrentlyOpen));

      item.classList.toggle("open", !isCurrentlyOpen);
    });
  });

  /*
   * Close mobile navigation if the viewport
   * becomes desktop-sized.
   */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });

  /*
   * Smooth internal links.
   * CSS already handles smooth scrolling, but this
   * keeps focus behaviour predictable for keyboard users.
   */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      target.setAttribute("tabindex", "-1");

      target.focus({
        preventScroll: true,
      });
    });
  });
});
