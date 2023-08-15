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
		}

?>