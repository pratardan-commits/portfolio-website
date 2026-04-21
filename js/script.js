document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".header__hamburger");
  const nav = document.querySelector(".nav");
  const icon = document.querySelector(".header__icon");

  if (hamburger && nav) {
    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("nav--open");

      const isOpen = nav.classList.contains("nav--open");

      // Stop body scrolling when menu is open
      document.body.style.overflow = isOpen ? "hidden" : "";

      // Change icon to 'close' (cross) when open
      if (icon) {
        icon.setAttribute("name", isOpen ? "close" : "menu");
      }
    });

    // Close menu when clicking any nav link
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        document.body.style.overflow = "";
        if (icon) {
          icon.setAttribute("name", "menu");
        }
      });
    });
  }
});
