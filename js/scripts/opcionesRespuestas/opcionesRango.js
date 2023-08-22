document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Rango*/
    const agregarCampoBtnRango= document.querySelector('#agregarCampoRango');
    const inputsContainerRango = document.querySelector('#inputsContainerRangos');

    agregarCampoBtnRango.addEventListener('click', () => {
        setTimeout(function(){
        const newInputContainerRango = document.createElement('div');
        newInputContainerRango.className = 'input-container';
        newInputContainerRango.innerHTML = `<input type="radio" class="resp-rango" name="correctaRango_5[]" id="correctaRango_5${inputsContainerRango.childElementCount - 2}" value="${inputsContainerRango.childElementCount - 2}"><button type="button" class="eliminar-campo-rango">-</button><input type="text" class="respuestaInput" name="nombreRango[]"  value="" required><input type="number" class="respuestaInput" name="rangos[]" value="" required>`;
        inputsContainerRango.appendChild(newInputContainerRango);
        const eliminarRango= document.querySelectorAll('.eliminar-campo-rango');
        eliminarRango.forEach(btnRango=> {
            btnRango.addEventListener('click', () => {
                setTimeout(function(){ 
                    inputsContainerRango.removeChild(btnRango.parentNode);
            }, 1500);
            });
        });
    }, 1500);
    });
});
