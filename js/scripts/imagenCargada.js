const handleAcceptedFiles = (selectedFile) => {
    const datosfiles = {
        filename: selectedFile.name,
        size: selectedFile.size,
        formattedSize: selectedFile.formattedSize,
        lastModified: selectedFile.lastModified,
        type: selectedFile.type,
    };
    return datosfiles;

};
document.addEventListener("DOMContentLoaded", async () => {
    // Obtener referencia al elemento de entrada de imagen
    const imagenInput = document.getElementById("imagenInput");
    // Obtener referencia al elemento de imagen donde se mostrará la imagen cargada
    const imagenCargada = document.getElementById("imagenCargada");
    // Obtener referencia al botón de subir imagen

    // Agregar un evento de cambio al input de imagen
    imagenInput.addEventListener("change", function (event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        localStorage.removeItem('image');
        localStorage.removeItem('imageObject');
        if (file) {
            const datosfiles = handleAcceptedFiles(file)
            localStorage.setItem('imageObject', JSON.stringify(datosfiles))
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            // Cuando la lectura del archivo termine
            reader.onload = function () {
                // Convertir el contenido del archivo a una cadena base64
                const base64String = btoa(
                    new Uint8Array(reader.result)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                localStorage.setItem('image', base64String)
            };


            // Validar el tipo de archivo
            if (file.type.startsWith("image/")) {
                // Crear un objeto URL para la imagen
                const imageUrl = URL.createObjectURL(file);
                // Mostrar la imagen en el elemento de imagen
                imagenCargada.src = imageUrl;
            } else {
                alert("Por favor, selecciona un archivo de imagen.");
            }
        }
    });
});
