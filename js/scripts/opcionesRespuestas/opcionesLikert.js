document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Likert*/
    const agregarCampoBtnLikert = document.querySelector('#agregarCampoLikert');
    const inputsContainerLikert = document.querySelector('#inputsContainerLikert');

    agregarCampoBtnLikert.addEventListener('click', () => {
        setTimeout(function(){
            const respuestasArray = [
                    "Totalmente en desacuerdo",
                    "En desacuerdo",
                    "Ni de acuerdo ni en desacuerdo",
                    "De acuerdo",
                    "Totalmente de acuerdo"
                    ]; 
        const newInputContainerLikert = document.createElement('div');
        newInputContainerLikert.className = 'input-container-likert';
        newInputContainerLikert.innerHTML = `<input type="radio" class="resp-likert" name="correctaLikert[]" id="Likert_${inputsContainerLikert.childElementCount - 2}" value="${inputsContainerLikert.childElementCount - 2}"><button type="button" class="eliminar-campo-likert">-</button><input type="text" class="respuestaInput-likert" name="correctaLikert[]" value="${respuestasArray[inputsContainerLikert.childElementCount -3]}" required>`;
        inputsContainerLikert.appendChild(newInputContainerLikert);
    }, 1500);
    });
});