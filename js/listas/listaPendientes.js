function generarTablaCuestionarioPendientes(datos) {
    const tabla = document.createElement('table');
    tabla.classList.add('contenedor-tabla-pendiente');

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
        const textButton = (cuestionario.Resuelta === 'S') ? 'Ver Resultados' : 'Presentar Evaluación';
        const celdaBotonVista = fila.insertCell();
        const botonVista = document.createElement('button');
        const navLinks = document.createElement("a");
        navLinks.setAttribute("href", `http://prueba.tecnica.compucel.co/cuestionario.html?id=${cuestionario.id}`);
        botonVista.appendChild(navLinks);
        botonVista.textContent = textButton;
        botonVista.addEventListener('click', () => {
            (cuestionario.Resuelta === 'S') ? window.location.href = `http://prueba.tecnica.compucel.co/resultados.html?id=${cuestionario.id}` : window.location.href = `http://prueba.tecnica.compucel.co/cuestionario.html?id=${cuestionario.id}`
        });

        celdaBotonVista.appendChild(botonVista);
    });

    return tabla;
}
function consultarAllCuestionariosPendientes(callback) {

    const url = `https://api.compucel.co/v4/?accion=consultaAllCuestionarioPendientes&nombreUsuario=${btoa(localStorage.getItem("nombreUsuario"))}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.removeItem("Pendientes");
            localStorage.setItem("Pendientes", JSON.stringify(data.data.Pendientes));
            callback();
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });

}