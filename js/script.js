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

  // --- Global Overlay Logic ---
  const overlay = document.querySelector("#overlay");
  const overlayImg = document.querySelector("#overlay-img");
  const overlayVideo = document.querySelector("#overlay-video");
  const closeBtn = document.querySelector(".overlay__close");

  const closeOverlay = () => {
    if (overlay) {
      overlay.classList.remove("overlay--open");
      if (overlayVideo) {
        overlayVideo.pause();
        overlayVideo.src = "";
      }
      document.body.style.overflow = ""; // Re-enable scrolling
    }
  };

  if (overlay) {
    if (closeBtn) closeBtn.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeOverlay();
    });
  }

  // Handle Beyond Tiles
  const beyondTiles = document.querySelectorAll(".beyond__tile");
  beyondTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const isVideo = tile.classList.contains("beyond__tile--video");
      const videoSrc = tile.getAttribute("data-video-src");
      const imgSrc = tile.querySelector("img")?.src;

      if (overlayImg && overlayVideo) {
        overlayImg.style.display = "none";
        overlayVideo.style.display = "none";

        if (isVideo && videoSrc) {
          overlayVideo.src = videoSrc;
          overlayVideo.style.display = "block";
          overlayVideo.play();
        } else if (imgSrc) {
          overlayImg.src = imgSrc;
          overlayImg.style.display = "block";
        }
        overlay.classList.add("overlay--open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Handle Persona and Full-Bleed Images
  const expandableImages = document.querySelectorAll(
    ".project__slide-img, .projectpage__full-bleed-img",
  );
  expandableImages.forEach((img) => {
    img.addEventListener("click", () => {
      if (overlayImg && overlayVideo) {
        overlayImg.src = img.src;
        overlayImg.style.display = "block";
        overlayVideo.style.display = "none";
        overlay.classList.add("overlay--open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // --- Project Persona Slider Logic ---
  const sliderTrack = document.querySelector(".project__slider-slides");
  const leftBtn = document.querySelector(".project__slider-btn--left");
  const rightBtn = document.querySelector(".project__slider-btn--right");
  const slideElements = document.querySelectorAll(".project__slide");

  if (sliderTrack && leftBtn && rightBtn) {
    let currentSlide = 0;
    const totalSlides = slideElements.length;

    const updateSlider = () => {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    rightBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    leftBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  }
});
