
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

    $enviarPregunta = document.querySelector("#enviarPregunta"),
        $pregunta = document.querySelector("#pregunta"),
        $correctas = document.querySelectorAll(".resp-correcta"),
        enviarPregunta.addEventListener('click', (e) => {
            e.preventDefault();
            const preguntas = $pregunta.value;
            const correcta = $correctas.value;

            const camposInputs = document.querySelectorAll('input[name="respuesta[]"]');
            const camposCorrectas = document.querySelectorAll('input[name="correcta[]"]');
            const valores = [];
            const valorCorrecto = [];
            camposInputs.forEach(input => {
                valores.push(input.value);
            });
            camposCorrectas.forEach(input => {
                if (input.checked) {
                    valorCorrecto.push(input.value);
                }

            });
            if (!valorCorrecto[0]) {
                return alert("Por favor, seleccione la respuesta correcta");
            }
            if (!preguntas) {
                return alert("Por favor, Digite la pregunta");
            }
            const opcion = [valores];
            const queryString1 = JSON.stringify(opcion);
            const objectForm = {
                pregunta: btoa(preguntas),
                idCuestionario: btoa(localStorage.getItem("idCuestionario")),
                nombreUsuario: btoa(localStorage.getItem("nombreUsuario")),
                correcta: btoa(valorCorrecto[0])
            };
            const opcion2 = [objectForm];
            const queryString2 = buildQueryString(opcion2);
            const url = `https://api.compucel.co/v4/?accion=registrarPregunta&models=${queryString1}&${queryString2}`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire("" + data.data[0].message + "");
                })
                .catch((error) => {
                    console.error("Error al enviar la solicitud:", error);
                });
        });


    const agregarCampoBtn = document.querySelector('#agregarCampo');
    const inputsContainer = document.querySelector('#inputsContainer');
    agregarCampoBtn.addEventListener('click', () => {
        const newInputContainer = document.createElement('div');
        newInputContainer.className = 'input-container';
        newInputContainer.innerHTML = `
        <input type="radio" class="resp-correcta" name="correcta[]" id="${inputsContainer.childElementCount - 1}" value="${inputsContainer.childElementCount - 1}"><input type="text" name="respuesta[]" placeholder="Respuesta ${inputsContainer.childElementCount - 1}" required>
      <button type="button" class="eliminar-campo">-</button>
    `;
        inputsContainer.appendChild(newInputContainer);

        const eliminarCampoBtns = document.querySelectorAll('.eliminar-campo');
        eliminarCampoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                inputsContainer.removeChild(btn.parentNode);
            });
        });
    });

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
        encabezadoFila.appendChild(document.createElement('th')); // Columna vacía para los botones

        // Crear filas de la tabla
        const cuerpo = tabla.createTBody();
        datos.forEach((cuestionario) => {
            const fila = cuerpo.insertRow();
            for (const propiedad in cuestionario) {
                const celda = fila.insertCell();
                celda.textContent = cuestionario[propiedad];
            }

            // Agregar botón de eliminar,agregar preguntas
            const celdaBoton = fila.insertCell();
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar Cuestionario';
            botonEliminar.addEventListener('click', () => {
                eliminarCuestionario(cuestionario.id);
            });
            const celdaBotonModal = fila.insertCell();
            const botonModal = document.createElement('button');
            botonModal.textContent = 'Crear Pregunta';

            botonModal.addEventListener('click', (event) => {

                abrirModal(cuestionario.id);
            });
            const celdaBotonVista = fila.insertCell();
            const botonVista = document.createElement('button');
            const navLinks = document.createElement("a");
            navLinks.setAttribute("href", `http://prueba.tecnica.compucel.co/cuestionario.html?id=${cuestionario.id}`);
            botonVista.appendChild(navLinks);
            botonVista.textContent = 'Ver Cuestionario';
            botonVista.addEventListener('click', () => {

                window.location.href = `http://prueba.tecnica.compucel.co/cuestionario.html?id=${cuestionario.id}`;
            });
            celdaBotonModal.appendChild(botonModal);
            celdaBoton.appendChild(botonEliminar);
            celdaBotonVista.appendChild(botonVista);
        });

        return tabla;
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

                localStorage.removeItem("Cuestionarios");
                localStorage.setItem("Cuestionarios", JSON.stringify(data.data.Cuestionarios));
                callback();

            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
            });

    }
    if (localStorage.getItem("rol")) {
        consultarAllCuestionarios(() => {
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

});