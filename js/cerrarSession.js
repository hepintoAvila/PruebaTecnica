document.addEventListener("DOMContentLoaded", async () => {
  const $cerrarLogin = document.querySelector("#cerrarLogin");
  $cerrarLogin.onclick = async (e) => {
    e.preventDefault();
    localStorage.removeItem("textoCifradoBase64");
    localStorage.removeItem("token");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("textoCifradoBase64");
    localStorage.removeItem("token");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("Cuestionarios");
    localStorage.removeItem("idCuestionario");
    localStorage.removeItem("CuestionariosById");
    localStorage.removeItem("datosBasicosCuestionario");
    localStorage.removeItem("CalificacionPromedio");
    localStorage.removeItem("seccion");
    localStorage.removeItem("CalificacionPorcentual");
    localStorage.removeItem("timer");
    localStorage.removeItem("NumeroCorrectas");
    localStorage.removeItem("datosResultadosById");
    localStorage.removeItem("tokenSesion");
    localStorage.removeItem("Cuestionarios");
    
    window.location.href = "http://prueba.tecnica.compucel.co";
  };
});
