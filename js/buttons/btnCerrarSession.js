




// Función para cerrar el login
function cerrarLogin() {
  document.querySelector("#cerrarLogin").onclick = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://prueba.tecnica.compucel.co";
  };
}
document.addEventListener("DOMContentLoaded", function () {
  function imprimirNavBtnSession() {
    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");
    if (localStorage.getItem("token")) {

      const navBtn = document.createElement("button");
      navBtn.classList.add("navbar-btn", "page-scroll");
      navBtn.id = "cerrarLogin";
      navBtn.textContent = "SIGN OUT";
      navBtn.addEventListener("click", cerrarLogin);
      navItem.appendChild(navBtn);

    } else {
      navLinkIn = document.createElement("a");
      navLinkIn.classList.add("nav-link", "page-scroll");
      navLinkIn.setAttribute("href", "#login");
      navLinkIn.textContent = "LOG IN";
      navItem.appendChild(navLinkIn);
    }

    navItem.classList.add("nav-item");
    return navItem;
  }
  // Ejecutar la función para generar el elemento de navegación
  const navItem = imprimirNavBtnSession();
  // Agregar el elemento de navegación al DOM
  const navContainer = document.getElementById("navbarsItemsDefault");
  navContainer.appendChild(navItem);


});



