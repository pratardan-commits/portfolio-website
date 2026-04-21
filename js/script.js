document.addEventListener("DOMContentLoaded", () => {
  // Enable :active states on mobile/tablet
  document.body.addEventListener("touchstart", () => {}, { passive: true });

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

  // --- Beyond the Brief Overlay Logic ---
  const beyondTiles = document.querySelectorAll(".beyond__tile");
  const overlay = document.querySelector("#overlay");
  const overlayImg = document.querySelector("#overlay-img");
  const overlayVideo = document.querySelector("#overlay-video");
  const closeBtn = document.querySelector(".overlay__close");

  if (beyondTiles && overlay) {
    beyondTiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        const isVideo = tile.classList.contains("beyond__tile--video");
        const videoSrc = tile.getAttribute("data-video-src");
        const imgSrc = tile.querySelector("img")?.src;

        // Reset visibility
        overlayImg.style.display = "none";
        overlayVideo.style.display = "none";
        overlayVideo.pause();
        overlayVideo.src = "";

        if (isVideo && videoSrc) {
          overlayVideo.src = videoSrc;
          overlayVideo.style.display = "block";
          overlayVideo.play();
        } else if (imgSrc) {
          overlayImg.src = imgSrc;
          overlayImg.style.display = "block";
        }

        overlay.classList.add("overlay--open");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });
    });

    const closeOverlay = () => {
      overlay.classList.remove("overlay--open");
      overlayVideo.pause();
      overlayVideo.src = "";
      document.body.style.overflow = ""; // Re-enable scrolling
    };

    if (closeBtn) closeBtn.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeOverlay();
    });
  }
});
