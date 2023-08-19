
 

function obtenerNumeroDeID() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    if (idParam !== null) {
        const numero = parseInt(idParam);
        if (!isNaN(numero)) {
            return numero;
        }
    }

    return null;
}

function consultaResultados(id, callback) {

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
            localStorage.removeItem("datosResultadosById");
            localStorage.removeItem("Cuestionarios");
            localStorage.removeItem("timer");
            localStorage.removeItem("CuestionariosById");
            localStorage.removeItem("datosBasicosCuestionario");
            localStorage.setItem("datosResultadosById", JSON.stringify(data.data.Preguntas));
            localStorage.setItem("datosBasicosCuestionario", JSON.stringify(data.data.Cuestionario));

        }).finally(() => {
            callback();
        })  
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });
    }

}

function consultaResultadosLoadPage() {

    // Load questions dynamically

    const quizForm = document.querySelector('#quiz-form');

    const numeroID = obtenerNumeroDeID();

    if (Number(numeroID) > 0) {

        consultaResultados(numeroID, () => {
            // Questions and options - You can load these from a JSON file as well
            const questions = JSON.parse(localStorage.getItem("datosResultadosById"));

            const rol = localStorage.getItem("rol");
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                const answer = questions[i].answer;
                const respuesta = questions[i].respuesta;
                const id = questions[i].id;
                const idCuestionario = questions[i].idCuestionario;

                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
                 <p>${question.question}</p>
                 ${question.imagen === 'SIMG' ? '<img src="http://api.compucel.co/IMG/pruebaTecnica/SIMG.png"  width="2" height="4"></img>' : `<img src="${question.imagen}"  width="200" height="250"></img>`}
              
                 <ul>
                     ${question.options.map((option, index) =>
                    `
                         <li>
                             <input type="radio" name="respondidas${i}" value="${id}-${idCuestionario}-${Number(index + 1)}"  ${rol === 'instructor' && index === Number(answer - 1) ? 'checked' : ''}>
                             <label>${option}</label>
                         </li>
                     `).join('')}
                     <li>
                      
                     <label>La respuesta Correcta era la opción: ${Number(answer)} y usted respondio la : ${Number(respuesta)} </label> 
                     </li>
                     </ul>`;
                quizForm.appendChild(questionElement);
            }
        });
    }
} 