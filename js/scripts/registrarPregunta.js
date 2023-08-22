
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

    document.querySelector("#enviarPregunta").addEventListener('click', (e) => {
        e.preventDefault();
        const respuesta = [];
        const correcta = [];
        const opciones = [];
        const titulo = [];
        const nInicial = [];
        const nFinal = [];
        const rango = [];
        const items = [];
        const nombre = [];
        let queryString1 = {};
        const pregunta = document.getElementById("pregunta"),
            tipoRespuestas = document.getElementById("tipoRespuestas");

        if (!pregunta.value) {
            return alert("Por favor, Digite la pregunta");
        }
        if (!tipoRespuestas.value) {
            return alert("Por favor, seleccione un tipo de respuesta");
        }
        switch (tipoRespuestas.value) {
            case '1':
                const respuestaMultiple = document.querySelectorAll('input[name="respuestaMultiple[]"]');
                const camposCorrectas = document.querySelectorAll('input[name="correctaMultiple[]"]');
                respuestaMultiple.forEach(input => {
                    respuesta.push(input.value);
                });
                camposCorrectas.forEach(input => {
                    if (input.checked) {
                        correcta.push('1');
                    }else{
                        correcta.push('0');
                    }
                });
                queryString1 = [JSON.stringify({
                    respuestas: respuesta,
                    correctas: correcta,
                })];
                break;

            case '2':
                const respuestaLikert = document.querySelectorAll('input[name="respuestaLikert[]"]');
                respuestaLikert.forEach(input => {
                    opciones.push(input.value);
                });
                queryString1 = [JSON.stringify({
                    opciones: opciones,
                })];
                break;

            case '3':
                const correctaDesplegable = document.querySelectorAll('input[name="correctaDesplegable[]"]'),
                    respuestasDesplegable = document.querySelectorAll('input[name="respuestasDesplegable[]"]');

                correctaDesplegable.forEach(input => {
                    if (input.checked) {
                        correcta.push(input.value);
                    }
                });
                respuestasDesplegable.forEach(input => {
                    respuesta.push(input.value);
                });
                queryString1 = [JSON.stringify({
                    correcta: correcta,
                    respuestas: respuesta,
                })];
                break;

            case '4':
                const tituloMatriz = document.querySelectorAll('input[name="tituloMatriz[]"]');
                const nombreInicial = document.querySelectorAll('input[name="nombreInicial[]"]');
                const nombreFinal = document.querySelectorAll('input[name="nombreFinal[]"]');
                const rangos = document.querySelectorAll('input[name="rango[]"]');
                const itemsMatriz = document.querySelectorAll('input[name="itemsMatriz[]"]');

                tituloMatriz.forEach(input => {
                    titulo.push(input.value);
                });
                nombreInicial.forEach(input => {
                    nInicial.push(input.value);
                });
                nombreFinal.forEach(input => {
                    nFinal.push(input.value);
                });
                itemsMatriz.forEach(input => {
                    items.push(input.value);
                });
                rangos.forEach(input => {
                    rango.push(input.value);
                });
                queryString1 = [JSON.stringify({
                    titulo: titulo,
                    nInicial: nInicial,
                    nFinal: nFinal,
                    rango: rango,
                    items: items,
                })];
                break;
            case '5':
                const correctaRango = document.querySelectorAll('input[name="correctaRango_5[]"]');
                const nombreRango = document.querySelectorAll('input[name="nombreRango[]"]');
                const values = document.querySelectorAll('input[name="rangos[]"]');

                correctaRango.forEach(input => {
                    if (input.checked) {
                        correcta.push(input.value);
                    }

                });
                nombreRango.forEach(input => {
                    nombre.push(input.value);
                });
                if (nombre.length <= 0) {
                    return alert("Por favor, seleccione los nombres de las opciones");
                }
                values.forEach(input => {
                    rango.push(input.value);
                });
                queryString1 = [JSON.stringify({
                    correcta: correcta,
                    respuestas: nombre,
                    rango: rango
                })];
                break;
                case '6':
                    const respuestaUnica = document.querySelectorAll('input[name="respuestaUnica[]"]');
                    const CorrectaUnicas = document.querySelectorAll('input[name="correctaUnica[]"]');
                    respuestaUnica.forEach(input => {
                        respuesta.push(input.value);
                    });
                    CorrectaUnicas.forEach(input => {
                        if (input.checked) {
                            correcta.push(input.value);
                        }
                    });
                    queryString1 = [JSON.stringify({
                        respuestas: respuesta,
                        correctas: correcta,
                    })];
                    break;               
        }
        const objectForm = {
            pregunta: btoa(pregunta.value),
            idCuestionario: btoa(localStorage.getItem("idCuestionario")),
            nombreUsuario: btoa(localStorage.getItem("nombreUsuario")),
            tipoRespuestas: btoa(tipoRespuestas.value)
        };
        const opcion2 = [objectForm];

        const queryString2 = buildQueryString(opcion2);
        const imageObjets = [JSON.parse(localStorage.getItem("imageObject"))];
        const imageObjet = buildQueryString(imageObjets);
        const base64String = localStorage.getItem('image');
        const url = `https://api.compucel.co/v4/?accion=registrarPregunta&models=${queryString1}&${queryString2}&${imageObjet}`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(base64String),
            headers: {
                'enctype': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                localStorage.removeItem('image');
                localStorage.removeItem('imageObject');
                Swal.fire("" + data.data[0].message + "");
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
            }).finally(() => {
                setTimeout(function () {
                    window.location.href = `http://prueba.tecnica.compucel.co/`;
                }, 3000);
            });


    });

});


