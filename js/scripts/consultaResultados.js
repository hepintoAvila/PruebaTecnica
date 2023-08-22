
function consultaResultados() {
    const quizForm = document.querySelector('#quiz-form');
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
                     
                    <label>La respuesta Correcta era la opción: ${answer} y usted respondio la : ${respuesta} </label> 
                    </li>
                    </ul>`;  

               

        quizForm.appendChild(questionElement);
    }
}


(function ($) {
    "use strict";
    $(window).on('load', function () {
        function PreloaderResultados() {
            setTimeout(function () {
                if (localStorage.getItem("rol")) {
                    consultaResultados();
                }
            }, 500);
        }
        PreloaderResultados();
    });

})(jQuery);
