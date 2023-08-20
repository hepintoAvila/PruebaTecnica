
/* CARGA LOS DATOS DEL CUESTIONARIO DE  EVALUACION*/
function loadCuestionario(urlId, callback) {
    console.log('id',urlId)
    if (Number(urlId) > 0) {
        const url = `https://api.compucel.co/v4/?accion=consultaCuestionario&id=${urlId}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem("CuestionariosById");
                localStorage.removeItem("datosBasicosCuestionario");
                localStorage.removeItem("Cuestionarios");
                localStorage.setItem("CuestionariosById", JSON.stringify(data.data.Preguntas));
                localStorage.setItem("datosBasicosCuestionario", JSON.stringify(data.data.Cuestionario));
                localStorage.setItem("timer", data.data.Cuestionario.tiempoPrueba);
            }).finally(() => {
                callback();
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
            });
    }
}
/* GENERA LA TABLA DEL CUESTIONARIO DE  EVALUACION*/
function generarTablaCuestionario(datos) {
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


    encabezadoFila.appendChild(document.createElement('th')); // Columna vacía para los botones

    // Crear filas de la tabla
    const cuerpo = tabla.createTBody();
    datos.forEach((cuestionario) => {
        const fila = cuerpo.insertRow();
        for (const propiedad in cuestionario) {
            const celda = fila.insertCell();
            celda.textContent = cuestionario[propiedad];
        }


        const celdaBotonModal = fila.insertCell();
        const botonModal = document.createElement('button');
        botonModal.textContent = '';
        botonModal.classList.add("list-preguntas");
        botonModal.addEventListener('click', (event) => {
            abrirModal(cuestionario.id);
        });


        const celdaBotonVista = fila.insertCell();
        const botonVista = document.createElement('button');
        botonVista.textContent = '';
        botonVista.classList.add("list-detalles");
        botonVista.addEventListener('click', (event) => {
            loadCuestionario(cuestionario.id,()=>{
                window.location.href = `http://prueba.tecnica.compucel.co/cuestionario.html?id=${cuestionario.id}`;
            })
        });

        // Agregar botón de eliminar,agregar preguntas
        const celdaBotonEliminar = fila.insertCell();
        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add("list-eliminar");
        botonEliminar.textContent = '';
        botonEliminar.addEventListener('click', () => {
            Swal.fire({
                title: 'ELIMINAR ENCUESTA!',
                text: "Esta seguro que desea eliminar el registro?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarCuestionario(cuestionario.id);
                }
            })

        });
        celdaBotonModal.appendChild(botonModal);
        celdaBotonVista.appendChild(botonVista);
        celdaBotonEliminar.appendChild(botonEliminar);
    });

    return tabla;
}
/* GENERA LA CONSULAT DE TODOS LOS CUESTIONARIOS*/
function consultarAllCuestionarios(callback) {

    const url = `https://api.compucel.co/v4/?accion=consultaAllCuestionario&usuario=${btoa(localStorage.getItem("nombreUsuario"))}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => { 

            if(localStorage.getItem("rol")==='instructor' || data.data.Cuestionarios.status==='202'){
            localStorage.removeItem("Cuestionarios");
            localStorage.setItem("Cuestionarios", JSON.stringify(data.data.Cuestionarios));
            callback();
            }
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });

}
function abrirModal(id) {
    localStorage.removeItem("idCuestionario");
    localStorage.setItem("idCuestionario", id);
    $('#exampleModal').modal('show')
}

function eliminarCuestionario(id) {

    const url = `https://api.compucel.co/v4/?accion=eliminarCuestionario&id=${id}&usuario=${btoa(localStorage.getItem("nombreUsuario"))}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {

            Swal.fire("" + data.data[0].message + "");
            if (data.data[0].status === '202') {
                localStorage.removeItem("Cuestionarios");
                localStorage.setItem("Cuestionarios", data.data.Cuestionarios);
            }
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });

}

(function($) {
    "use strict"; 
    $(window).on('load', function() {
        function PreloaderEvaluaciones() {
            setTimeout(function() {
                if (localStorage.getItem("rol")) {
                    consultarAllCuestionarios( () => {
                        let datos = localStorage.getItem("Cuestionarios");
                        let Cuestionarios = JSON.parse(datos);
                        // Generar la tabla y agregarla al contenedor
                        if (Array.isArray(Cuestionarios)) {
                            const contenedorTabla = document.querySelector('#contenedor-tabla');
                            const tablaGenerada = generarTablaCuestionario(Cuestionarios);
                            contenedorTabla.appendChild(tablaGenerada);
                        }
                    });
                }
            }, 500);
        }
        PreloaderEvaluaciones();
    });

})(jQuery);