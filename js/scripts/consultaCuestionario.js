


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

function consultaCuestionario(id, callback) {

    if(Number(id)>0){
    const url = `https://api.compucel.co/v4/?accion=consultaCuestionario&id=${id}`;
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
            callback();
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });
    }   
}

function loadQuestions() {

    // Load questions dynamically

    const quizForm = document.querySelector('#quiz-form');

    const numeroID = obtenerNumeroDeID();
    console.log('numeroID', numeroID);
    if (Number(numeroID) > 0) {


        consultaCuestionario(numeroID, () => {
            // Questions and options - You can load these from a JSON file as well
            let CuestionariosById = localStorage.getItem("CuestionariosById");
            let rol = localStorage.getItem("rol");
            const questions = JSON.parse(CuestionariosById);
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                const answer = questions[i].answer;
                const id = questions[i].id;
                const idCuestionario = questions[i].idCuestionario;

                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
              <p>${question.question}</p>
              <ul>
                  ${question.options.map((option, index) =>

                    `
                      <li>
                          <input type="radio" name="respondidas${i}" value="${id}-${idCuestionario}-${Number(index + 1)}"  ${index === Number(answer - 1) && (rol ==='instructor') ? 'checked' : ''}>
                          <label>${option}</label>
                      </li>
                  `).join('')}
              </ul>
          `;
                quizForm.appendChild(questionElement);
            }
        });




    }


}