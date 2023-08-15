
						
<?php
include_once "funciones.php";
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Hosmmer Pinto (@gmail.com)
 * @Developer:  Carlos Perez (@gmail.com)
 **/
							// Hacer algo con el resultado
						$idCuestionario    = limpiarEspaciosEnBlanco($idCuestionario);
						$idPregunta    = limpiarEspaciosEnBlanco($idPregunta);
						$respuesta    = limpiarEspaciosEnBlanco($respuesta);
						$consulta = $conexion->prepare("INSERT INTO tab_respuestasUsuarios( 
						idCuestionario, 
						idPregunta, 
						respuesta, 
						usuario) VALUES ( 
						:idCuestionario, 
						:idPregunta, 
						:respuesta, 
						:usuario)
						");

						// Vincular los valores a los marcadores de posición
						$consulta->bindParam(':idCuestionario', $idCuestionario, PDO::PARAM_INT);
						$consulta->bindParam(':idPregunta', $idPregunta, PDO::PARAM_INT);
						$consulta->bindParam(':respuesta', $respuesta, PDO::PARAM_STR);
						$consulta->bindParam(':usuario', $nombreUsuario, PDO::PARAM_STR);

						// Ejecutar la consulta de actualización
						$resultado = $consulta->execute();						
?>