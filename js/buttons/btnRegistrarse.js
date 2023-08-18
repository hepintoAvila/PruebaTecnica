document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("rol")) {
      const navItemsRegistrarse = document.createElement("li");
      navItemsRegistrarse.classList.add("nav-item");
      const navRegistrarse = document.createElement("a");
      navRegistrarse.classList.add("nav-link", "page-scroll");
      navRegistrarse.setAttribute("href", "#registrarse");
      navRegistrarse.textContent = "REGISTRARSE";
      navItemsRegistrarse.appendChild(navRegistrarse);
      const navContainer = document.querySelector("#navbarsItemsDefault");
      navContainer.appendChild(navItemsRegistrarse);
    }
  });
  