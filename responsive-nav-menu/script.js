document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-icon");
    const navContainer = document.querySelector(".nav-container");
    const sideContainer = document.querySelector(".side-container");
    
    // Nav closed by default
    let isNavVisible = false;

    const toggleMobileNav = () => {
      if (window.innerWidth <= 768) {
        if (isNavVisible) {
          navContainer.classList.remove("visible");
          sideContainer.classList.remove("visible");
        } else {
          navContainer.classList.add("visible");
          sideContainer.classList.add("visible");
        }
        isNavVisible = !isNavVisible;
      } else {
        navContainer.style.display = "flex";
        sideContainer.style.display = "flex";
      }
    };
    hamburger.addEventListener("click", toggleMobileNav);
  });