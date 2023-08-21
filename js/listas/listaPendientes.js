 
/* consulta los resultados por id y usuarios*/
function consultaResultados(id) {
    localStorage.removeItem("datosResultadosById");
    localStorage.removeItem("Cuestionarios");
    localStorage.removeItem("timer");
    localStorage.removeItem("CuestionariosById");
    localStorage.removeItem("datosBasicosCuestionario");
    if(id>0){
    const url = `https://api.compucel.co/v4/?accion=consultaResultados&id=${id}&nombreUsuario=${btoa(localStorage.getItem("nombreUsuario"))}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {

            if(data.data.Cuestionario.status==='202'){
                //SI YA PRESENTO LA  EVALUACION
                localStorage.setItem("datosResultadosById", JSON.stringify(data.data.Preguntas));
                localStorage.setItem("datosBasicosCuestionario", JSON.stringify(data.data.Cuestionario));
                window.location.href = `http://prueba.tecnica.compucel.co/resultados.html?id=${id}`;
            }else{
                localStorage.setItem("CuestionariosById", JSON.stringify(data.data.Preguntas));
                localStorage.setItem("datosBasicosCuestionario", JSON.stringify(data.data.Cuestionario));
                localStorage.setItem("timer", data.data.Cuestionario.timer);
                window.location.href = `http://prueba.tecnica.compucel.co/cuestionario.html?id=${id}`;
            }

        })  
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });
    }
}


 /* consulta las evaluaciones pendientes de usuario*/
function consultarAllCuestionariosPendientes(callback) {
    localStorage.removeItem("Pendientes");
    const url = `https://api.compucel.co/v4/?accion=consultaAllCuestionarioPendientes&nombreUsuario=${btoa(localStorage.getItem("nombreUsuario"))}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("Pendientes", JSON.stringify(data.data.Pendientes));
            
        }).finally(()=>{
            callback();
        }).
        catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });

}
 /* genera la tabla de  las evaluaciones pendientes de usuario*/
function generarTablaCuestionarioPendientes(datos) {
    const tabla = document.createElement('table');
    tabla.classList.add('tabla-cuestionarios');

    // Crear encabezado de la tabla
    const encabezado = tabla.createTHead();
    const encabezadoFila = encabezado.insertRow();
    for (const propiedad in datos[0]) {
        const th = document.createElement('th');
        th.textContent = propiedad;
        encabezadoFila.appendChild(th);
    }
    const thbtn1 = document.createElement('th');
    thbtn1.textContent = '';
    encabezadoFila.appendChild(thbtn1);

    const thbtn2 = document.createElement('th');
    thbtn2.textContent = 'ACTIONS';
    encabezadoFila.appendChild(thbtn2);


    encabezadoFila.appendChild(document.createElement('th')); 

    // Crear filas de la tabla
    const cuerpo = tabla.createTBody();
    datos.forEach((cuestionario) => {
        const fila = cuerpo.insertRow();
        for (const propiedad in cuestionario) {
            const celda = fila.insertCell();
            celda.textContent = cuestionario[propiedad];
        }

        // Agregar botón de eliminar,agregar preguntas
        const celdaBotonPendientes = fila.insertCell();
        const botonPendientes = document.createElement('button');
        botonPendientes.textContent = '';
        botonPendientes.classList.add("list-pendientes");
        botonPendientes.addEventListener('click', (event) => {
            consultaResultados(cuestionario.id)
        });

        celdaBotonPendientes.appendChild(botonPendientes);
    });

    return tabla;
}


(function($) {
    "use strict"; 
    $(window).on('load', function() {
        function PreloaderPendientes() {
            setTimeout(function() {
                if (localStorage.getItem("rol")) {
                    consultarAllCuestionariosPendientes(() => {
                        let datos = localStorage.getItem("Pendientes");
                        let Pendientes = JSON.parse(datos);
                        if (Array.isArray(Pendientes)) {
                            const contenedorTabla = document.querySelector('#contenedor-tabla-pendiente');
                            const tablaGenerada = generarTablaCuestionarioPendientes(Pendientes);
                            contenedorTabla.appendChild(tablaGenerada);
                        }
                    });
                }
            }, 500);
        }
        PreloaderPendientes();
    });

})(jQuery);
 