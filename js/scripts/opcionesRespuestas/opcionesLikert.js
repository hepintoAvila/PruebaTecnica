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
        newInputContainerLikert.innerHTML = `<button type="button" class="eliminar-campo-likert">-</button><input type="text" class="respuestaInput" name="respuestaLikert[]" value="${respuestasArray[inputsContainerLikert.childElementCount -2]}" required>`;
        inputsContainerLikert.appendChild(newInputContainerLikert);
        
        /*Eliminar*/
        const eliminarLikert = document.querySelectorAll('.eliminar-campo-likert');
        eliminarLikert.forEach(btnLikert=> {
            btnLikert.addEventListener('click', () => {
                setTimeout(function(){ 
                    inputsContainerLikert.removeChild(btnLikert.parentNode);
            }, 1500);
            });
        });
    }, 1500);
    });
});