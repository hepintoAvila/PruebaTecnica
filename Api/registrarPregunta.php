	
<?php
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Hosmmer Pinto (@gmail.com)
 **/
							// Hacer algo con el resultado
						$consulta = $conexion->prepare("INSERT INTO tab_respuestas( 
						idCuestionario, 
						pregunta,
						respuestas, 
						correcta, 
						usuario,
						imagen) VALUES ( 
						:idCuestionario, 
						:pregunta, 
						:respuestas, 
						:correcta, 
						:usuario,
						:imagen)
						");

						// Vincular los valores a los marcadores de posición
						$consulta->bindParam(':idCuestionario', $idCuestionario, PDO::PARAM_INT);
						$consulta->bindParam(':pregunta', $pregunta, PDO::PARAM_STR);
						$consulta->bindParam(':respuestas', $respuestas, PDO::PARAM_STR);
						$consulta->bindParam(':correcta', $correcta, PDO::PARAM_STR);
						$consulta->bindParam(':usuario', $nombreUsuario, PDO::PARAM_STR);
						$consulta->bindParam(':imagen', $imagen, PDO::PARAM_STR);
						$id = $consulta->execute();						
?>