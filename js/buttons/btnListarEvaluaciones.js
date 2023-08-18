
document.addEventListener("DOMContentLoaded", function () {
function verListaEvaluaciones() {
    const rol = localStorage.getItem("rol");
    const navItems = document.createElement("li");
    const navLinks = document.createElement("a");
    navLinks.classList.add("nav-link", "page-scroll");
  
    if (rol === 'Aprendiz') {
      navItems.classList.add("nav-item");
      navLinks.setAttribute("href", "#verListaEvaluaciones");
      navLinks.textContent = "VER EVALUACIONES PENDIENTES";
    } else {
  
      navLinks.setAttribute("href", "#");
      navLinks.textContent = "";
    }
  
    navItems.appendChild(navLinks);
    return navItems;
  }
  const navVerListaEvaluaciones = verListaEvaluaciones();
  const navList = document.querySelector("#navbarsItemsDefault");
  navList.appendChild(navVerListaEvaluaciones);
});