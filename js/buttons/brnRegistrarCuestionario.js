
document.addEventListener("DOMContentLoaded", function () {
function imprimiregistrarCustionario() {
    const navItems = document.createElement("li");
    const navLinks = document.createElement("a");
  
    navLinks.classList.add("nav-link", "page-scroll");
    if (localStorage.getItem("rol") === 'instructor') {
  
      navItems.classList.add("nav-item");
      navLinks.setAttribute("href", "#registrarCustionario");
      navLinks.textContent = "REGISTRAR CUESTIONARIO";
    } else {
  
      navLinks.setAttribute("href", "#");
      navLinks.textContent = "";
    }
  
    navItems.appendChild(navLinks);
    return navItems;
  }
  const navRegistrarCustionario = imprimiregistrarCustionario();
  const navList = document.querySelector("#navbarsItemsDefault");
  navList.appendChild(navRegistrarCustionario);
});