document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Rango*/
    const agregarCampoBtnRango= document.querySelector('#agregarCampoRango');
    const inputsContainerRango = document.querySelector('#inputsContainerRangos');

    agregarCampoBtnRango.addEventListener('click', () => {
        setTimeout(function(){
        const newInputContainerRango = document.createElement('div');
        newInputContainerRango.className = 'input-container';
        newInputContainerRango.innerHTML = `<input type="radio" class="resp-rango" name="correctaRango[]" id="rango_${inputsContainerRango.childElementCount - 2}" value="" required><input type="text" class="respuestaInput" name="nombreRango[]"  value="" required><input type="number" class="respuestaInput" name="rango[]" value="" required>`;
        inputsContainerRango.appendChild(newInputContainerRango);
    }, 1500);
    });
});
