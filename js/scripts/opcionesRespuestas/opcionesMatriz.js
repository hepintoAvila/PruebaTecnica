document.addEventListener("DOMContentLoaded", async () => {
    /*/METODO Matrix*/
    const agregarCampoBtnMatriz = document.querySelector('#agregarCampoMatriz');
    const inputsContainerMatriz = document.querySelector('#inputsContainerMatriz');

    agregarCampoBtnMatriz.addEventListener('click', () => {
        if (inputsContainerMatriz.childElementCount === 2) {
            setTimeout(function () {
                const newInputContainerMatriz = document.createElement('div');
                newInputContainerMatriz.className = 'input-container';
                newInputContainerMatriz.innerHTML = `
            <input type="text" class="respuestaInput" name="tituloMatriz[]" value="" required placeholder="Titulo de la Matriz">
            <input type="text" class="respuestaInput" name="nombreInicial[]" placeholder="Nombre del Rango Inferior" value="" required>
            <input type="text" class="respuestaInput" name="nombreFinal[]" placeholder="Nombre del Rango Superior" value="" required>
            <input type="number" class="respuestaInput" name="rango[]" placeholder="Rango" value="" required>
            <button type="button" class="items-campo-matriz">Agregar Items</button>
            `;
                inputsContainerMatriz.appendChild(newInputContainerMatriz);
                const CampoBtnsMatriz = document.querySelector('.items-campo-matriz');
                CampoBtnsMatriz.addEventListener('click', () => {
                    setTimeout(function () {
                        const newInputContainerItems = document.createElement('div');
                        newInputContainerItems.className = 'input-container-desplegable';
                        newInputContainerItems.innerHTML = `<button type="button" class="eliminar-items-matriz">-</button><input type="text" class="respuestaInput" name="itemsMatriz[]" value="" required>`;
                        inputsContainerMatriz.appendChild(newInputContainerItems);
                        const eliminarItems = document.querySelectorAll('.eliminar-items-matriz');
                        eliminarItems.forEach(btnItems => {
                            btnItems.addEventListener('click', () => {
                                setTimeout(function () {
                                    inputsContainerMatriz.removeChild(btnItems.parentNode);
                                }, 1500);
                            });
                        });
                    }, 1500);
                });
            }, 1500);
        }
    });

});