document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Desplegable*/
    const agregarCampoBtnDesplegable = document.querySelector('#agregarCampoDesplegable');
    const inputsContainerDesplegable = document.querySelector('#inputsContainerDesplegable');

    agregarCampoBtnDesplegable.addEventListener('click', () => {
        setTimeout(function(){
        const newInputContainerDesplegable = document.createElement('div');
        newInputContainerDesplegable.className = 'input-container-desplegable';
        newInputContainerDesplegable.innerHTML = `<input type="radio" class="resp-desplegable" name="correctaDesplegable[]" id="desplegable_${inputsContainerDesplegable.childElementCount - 2}" value="${inputsContainerDesplegable.childElementCount - 2}"><button type="button" class="eliminar-campo-desplegable">-</button><input type="text" class="respuestaInput-desplegable" name="correctaDesplegable[]" value="" required>`;
        inputsContainerDesplegable.appendChild(newInputContainerDesplegable);
    }, 1500);
    });
});
