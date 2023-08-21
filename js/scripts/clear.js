  function clearPage() {
    const verifRole = localStorage.getItem("rol");
    if (!verifRole) {
        localStorage.clear();
        
    }

    
}

(function($) {
  "use strict"; 
  $(window).on('load', function() {
      function PreloaderActualFecha() {
          setTimeout(function() {
            const fechaHoraActual = new Date();
            const anio = fechaHoraActual.getFullYear();
            const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Se suma 1 al mes porque los meses en JavaScript comienzan en 0
            const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
            const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
            const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
            const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');
            document.querySelector("#updateFecha").value=  `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
            document.querySelector("#fechaFinal").value=  `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
          }, 500);
      }
      PreloaderActualFecha();
  });

})(jQuery);
