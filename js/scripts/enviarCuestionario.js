
function buildQueryString(opcion) {
    let datos = opcion;
    let queryString = datos[0]
        ? Object.keys(datos[0])
            .map((key) => `${key}=${datos[0][key]}`)
            .join("&")
        : "";

    return queryString;
}

function enviarCuestionario(valores) {

            const opcion = [valores];
            const queryString1 = JSON.stringify(opcion);
            const objectForm = {
                nombreUsuario: btoa(localStorage.getItem("nombreUsuario")),
            };
            const opcion2 = [objectForm];
            const queryString2 = buildQueryString(opcion2);
            const url = `https://api.compucel.co/v4/?accion=enviarCuestionario&models=${queryString1}&${queryString2}`;
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

};
function getCuestionario() {
    const valores = [];
    let CuestionariosById = localStorage.getItem("CuestionariosById");
    const questions = JSON.parse(CuestionariosById);
    const quizForm = document.getElementById('quiz-form');
    const formData = new FormData(quizForm);

    for (let i = 0; i < questions.length; i++) {
        valores.push(formData.get(`respondidas${i}`));
    }
    return valores;
}