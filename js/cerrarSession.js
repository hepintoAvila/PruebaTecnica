document.addEventListener("DOMContentLoaded", async () => {
  const $cerrarLogin = document.querySelector("#cerrarLogin");
  $cerrarLogin.onclick = async (e) => {
    e.preventDefault();
    localStorage.removeItem("textoCifradoBase64");
    localStorage.removeItem("token");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("rol");

    window.location.href = "http://localhost/app_quiz/";
  };
});
