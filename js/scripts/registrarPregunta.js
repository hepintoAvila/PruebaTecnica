
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

        const $pregunta = document.querySelector("#pregunta"),
            preguntas = $pregunta.value;

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
            correcta: btoa(valorCorrecto.join(','))
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
                   window.location.href = "http://prueba.tecnica.compucel.co";
                }, 3000);
            });

    });

    const agregarCampoBtn = document.querySelector('#agregarCampo');
    const inputsContainer = document.querySelector('#inputsContainer');
    agregarCampoBtn.addEventListener('click', () => {
        const newInputContainer = document.createElement('div');
        newInputContainer.className = 'input-container';
        newInputContainer.innerHTML = `
        <input type="checkbox" class="resp-correcta" name="correcta[]" id="${inputsContainer.childElementCount - 1}" value="${inputsContainer.childElementCount - 1}"><button type="button" class="eliminar-campo">-</button><input type="textarea" class="respuestaInput" name="respuesta[]" placeholder="Respuesta ${inputsContainer.childElementCount - 1}" required></textarea>
      
    `;
        inputsContainer.appendChild(newInputContainer);

        const eliminarCampoBtns = document.querySelectorAll('.eliminar-campo');
        eliminarCampoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                inputsContainer.removeChild(btn.parentNode);
            });
        });
    });

});