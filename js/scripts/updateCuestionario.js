
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
  
        $btnActualizaCuestionario = document.querySelector("#btnActualizaCuestionario"),
        $Fecha = document.querySelector("#updateFecha"),
        $Tiempo = document.querySelector("#updateTiempo"),
      $btnActualizaCuestionario.onclick = async (e) => {
        e.preventDefault();
    
        const fecha = $Fecha.value;
        const tiempo = $Tiempo.value;
 
        if (!fecha) {
          return alert("No hay fecha registrada");
        }
          const objectForm = {
            fechaFinal: btoa(fecha),
            tiempoPrueba: btoa(tiempo),
            idCuestionario: btoa(localStorage.getItem("idCuestionario")),
            nombreUsuario:btoa(localStorage.getItem("nombreUsuario"))
          };
    
          // Concateno el objeto con una funcion para enviar por GET las variables
          const opcion = [objectForm];
          const queryString = buildQueryString(opcion);
    
          const url = `https://api.compucel.co/v4/?accion=updateCuestionario&${queryString}`;
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
            }).finally(() => {
                setTimeout(function () {
                   window.location.href = "http://prueba.tecnica.compucel.co";
                }, 3000);
            });
         
      };
    });
    