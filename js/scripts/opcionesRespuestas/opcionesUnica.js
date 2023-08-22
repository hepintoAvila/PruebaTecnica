
document.addEventListener("DOMContentLoaded", async () => {
const agregarCampoBtn = document.querySelector('#agregarCampoUnica');
const inputsContainer = document.querySelector('#inputsContainerUnica');
agregarCampoBtn.addEventListener('click', () => {
    const newInputContainer = document.createElement('div');
    newInputContainer.className = 'input-container';
    newInputContainer.innerHTML = `
    <input type="radio" class="resp-correcta" name="correctaUnica[]" id="${inputsContainer.childElementCount}" value="${inputsContainer.childElementCount - 1}"><button type="button" class="eliminar-campo-unica">-</button><input type="textarea" class="respuestaInput" name="respuestaUnica[]" placeholder="Respuesta ${inputsContainer.childElementCount-1}" required></textarea>
`;
    inputsContainer.appendChild(newInputContainer);

    const eliminarCampoBtns = document.querySelectorAll('.eliminar-campo-unica');
    eliminarCampoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(function(){ 
                inputsContainer.removeChild(btn.parentNode);
        }, 1500);
        });
    });
});
});