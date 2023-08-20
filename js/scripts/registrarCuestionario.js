
function buildQueryString(opcion) {
  let datos = opcion;
  let queryString = datos[0]
      ? Object.keys(datos[0])
          .map((key) => `${key}=${datos[0][key]}`)
          .join("&")
      : "";

  return queryString;
}

  
  document.addEventListener("DOMContentLoaded", async () => {

      $btnRegistrarCuestionario = document.querySelector("#btnRegistrarCuestionario"),
      $Titulo = document.querySelector("#Titulo"),
      $Descripcion = document.querySelector("#Descripcion"),
      $FechaInicio = document.querySelector("#fechaInicio"),
      $Tema = document.querySelector("#Tema"),
      $FechaFinal = document.querySelector("#fechaFinal"),
      $TiempoPrueba = document.querySelector("#tiempoPrueba"),
  
    $btnRegistrarCuestionario.onclick = async (e) => {
      e.preventDefault();
  
      const titulo = $Titulo.value;
      const descripcion = $Descripcion.value;
      const fechaInicio = $FechaInicio.value;
      const fechaFinal = $FechaFinal.value;
      const tiempoPrueba = $TiempoPrueba.value;
      const tema = $Tema.value;

      if (!titulo) {
        return alert("No hay titulo registrado");
      }
      if (!descripcion) {
        return alert("No hay descripcion registrada");
      }
      if (!tema) {
        return alert("No hay descripcion registrada");
      }
        const objectForm = {
          titulo: btoa(titulo),
          descripcion: btoa(descripcion),
          fechaInicio: btoa(fechaInicio),
          fechaFinal: btoa(fechaFinal),
          tiempoPrueba: btoa(tiempoPrueba),
          tema: btoa(tema),
          nombreUsuario:btoa(localStorage.getItem("nombreUsuario"))
        };
  
        // Concateno el objeto con una funcion para enviar por GET las variables
        const opcion = [objectForm];
        const queryString = buildQueryString(opcion);
  
        const url = `https://api.compucel.co/v4/?accion=registrarCuestionario&${queryString}`;
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            
            Swal.fire("" + data.data[0].message + "");
            if(data.data[0].status==='202'){
                localStorage.removeItem("Cuestionarios");
                localStorage.setItem("Cuestionarios",data.data.Cuestionarios);   
            }
          })
  
          .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
          });
       
    };
  });
  