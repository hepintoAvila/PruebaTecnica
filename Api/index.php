<?php
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Holmes Pinto (holmespinto@gmail.com)
 **/
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: text/html; charset=utf-8");
 	header("Expires: 0");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");
// Si no se han enviado encabezados, enviar uno
 
if (headers_sent()) {
    header('Location: https://api.compucel.co/v4/');
    exit;
}

include_once "base_de_datos.php";
include_once "funciones.php";
function limpiarEspaciosEnBlanco($cadena)
{
    return trim($cadena);
}

		switch($_GET['accion']) {	
				case "registrarUsuario":	

						include_once "base_de_datos.php";	
						$nusuario     = limpiarEspaciosEnBlanco($_GET["name"]);
						$password     = limpiarEspaciosEnBlanco($_GET["password"]);
						$email        = limpiarEspaciosEnBlanco($_GET["email"]);
						$rol          = limpiarEspaciosEnBlanco($_GET["rol"]);
						$token        = limpiarEspaciosEnBlanco($_GET["token"]);
						$encriptado   = limpiarEspaciosEnBlanco($_GET["encriptado"]);
						$id          = '';
					
						include_once "insertUsuarios.php";				
				break;
				case "iniciarSession":
						$usuario     = $_GET["usuario"];
						$password     = base64_decode($_GET["password"]);
				include_once "consultaUsuarios.php";	
				break;
				case "insertAsistentes":
						include_once "base_de_datos.php";	
						$idUsuario    = limpiarEspaciosEnBlanco($_GET["idUsuario"]);
						$apellido1    = limpiarEspaciosEnBlanco($_GET["apellido1"]);
						$apellido2    = limpiarEspaciosEnBlanco($_GET["apellido2"]);
						$nombre1      = limpiarEspaciosEnBlanco($_GET["nombre1"]);
						$nombre2      = limpiarEspaciosEnBlanco($_GET["nombre2"]);
						$genero   	  = limpiarEspaciosEnBlanco($_GET["genero"]);
						$fec_nac   	  = limpiarEspaciosEnBlanco($_GET["fec_nac"]);
						$rh   		  = limpiarEspaciosEnBlanco($_GET["rh"]);
						$telefono     = limpiarEspaciosEnBlanco($_GET["telefono"]);
						$email   	  = limpiarEspaciosEnBlanco($_GET["email"]);
						$id          = '';
				include_once "insertAsistentes.php";
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_asistentes";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();

						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						echo $_GET["callback"].'('.$var.')';				
				break;
				case "consultarAsistentes":
				include_once "base_de_datos.php";

						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_asistentes";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();

						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						echo $_GET["callback"].'('.$var.')';
				break;
				case "updateAsistentes":
						include_once "base_de_datos.php";
						$datosArray = convertirJSONtoArray($_GET['models']);
						include_once "updateAsistentes.php";
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_asistentes";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();

						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						echo $_GET["callback"].'('.$var.')';				
				break;
				case "destroyAsistentes":
						include_once "base_de_datos.php";
						$datosArray = convertirJSONtoArray($_GET['models']);
						$id = $datosArray[0]['id'];
						 
						$resp = $conexion->prepare("DELETE FROM tab_asistentes WHERE id = :id");
						// Vincular el valor al marcador de posición
						$resp->bindParam(':id', $id, PDO::PARAM_INT);

						// Ejecutar la consulta DELETE
						$resultado = $resp->execute();
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_asistentes";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();

						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						echo $_GET["callback"].'('.$var.')';
 					
				break;
				case "createAsistentes":
						include_once "base_de_datos.php";
						$datosArray = convertirJSONtoArray($_GET['models']);
						include_once "createAsistentes.php";
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_asistentes";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();

						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						echo $_GET["callback"].'('.$var.')';
 					
				break;
				case "registrarCuestionario":
						include_once "base_de_datos.php";
						$titulo     = base64_decode($_GET["titulo"]);
						$descripcion     = base64_decode($_GET["descripcion"]);
						$nombreUsuario     = base64_decode($_GET["nombreUsuario"]);
						$tema     = base64_decode($_GET["tema"]);
						
						$Fechas =  getfechaformat($_GET);
						$fechaInicio     = $Fechas["fechaInicio"];
						$fechaFinal     = $Fechas["fechaFinal"];	
						$tiempoPrueba     = base64_decode($_GET["tiempoPrueba"])*100;
						
						include_once "createCuestionario.php";
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_cuestionarios WHERE usuario='".$nombreUsuario."'";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();
						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						$Cuestionarios= array("Cuestionarios"=>$var);
						$message[] = array(
							'id'=>1,
							'message'=>'Registro guardado con exito',
							'status'=>'202');
						 
							
				if (!is_null($resultados)) {
					$data = array("data"=>array_merge($Cuestionarios,$message));	
					$var = var2js($data);
					echo $var;
				}else{
					$message[] = array(
							'id'=>1,
							'message'=>'::ERROR: Registro guardado con exito',
							'status'=>'404');
					$var = var2js($message);	
					echo $var;	                            
				}
 					
				break;
				case "eliminarCuestionario":
						include_once "base_de_datos.php";
						$id     = limpiarEspaciosEnBlanco($_GET["id"]);
						
						$resp = $conexion->prepare("DELETE FROM tab_cuestionarios WHERE id = :id");
						// Vincular el valor al marcador de posición
						$resp->bindParam(':id', $id, PDO::PARAM_INT);
						// Ejecutar la consulta DELETE
						$resultado = $resp->execute();
							
				if (!is_null($resultado)) {					 
						include_once "base_de_datos.php";
						$usuario     = limpiarEspaciosEnBlanco(base64_decode($_GET["usuario"]));
						// Paso 2: Preparar y ejecutar la consulta
						$consulta = "SELECT * FROM tab_cuestionarios WHERE usuario ='".$usuario."'";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();
						// Paso 3: Obtener los resultados
						$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
						$var = var2js($resultados);
						$Cuestionarios= array("Cuestionarios"=>$var);						
					$message[] = array(
							'id'=>1,
							'message'=>'Registro eliminado con exito',
							'status'=>'202');
					$data = array("data"=>array_merge($Cuestionarios,$message));	
					$var = var2js($data);
					echo $var;
				}else{
					$message[] = array(
							'id'=>1,
							'message'=>'::ERROR: Registro no fue eliminado',
							'status'=>'404');
					$var = var2js($message);	
					echo $var;	                            
				}
 					
				break;
				case "registrarPregunta":
						include_once "base_de_datos.php";
				//GUARDE LA IMAGEN EN E SERVIDOR
						$idCuestionario = limpiarEspaciosEnBlanco(base64_decode($_GET["idCuestionario"]));
						
						if(!isset($_GET['type']) or empty($_GET['type'])){
							$imagen='';
						}else{
								$type=$_GET['type'];
								$dir_img='../IMG/pruebaTecnica/';
								$datos = json_decode(file_get_contents('php://input'), true);
								$decodedImage = base64_decode($datos);	
								$num_preguntas = "SELECT COUNT(*) AS num FROM tab_respuestas WHERE idCuestionario='".$idCuestionario."'";
								$preguntas = $conexion->prepare($num_preguntas);
								$preguntas->execute();
								$num = $preguntas->fetchAll(PDO::FETCH_ASSOC);
								
								$extension = str_replace("image/", '', $type);
								$filename = 'C'.$idCuestionario.'P'.$num[0]['num'].'.'.$extension;				
								$destino=$dir_img.$extension.'/'.$filename ;		
								file_force_contents($destino,$decodedImage , LOCK_EX );	
								$dir_img='https://'.$_SERVER["SERVER_NAME"].'/IMG/pruebaTecnica/'.$extension;
								$imagen=$dir_img.'/'.$filename;		
							
						}
						
						$datosArray = convertirJSONtoArray($_GET['models']);
						$respuestas = limpiarEspaciosEnBlanco(implode("|", $datosArray[0]));
						$pregunta = limpiarEspaciosEnBlanco(base64_decode($_GET["pregunta"]));
						$nombreUsuario = limpiarEspaciosEnBlanco(base64_decode($_GET["nombreUsuario"]));
						$correcta = limpiarEspaciosEnBlanco(base64_decode($_GET["correcta"]));
						include_once "registrarPregunta.php";
						
						$consulta = "SELECT * FROM tab_respuestas WHERE idCuestionario='".$idCuestionario."'";
						$stmt = $conexion->prepare($consulta);
						$stmt->execute();
						$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
			 if (!is_null($resultado)) {
				 	$message[] = array(
							'id'=>1,
							'message'=>'Registro guardado con exito',
							'status'=>'202');
					$data = array("data"=>$message);	
					$var = var2js($data);
					echo $var;
			}else{
					$message[] = array(
							'id'=>1,
							'message'=>'::ERROR: Registro no fue guardado',
							'status'=>'404');
							$data = array("data"=>$message);	
					$var = var2js($data);	
					echo $var;	                            
				}	 
				break;
				case "consultaCuestionario":
						$idCuestionario = limpiarEspaciosEnBlanco($_GET["id"]);
						include_once "base_de_datos.php";
						$data = consultaCuestionarioById($idCuestionario,$conexion);
						$var = var2js($data);	
						echo $var;
						
				break;
				case "consultaAllCuestionario":
						include_once "base_de_datos.php";
						$ids=array();
						$usuario  = limpiarEspaciosEnBlanco(base64_decode($_GET["usuario"]));
						$resp_res = "SELECT COUNT(*) AS existe FROM tab_cuestionarios WHERE usuario='".$usuario."'";
						$stmt_res = $conexion->prepare($resp_res);
						$stmt_res->execute();
						$resp = $stmt_res->fetchAll(PDO::FETCH_ASSOC);
	   				      foreach($resp as $b => $val){
							$existe = $val["existe"];
						}						
						
					 if ($existe==0) {
						$Cuestionarios= array("Cuestionarios"=>array(
						 "id"=>1,
						 "Título"=>'NO EXISTEN REGISTROS',
						 "Descripción"=>'',
						 "Fechas"=>'',
						 "Tiempo"=>'',
						 "Tema"=>'',
						 "Responsable"=>'',
						 "status"=>'303'));
						$data = array("data"=>$Cuestionarios);
						$var = var2js($data);	
						echo $var;	
					}else{
						$consulta_cuestionarios = "SELECT * FROM tab_cuestionarios WHERE usuario='".$usuario."'";
						$stmt_cuestionarios = $conexion->prepare($consulta_cuestionarios);
						$stmt_cuestionarios->execute();
						$datosrespuestas = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);
					foreach($datosrespuestas as $a => $value){
								$cuestions[]=array(
								 "id"=>$value["id"],
								 "Título"=>utf8_encode($value["titulo"]),
								 "Descripción"=>utf8_encode($value["descripcion"]),
								 "Fechas"=>$value["fechaInicio"].''.$value["fechaFinal"],
								 "Tiempo"=>$value["tiempoPrueba"],
								 "Tema"=>$value["tema"],
								 "Responsable"=>$value["usuario"],
								 "status"=>'202');
						}
						
						$Cuestionarios= array("Cuestionarios"=>$cuestions);
						$data = array("data"=>$Cuestionarios);
						$var = var2js($data);	
						echo $var;						
                            
					}						
	
			
				break;
				case "enviarCuestionario":
				include_once "base_de_datos.php";
				$datosArray = convertirJSONtoArray($_GET['models']);
				
				foreach($datosArray[0] as $a => $value){
					$resp = explode('-',$value);
					$nombreUsuario = limpiarEspaciosEnBlanco(base64_decode($_GET["nombreUsuario"]));
						$idCuestionario    = limpiarEspaciosEnBlanco($resp[1]);
						$idPregunta    = limpiarEspaciosEnBlanco($resp[0]);
						$respuesta    = limpiarEspaciosEnBlanco($resp[2]);
						
						$consulta_respuest = "SELECT COUNT(*) AS num FROM tab_respuestasUsuarios WHERE idCuestionario='".$idCuestionario."' AND idPregunta='".$idPregunta."' AND usuario='".$nombreUsuario."'";
						$stmt_respuest = $conexion->prepare($consulta_respuest);
						$stmt_respuest->execute();
						$datosrespuestas = $stmt_respuest->fetchAll(PDO::FETCH_ASSOC);
						if($datosrespuestas[0]['num']==0){
						$resp = registrarRespuesta($idCuestionario,$idPregunta,$respuesta,$nombreUsuario,$conexion);
							print_r($resp);
						}
					
				}
				
				break;
				case "consultaResultados":
						$idCuestionario = limpiarEspaciosEnBlanco($_GET["id"]);
						$nombreUsuario = limpiarEspaciosEnBlanco(base64_decode($_GET["nombreUsuario"]));
						include_once "base_de_datos.php";
						/**/
					//BUSCAR RESPUESTA ENCUESTADO
						$resp_res = "SELECT COUNT(*) AS num FROM tab_respuestasUsuarios WHERE idCuestionario='".$idCuestionario."' AND usuario ='".$nombreUsuario."'";
						$stmt_res = $conexion->prepare($resp_res);
						$stmt_res->execute();
						$resp = $stmt_res->fetchAll(PDO::FETCH_ASSOC);
	   				      foreach($resp as $b => $val){
							$encuatado = $val["num"];
						}						
						
						if($encuatado>=1){
									$consulta_cuestionarios = "SELECT * FROM tab_cuestionarios WHERE id='".$idCuestionario."'";
									$stmt_cuestionarios = $conexion->prepare($consulta_cuestionarios);
									$stmt_cuestionarios->execute();
									// Paso 3: Obtener los resultados
									$cuestionario = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);	
									
									$datosCuestionario =array("idCuestionario"=>$cuestionario[0]['id'],"Titulo"=>$cuestionario[0]['titulo'],"Descripcion"=>$cuestionario[0]['descripcion'],"tiempoPrueba"=>$cuestionario[0]['tiempoPrueba'],"status"=>'202');
									
									$consulta_respuest = "SELECT * FROM tab_respuestas WHERE idCuestionario='".$idCuestionario."'";
									$stmt_respuest = $conexion->prepare($consulta_respuest);
									$stmt_respuest->execute();
									// Paso 3: Obtener los resultados
									$datosrespuestas = $stmt_respuest->fetchAll(PDO::FETCH_ASSOC);

								foreach($datosrespuestas as $a => $value){
									$imagen ='';
									//BUSCAR RESPUESTA ENCUESTADO
									$resp_user = "SELECT COUNT(*) AS existe FROM tab_respuestasUsuarios WHERE idCuestionario='".$value["idCuestionario"]."' AND idPregunta ='".$value["id"]."' AND usuario ='".$nombreUsuario."'";
									$stmt_correct = $conexion->prepare($resp_user);
									$stmt_correct->execute();
									$correct = $stmt_correct->fetchAll(PDO::FETCH_ASSOC);
									  foreach($correct as $l => $vals){
										$respuesta = $vals["existe"]>=1 ? consultaRespuestaPregunta($value["idCuestionario"],$value["id"],$nombreUsuario,$conexion) : '0';
									}
									//$totalCorrectas[] = ($respuesta==$value["correcta"]) ? 1:0;
									
									$imagen = (!isset($value["imagen"]) OR empty(!$value["imagen"])) ? ''.$value["imagen"].'' : 'SIMG';
									$question = $value["pregunta"];
									$preg[]=array(
									 "id"=>$value["id"],
									 "idCuestionario"=>$value["idCuestionario"],
									 "question"=>utf8_encode($question),
									 "options"=>explode('|',$value["respuestas"]),
									 "answer"=>$value["correcta"],
									 "imagen"=>$imagen,
									 "respuesta"=>$respuesta
									 ); 
									}						
									 
									
									$Cuestionarios= array("Cuestionario"=>$datosCuestionario);

									$Preguntas= array("Preguntas"=>$preg);
									$data = array("data"=>array_merge($Cuestionarios,$Preguntas));	
									$var = var2js($data);	
									echo $var;
						}else{

							$idCuestionario = limpiarEspaciosEnBlanco($_GET["id"]);
							include_once "base_de_datos.php";
							$data = consultaCuestionarioById($idCuestionario,$conexion);
							$var = var2js($data);	
							echo $var;						
						}
				
				break;
				case "consultaAllCuestionarioPendientes":
						include_once "base_de_datos.php";
						
						$existe = consultaCuestionariosIfExist($conexion);
						if($existe==0){
							$Pendientes= array("Pendientes"=>array(
									 "id"=>1,
									 "Titulo"=>'NO EXISTEN EVALUACIONES REGISTRADAS',
								     "PorVencer"=>'',
									 "Tiempo"=>'0',
									 "Fechas"=>date('y-m-d'),
									 "Responsable"=>'INSTRUCTOR',
									 "Resuelta"=>'0',
									 "Porcentual"=>'0',
									 "Promedio"=>'0',
									 "Correctas"=>'0'));
							$data = array("data"=>$Pendientes);	
							$var = var2js($data);	
							echo $var;								
						}else{
							
						$nombreUsuario = limpiarEspaciosEnBlanco(base64_decode($_GET["nombreUsuario"]));
						$ids=array();
						$preg=array();
						//1. CONSULTA SI EXISTEN EVALUACIONES HABILITADAS
						$consulta_cuestionarios = "SELECT * FROM tab_cuestionarios";
						$stmt_cuestionarios = $conexion->prepare($consulta_cuestionarios);
						$stmt_cuestionarios->execute();
						$response = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);
						 foreach($response as $b => $value){						
							list($horas,$minutos)= calcularTiempoEncuesta($value["fechaFinal"]);
							if($horas<=0){
								$ids[]=$value["id"];
							}
						 }
						 
						 if (is_null($ids)) {
									$Pendientes= array("Pendientes"=>array(
									 "id"=>1,
									 "Titulo"=>'NO EXISTEN EVALUACIONES REGISTRADAS',
								     "PorVencer"=>'',
									 "Tiempo"=>'0',
									 "Fechas"=>date('y-m-d'),
									 "Responsable"=>'INSTRUCTOR',
									 "Resuelta"=>'0',
									 "Porcentual"=>'0',
									 "Promedio"=>'0',
									 "Correctas"=>'0'));
									$data = array("data"=>$Pendientes);	
									$var = var2js($data);	
									echo $var;	
						 }else{
						 
						 
						$consulta_cuestionarios = "SELECT * FROM tab_cuestionarios WHERE id IN (".implode($ids).")";
						$stmt_cuestionarios = $conexion->prepare($consulta_cuestionarios);
						$stmt_cuestionarios->execute();
						$datosrespuestas = $stmt_cuestionarios->fetchAll(PDO::FETCH_ASSOC);
						 foreach($datosrespuestas as $b => $value){
								//BUSCAR RESPUESTA ENCUESTADO
								$resp_user = "SELECT COUNT(*) AS num FROM tab_respuestasUsuarios WHERE idCuestionario='".$value["id"]."' AND usuario ='".$nombreUsuario."'";
								
								$stmt_correct = $conexion->prepare($resp_user);
								$stmt_correct->execute();
								$correct = $stmt_correct->fetchAll(PDO::FETCH_ASSOC);
								  foreach($correct as $b => $val){
									$Resuelta = $val["num"];
								}
								$rol = consultaRol($nombreUsuario,$conexion);
								if($rol=='Aprendiz'){
									if(consultaRespuestasUsuariosIfExist($nombreUsuario,$conexion)==0){
										$califica = array("CalificacionPorcentual"=>0,"CalificacionPromedio"=>0,"NumeroCorrectas"=>0);
									}else{
										$califica = consultaRespCuestionario($value["id"],$nombreUsuario,$conexion);
									}
									
								}else{
									$califica = array("CalificacionPorcentual"=>0,"CalificacionPromedio"=>0,"NumeroCorrectas"=>0);
								}
								
								
								$lista = 0;	 
								$anioVar2 = obtenerAnioDeFecha($value["fechaFinal"]);
								if($anioVar2>0){
									$lista = 1;
								  $porVencer = "".$horas.' Horas : '.$minutos." Minutos";
								 }else{
									$porVencer = "00 Horas : 00 Minutos"; 
									$lista = 0;
								 }
								 if($lista==1){
									 
									$preg[]=array(
									 "id"=>$value["id"],
									 "Titulo"=>utf8_encode($value["titulo"]),
								     "PorVencer"=>$porVencer,
									 "Tiempo"=>$value["tiempoPrueba"],
									 "Fechas"=>$value["fechaInicio"].'-'.$value["fechaFinal"],
									 "Responsable"=>$value["usuario"],
									 "Resuelta"=>$Resuelta > 0 ? 'S':'N',
									 "Porcentual"=>$Resuelta > 0 ? $califica['CalificacionPorcentual']:0,
									 "Promedio"=>$Resuelta > 0 ? $califica['CalificacionPromedio']:0,
									 "Correctas"=>$Resuelta > 0 ? $califica['NumeroCorrectas']:0);
									 }
								  
										unset($tiempo);
						}
						 if (!is_null($datosrespuestas)) {
							$Pendientes= array("Pendientes"=>$preg);
							$data = array("data"=>$Pendientes);	
							$var = var2js($data);	
							echo $var;	
						 }else{
							$preg[]=array(
							 "id"=>1,
							 "Titulo"=>'No existen registros',
							 "Descripcion"=>'No existen registros',
							 "PorVencer"=>0,
							 "TiempoPrueba"=>0,
							 "FechaFinal"=>0,
							 "Responsable"=>'SINU',
							 "Resuelta"=>'N');
							$Pendientes= array("Pendientes"=>$preg);
							$data = array("data"=>$Pendientes);	
							$var = var2js($data);						 
							 
						 }
						 
					}
				}
				break;
		}

?>