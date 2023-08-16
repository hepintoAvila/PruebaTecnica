
						
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
						 $id = $datosArray[0]['id'];
						 $idUsuario = $datosArray[0]['idUsuario'];
						 $apellido1 = $datosArray[0]['apellido1'];
						 $apellido2 = $datosArray[0]['apellido2'];
						 $nombre1 = $datosArray[0]['nombre1'];
						 $nombre2 = $datosArray[0]['nombre2'];
						 $genero = $datosArray[0]['genero'];
						 $fec_nac = $datosArray[0]['fec_nac'];
						 $rh = $datosArray[0]['rh'];
						 $telefono = $datosArray[0]['telefono'];
						 $email = $datosArray[0]['email'];
						

						$consulta = $conexion->prepare("UPDATE tab_asistentes SET 
						idUsuario = :idUsuario, 
						apellido1 = :apellido1, 
						apellido2 = :apellido2, 
						nombre1 = :nombre1, 
						nombre2 = :nombre2, 
						genero = :genero, 
						fec_nac = :fec_nac, 
						rh = :rh, 
						telefono = :telefono, 
						email = :email 
						WHERE id = :id
						");

						// Vincular los valores a los marcadores de posición
						$consulta->bindParam(':id', $id, PDO::PARAM_INT);
						$consulta->bindParam(':idUsuario', $idUsuario, PDO::PARAM_INT);
						$consulta->bindParam(':apellido1', $apellido1, PDO::PARAM_STR);
						$consulta->bindParam(':apellido2', $apellido2, PDO::PARAM_STR);
						$consulta->bindParam(':nombre1', $nombre1, PDO::PARAM_STR);
						$consulta->bindParam(':nombre2', $nombre2, PDO::PARAM_STR);
						$consulta->bindParam(':genero', $genero, PDO::PARAM_STR);
						$consulta->bindParam(':fec_nac', $fec_nac, PDO::PARAM_STR);
						$consulta->bindParam(':rh', $rh, PDO::PARAM_STR);
						$consulta->bindParam(':telefono', $telefono, PDO::PARAM_STR);
						$consulta->bindParam(':email', $email, PDO::PARAM_STR);

						// Ejecutar la consulta de actualización
						$resultado = $consulta->execute();						
?>