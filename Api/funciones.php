<?php
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Holmes Pinto (holmespinto@gmail.com)
 **/

				function var2js($var) {
					$asso = false;
					switch (true) {
						case is_null($var):
							return 'null';
						case is_string($var):
							return '"' . addcslashes($var, "\"\\\n\r/") . '"';
						case is_bool($var):
							return $var ? 'true' : 'false';
						case is_scalar($var):
							return (string)$var;
						case is_object($var):// blam
							$var = get_object_vars($var);
							$asso = true;
							// $var devient un array, on continue
						case is_array($var):
							$keys = array_keys($var);
							$ikey = count($keys);
							while (!$asso && $ikey--) {
								$asso = $ikey !== $keys[$ikey];
							}
							$sep = '';
							if ($asso) {
								$ret = '{';
								foreach ($var as $key => $elt) {
									$ret .= $sep . '"' . $key . '":' . var2js($elt);
									$sep = ',';
								}

								return $ret . '}';
							} else {
								$ret = '[';
								foreach ($var as $elt) {
									$ret .= $sep . var2js($elt);
									$sep = ',';
								}

								return $ret . ']';
							}
					}

					return false;
				}
			function convertirJSONtoArray($jsonString) {
				$array = json_decode($jsonString, true);
				return $array;
			}

		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : getfechaformat()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */							
		function getfechaformat($get){	
					$p=array();
						date_default_timezone_set('America/Bogota');
						$fecha_inicio=base64_decode($get['fechaInicio']).'';
						$fecha_final=base64_decode($get['fechaFinal']).'';
						
						$fecha_inicio = date_create($fecha_inicio);
						$fecha_inicio = date_format($fecha_inicio, 'Y-m-d H:i:s');	

						$fecha_final = date_create($fecha_final);
						$fecha_final = date_format($fecha_final, 'Y-m-d H:i:s');
			$p['fechaInicio']= $fecha_inicio;			
			$p['fechaFinal']= $fecha_final;
			return $p;	
		}
		
			/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : registrarRespuesta()
		 * Parametros de entrada : $idCuestionario,$idPregunta,$respuesta,$nombreUsuario
		 * Parametros de Salida:  resultado
		 */							
		function registrarRespuesta($idCuestionario,$idPregunta,$respuesta,$nombreUsuario,$conexion){	
						
						
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
					return 	$resultado;
		}		
function calcularDiferenciaEnHorasYMinutos($Var1, $Var2) {
    date_default_timezone_set('UTC'); // Configurar la zona horaria a UTC
    $now = time(); // Tiempo actual en segundos desde el Unix epoch (medianoche)

    $fechaVar1 = strtotime($Var1); // Convertir la cadena de fecha a tiempo en segundos
    $fechaVar2 = strtotime($Var2);

    // Calcular la diferencia en segundos entre las fechas y la fecha actual a medianoche
    $diferenciaVar1 = $fechaVar1 - strtotime(date('Y-m-d', $now));
    $diferenciaVar2 = $fechaVar2 - strtotime(date('Y-m-d', $now));

    // Convertir la diferencia en segundos a horas y minutos
    $horasVar1 = floor($diferenciaVar1 / 3600);
    $minutosVar1 = floor(($diferenciaVar1 % 3600) / 60);

    $horasVar2 = floor($diferenciaVar2 / 3600);
    $minutosVar2 = floor(($diferenciaVar2 % 3600) / 60);

    return [
        'horasVar1' => $horasVar1,
        'minutosVar1' => $minutosVar1,
        'horasVar2' => $horasVar2,
        'minutosVar2' => $minutosVar2
    ];
}
function obtenerAnioDeFecha($Var2) {
    $fecha = strtotime($Var2); // Convertir la cadena de fecha a tiempo en segundos
    $anio = date('Y', $fecha); // Extraer el año de la fecha

    return $anio;
}				
?>