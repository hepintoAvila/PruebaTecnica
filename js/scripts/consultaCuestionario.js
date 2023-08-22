
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

function loadQuestions(callback) {
    // Load questions dynamically
    const quizForm = document.querySelector('#quiz-form');
    const numeroID = obtenerNumeroDeID();
     if (Number(numeroID) > 0) {
            // Questions and options - You can load these from a JSON file as well
            let CuestionariosById = localStorage.getItem("CuestionariosById");
            let rol = localStorage.getItem("rol");
            const questions = JSON.parse(CuestionariosById);
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                const answer = questions[i].answer;
                const id = questions[i].id;
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                switch (questions[i].tipoRespuesta) {
                    case '1': 
                    questionElement.innerHTML = `
                  <p class ="questionTitle"><strong>${question.question}</strong></p>
                  ${question.imagen ==='SIMG' ? '<img class="rounded float-start" src="http://api.compucel.co/IMG/pruebaTecnica/SIMG.png"  width="2" height="4"></img>' : `<img class="rounded float-start" src="${question.imagen}"  width="200" height="250"></img>`}
                  
                  <ul>
                      ${question.options.map((option, index) =>
    
                        `
                          <li >
                              <input type="checkbox" class="form-check-input" id="respondidas${id}-${i}-${index}" name="respondidas${id}-${i}-${index}" value="${index}"  ${index === Number(answer - 1) && (rol ==='instructor') ? 'checked' : ''}>
                              <label>${option}</label>
                          </li>
                      `).join('')}
                  </ul>`;
                    break
                    case '6': 
                    questionElement.innerHTML = `
                    <p class ="questionTitle"><strong>${quizForm.childElementCoun} --${question.question}</strong></p>
                    ${question.imagen ==='SIMG' ? '<img class="rounded float-start" src="http://api.compucel.co/IMG/pruebaTecnica/SIMG.png"  width="2" height="4"></img>' : `<img class="rounded float-start" src="${question.imagen}"  width="200" height="250"></img>`}
                    <ul>
                        ${question.options.map((option, index) =>
      
                          `
                            <li >
                                <input type="radio" class="form-check-input" id="respondidas${i}" name="respondidas${i}" value="${index}"  ${index === Number(answer - 1) && (rol ==='instructor') ? 'checked' : ''}>
                                <label>${option}</label>
                            </li>
                        `).join('')}
                    </ul>`;
                    break
                }      
                quizForm.appendChild(questionElement);
            }

        }
        callback();
    }

function datosBasicosTitulo() {
    let datosBasicos = localStorage.getItem("datosBasicosCuestionario");
    const basicos = JSON.parse(datosBasicos);
    const h1s = document.createElement("h1");
    const spans = document.createElement("span");
    spans.classList.add("text-container");
    spans.textContent = basicos.Titulo;
    h1s.appendChild(spans);
    return h1s;
}
function datosBasicosDescripcion() {
    let datosBasicos = localStorage.getItem("datosBasicosCuestionario");
    const basicos = JSON.parse(datosBasicos);
    const h1s = document.createElement("p");
    const spans = document.createElement("span");
    spans.classList.add("text-container");
    spans.textContent = 'DESCRIPCIÓN: ' + basicos.Descripcion;
    h1s.appendChild(spans);
    return h1s;
}
function datosBasicosTiempoPrueba(datosBasicos) {
    const basicos = JSON.parse(datosBasicos);
    const h1s = document.createElement("p");
    const spans = document.createElement("span");
    spans.classList.add("text-container");
    spans.textContent = 'TIEMPO DE LA PRUEBA: ' + basicos.tiempoPrueba;
    h1s.appendChild(spans);
    return h1s;
}

 