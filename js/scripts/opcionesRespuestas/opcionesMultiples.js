
document.addEventListener("DOMContentLoaded", async () => {
const agregarCampoBtn = document.querySelector('#agregarCampoMultiple');
const inputsContainer = document.querySelector('#inputsContainerMultiple');
agregarCampoBtn.addEventListener('click', () => {
    const newInputContainer = document.createElement('div');
    newInputContainer.className = 'input-container';
    newInputContainer.innerHTML = `
    <input type="checkbox" class="resp-correcta" name="correctaMultiple[]" id="${inputsContainer.childElementCount}" value="${inputsContainer.childElementCount - 1}"><button type="button" class="eliminar-campo-multiple">-</button><input type="textarea" class="respuestaInput" name="respuestaMultiple[]" placeholder="Respuesta ${inputsContainer.childElementCount-1}" required></textarea>
`;
    inputsContainer.appendChild(newInputContainer);

    const eliminarCampoBtns = document.querySelectorAll('.eliminar-campo-multiple');
    eliminarCampoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(function(){ 
                inputsContainer.removeChild(btn.parentNode);
        }, 1500);
        });
    });
});
});