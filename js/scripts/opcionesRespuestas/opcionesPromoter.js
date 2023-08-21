document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Promoter*/
    const agregarCampoBtnPromoter= document.querySelector('#agregarCampoPromoter');
    const inputsContainerPromoter = document.querySelector('#inputsContainerPromoter');

    agregarCampoBtnPromoter.addEventListener('click', () => {
        setTimeout(function(){
        const newInputContainerPromoter= document.createElement('div');
        newInputContainerPromoter.className = 'input-container';
        newInputContainerPromoter.innerHTML = `<input type="text" class="respuestaInput" name="nombrePromoter[]"  value="" required><input type="number" class="respuestaInput" name="rangoPromoter[]" value="" required>`;
        inputsContainerPromoter.appendChild(newInputContainerPromoter);
    }, 1500);
    });
});