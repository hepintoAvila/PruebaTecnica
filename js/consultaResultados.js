
 

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
    
    function consultaResultados(id,callback) {
        localStorage.removeItem("datosResultadosById");
        localStorage.removeItem("Cuestionarios");
        localStorage.removeItem("timer");
        localStorage.removeItem("CuestionariosById");
        localStorage.removeItem("datosBasicosCuestionario");
        localStorage.removeItem("Cuestionarios");
        
    const url = `https://api.compucel.co/v4/?accion=consultaResultados&id=${id}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
                localStorage.removeItem("datosResultadosById");
                localStorage.removeItem("datosBasicosCuestionario");
                localStorage.removeItem("CalificacionPorcentual");
                localStorage.removeItem("CalificacionPromedio");
                localStorage.removeItem("NumeroCorrectas");
                

                localStorage.setItem("datosResultadosById", JSON.stringify(data.data.Preguntas));
                localStorage.setItem("datosBasicosCuestionario", JSON.stringify(data.data.Cuestionario));

                localStorage.setItem("CalificacionPorcentual", data.data.CalificacionPorcentual);
                localStorage.setItem("CalificacionPromedio", data.data.CalificacionPromedio);
                localStorage.setItem("NumeroCorrectas", data.data.NumeroCorrectas);
                callback();
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        });

}

function consultaResultadosLoadPage() {

 // Load questions dynamically
                                
 const quizForm = document.querySelector('#quiz-form');

     const numeroID = obtenerNumeroDeID();
     console.log('numeroID',numeroID);
     if (Number(numeroID)>0) {

        consultaResultados(numeroID,()=>{
         // Questions and options - You can load these from a JSON file as well
         const questions = JSON.parse(localStorage.getItem("datosResultadosById"));

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
                             <input type="radio" name="respondidas${i}" value="${id}-${idCuestionario}-${Number(index+1)}"  ${index===Number(answer-1)?'checked':''}>
                             <label>${option}</label>
                         </li>
                     `).join('')}
                     <li><label>La respuesta Correcta era la opción : ${Number(answer-1)}</label> </li>
                     </ul>`;
             quizForm.appendChild(questionElement);
         }
            
        });



         
     }
    
    
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

function datosPuntuacion() {
    let CalificacionPorcentual = localStorage.getItem("CalificacionPorcentual");
    let CalificacionPromedio = localStorage.getItem("CalificacionPromedio");
    let NumeroCorrectas = localStorage.getItem("NumeroCorrectas");

    const h1s = document.createElement("p");
    const spans = document.createElement("span");
    const spansp = document.createElement("p");
    const spansn = document.createElement("p");
    spans.classList.add("text-container");
    spans.textContent = 'CALIFICACIÓN PORCENTUAL: ' + CalificacionPorcentual;
    spansp.textContent = 'CALIFICACIÓN PROMEDIO: ' + CalificacionPromedio;
    spansn.textContent = 'CONTESTADAS: ' + NumeroCorrectas;
    h1s.appendChild(spans);
    h1s.appendChild(spansp);
    h1s.appendChild(spansn);
    return h1s;
}