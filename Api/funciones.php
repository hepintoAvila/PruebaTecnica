<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: text/html; charset=utf-8");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");
// Si no se han enviado encabezados, enviar uno
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Holmes Pinto (holmespinto@gmail.com)
 **/


		/**
		 * Retorno los parametros para concatenar las variables de las json
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : var2js()
		 * Parametros de entrada : $var
		 * Parametros de Salida:  false
		 */		
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
				/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : calcularDiferenciaEnHorasYMinutos()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
				function calcularDiferenciaEnHorasYMinutos($Var1, $Var2) {
					date_default_timezone_set('America/Bogota');
					$fechaAcutual = date('Y-m-d').' '.date("H:i:s");
					$fecha_inicios = date_create($fechaAcutual);
					$fecha_inicio = date_format($fecha_inicios, 'Y-m-d H:i:s');						
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
						'minutosVar2' => $minutosVar2,
						'fechaAcutual' => $fecha_inicio,
						'now' => date("H:i:s")
					];
				}
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : calcularTiempoEncuesta()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */					
				function calcularTiempoEncuesta($Var1) {
					date_default_timezone_set('America/Bogota');
					$fechaAcutual = date('Y-m-d').' '.date("H:i:s");
					$fecha_inicios = date_create($fechaAcutual);
					$fecha_inicio = date_format($fecha_inicios, 'Y-m-d H:i:s');						
					
					$fechaVar1 = strtotime($Var1); // Convertir la cadena de fecha a tiempo en segundos

					// Calcular la diferencia en segundos entre las fechas y la fecha actual a medianoche
					$diferenciaVar1 = strtotime($fecha_inicio)- $fechaVar1;

					// Convertir la diferencia en segundos a horas y minutos
					$horas = floor($diferenciaVar1 / 3600);
					$minutos = floor(($diferenciaVar1 % 3600) / 60);

					return array($horas,$minutos);
				}				
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : obtenerAnioDeFecha()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
				function obtenerAnioDeFecha($Var2) {
					$fecha = strtotime($Var2); // Convertir la cadena de fecha a tiempo en segundos
					$anio = date('Y', $fecha); // Extraer el año de la fecha

					return $anio;
				}	
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : file_force_contents()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
			function file_force_contents( $fullPath, $contents, $flags = 0 ){
				$parts = explode( '/', $fullPath );
				array_pop( $parts );
				$dir = implode( '/', $parts );
				
				if( !is_dir( $dir ) )
					mkdir( $dir, 0777, true );
				
				file_put_contents( $fullPath, $contents, $flags );
			}	
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : file_force_contents()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
			function consultaRol($nombreUsuario,$conexion){
								$resp_user = "SELECT wrol FROM  tab_usuarios WHERE wnombre ='".$nombreUsuario."'";
								$stmt_correct = $conexion->prepare($resp_user);
								$stmt_correct->execute();
								$correct = $stmt_correct->fetchAll(PDO::FETCH_ASSOC);
								  foreach($correct as $b => $val){
									return $wrol = $val["wrol"];
								}
			}
					/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : file_force_contents()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
			function consultaRespuestaPregunta($idCuestionario,$idPregunta,$nombreUsuario,$conexion){
				$resp_user = "SELECT respuesta FROM tab_respuestasUsuarios WHERE idCuestionario='".$idCuestionario."' AND idPregunta ='".$idPregunta."' AND usuario ='".$nombreUsuario."'";
				$stmt_correct = $conexion->prepare($resp_user);
				$stmt_correct->execute();
				$stmt = $stmt_correct->fetchAll(PDO::FETCH_ASSOC);
					foreach($stmt as $l => $vals){
						return $vals["respuesta"];
					}
			}
			/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : file_force_contents()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */	
			function consultaRespCuestionario($idCuestionario,$nombreUsuario,$conexion){	
									
						$resp_evaluador = "SELECT * FROM tab_respuestas WHERE idCuestionario='".$idCuestionario."'";
						$stmt_correct = $conexion->prepare($resp_evaluador);
						$stmt_correct->execute();
						$correct = $stmt_correct->fetchAll(PDO::FETCH_ASSOC);
	   				      foreach($correct as $b => $val){
							$resp_user = "SELECT * FROM tab_respuestasUsuarios WHERE idPregunta='".$val["id"]."' AND idCuestionario='".$idCuestionario."' AND usuario ='".$nombreUsuario."'"; 
							$stmt_user = $conexion->prepare($resp_user);
							$stmt_user->execute();
							$resp_user = $stmt_user->fetchAll(PDO::FETCH_ASSOC);
							foreach($resp_user as $k => $res){
								$respuesta = $res["respuesta"];
							}
							$totalCorrectas[] = ($respuesta==$val["correcta"]) ? 1:0;
						}
			 
						return array("CalificacionPorcentual"=>(array_sum($totalCorrectas)+ count($totalCorrectas))/2,
						"CalificacionPromedio"=>round((array_sum($totalCorrectas)/count($totalCorrectas))*100,1),
						"NumeroCorrectas"=>(array_sum($totalCorrectas).'/'.count($totalCorrectas)));
						 
			}
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consultaCuestionarioById()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */			
		function consultaCuestionarioById($idCuestionario,$conexion){
			
						$consulta_cuestionarios = "SELECT * FROM tab_cuestionarios WHERE id='".$idCuestionario."'";
						$stmt_cuestionarios = $conexion->prepare($consulta_cuestionarios);
						$stmt_cuestionarios->execute();
						// Paso 3: Obtener los resultados
						$cuestionario = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);	
						
						$datosCuestionario =array("idCuestionario"=>$cuestionario[0]['id'],"Titulo"=>$cuestionario[0]['titulo'],"Descripcion"=>$cuestionario[0]['descripcion'],"tiempoPrueba"=>$cuestionario[0]['tiempoPrueba']);
						
						$consulta_respuest = "SELECT * FROM tab_respuestas WHERE idCuestionario='".$idCuestionario."'";
						$stmt_respuest = $conexion->prepare($consulta_respuest);
						$stmt_respuest->execute();
						// Paso 3: Obtener los resultados
						$datosrespuestas = $stmt_respuest->fetchAll(PDO::FETCH_ASSOC);						
					foreach($datosrespuestas as $a => $value){
						mb_internal_encoding('utf-8');
						$imagen = (!isset($value["imagen"]) OR empty(!$value["imagen"])) ? ''.$value["imagen"].'' : 'SIMG';
						
						$preg[]=array(
						 "id"=>$value["id"],
						 "idCuestionario"=>$value["idCuestionario"],
						 "question"=>utf8_encode($value["pregunta"]),
						 "options"=>explode('|',$value["respuestas"]),
						 "answer"=>$value["correcta"],
						 "imagen"=>$imagen						 
						 );
						}						
						
						$Cuestionarios= array("Cuestionario"=>$datosCuestionario);
						$Preguntas= array("Preguntas"=>$preg);
						$data = array("data"=>array_merge($Cuestionarios,$Preguntas));	
						return $data;
						
		}
		
			/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consultaCuestionariosIfExist()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */			
		function consultaCuestionariosIfExist($conexion){
						$sql_count= "SELECT COUNT(*) AS existe FROM tab_cuestionarios";
						$stmt_cuestionarios = $conexion->prepare($sql_count);
						$stmt_cuestionarios->execute();
						$datosrespuestas = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);
						foreach($datosrespuestas as $a => $value){
							return $value["existe"];
						}
		}
 			/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consultaRespuestasUsuariosIfExist()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */		
		function consultaRespuestasUsuariosIfExist($nombreUsuario,$conexion){
						$sql_count= "SELECT COUNT(*) AS existe FROM tab_respuestasUsuarios WHERE usuario ='".$nombreUsuario."'";
						$stmt_cuestionarios = $conexion->prepare($sql_count);
						$stmt_cuestionarios->execute();
						$datosrespuestas = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);
						foreach($datosrespuestas as $a => $value){
							return $value["existe"];
						}
		}
		
?>