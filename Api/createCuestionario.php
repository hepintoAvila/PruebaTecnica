
						
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
						$titulo    = limpiarEspaciosEnBlanco($titulo);
						$descripcion    = limpiarEspaciosEnBlanco($descripcion);
						$nombreUsuario    = limpiarEspaciosEnBlanco($nombreUsuario);
						$fechaInicio    = limpiarEspaciosEnBlanco($fechaInicio);
						$fechaFinal    = limpiarEspaciosEnBlanco($fechaFinal);
						$tiempoPrueba    = limpiarEspaciosEnBlanco($tiempoPrueba);
						$usuario    = limpiarEspaciosEnBlanco($nombreUsuario);
						$tema    = limpiarEspaciosEnBlanco($tema);
						

						$consulta = $conexion->prepare("INSERT INTO tab_cuestionarios( 
						titulo, 
						descripcion, 
						fechaInicio, 
						fechaFinal, 
						tiempoPrueba, 
						tema, 
						usuario) VALUES ( 
						:titulo, 
						:descripcion, 
						:fechaInicio, 
						:fechaFinal, 
						:tiempoPrueba, 
						:tema, 
						:usuario)
						");

						// Vincular los valores a los marcadores de posición
						$consulta->bindParam(':titulo', $titulo, PDO::PARAM_STR);
						$consulta->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
						$consulta->bindParam(':fechaInicio', $fechaInicio, PDO::PARAM_STR);
						$consulta->bindParam(':fechaFinal', $fechaFinal, PDO::PARAM_STR);
						$consulta->bindParam(':tiempoPrueba', $tiempoPrueba, PDO::PARAM_STR);
						$consulta->bindParam(':tema', $tema, PDO::PARAM_STR);
						$consulta->bindParam(':usuario', $usuario, PDO::PARAM_STR);


						// Ejecutar la consulta de actualización
						$resultado = $consulta->execute();						
?>