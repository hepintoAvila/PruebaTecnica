
						
<?php
include_once "funciones.php";
// Función para ejecutar la consulta
function ConsultaUsuario($nusuario,$conexion) {
    try {
        // Paso 1: Preparar la consulta SQL
        $consulta = "SELECT wpassword FROM tab_usuarios WHERE wnombre = :nusuario";
        $stmt = $conexion->prepare($consulta);

        // Paso 2: Asociar los parámetros y ejecutar la consulta
        $stmt->bindParam(':nusuario', $nusuario, PDO::PARAM_STR);
        $stmt->execute();

        // Paso 3: Obtener y retornar el resultado
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resultado['wpassword'];
    } catch (PDOException $e) {
        // Manejo de errores
        echo "Error: " . $e->getMessage();
        return false;
    }
}
function getDatosUsuario($nusuario,$conexion) {
    try {
        // Paso 1: Preparar la consulta SQL
        $consulta = "SELECT wrol,wtoken,wencriptado,wpassword,wnombre FROM tab_usuarios WHERE wnombre = :nusuario";
        $stmt = $conexion->prepare($consulta);

        // Paso 2: Asociar los parámetros y ejecutar la consulta
        $stmt->bindParam(':nusuario', $nusuario, PDO::PARAM_STR);
        $stmt->execute();

        // Paso 3: Obtener y retornar el resultado
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resultado;
    } catch (PDOException $e) {
        // Manejo de errores
        echo "Error: " . $e->getMessage();
        return false;
    }
}
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Hosmmer Pinto (@gmail.com)
 * @Developer:  Carlos Perez (@gmail.com)
 **/
/*Al incluir el archivo "base_de_datos.php", todas sus variables están
						a nuestra disposición. Por lo que podemos acceder a ellas tal como si hubiéramos
						copiado y pegado el código
						 */

							$resultadoPass = ConsultaUsuario($usuario,$conexion);
							$passwordDB     = base64_decode($resultadoPass);
							 
							// Hacer algo con el resultado
							if ($passwordDB==$password) {
								$resultado = getDatosUsuario($usuario,$conexion);
								$row[] = array(
								'id'=>1,
								'rol'=>$resultado['wrol'],
								'password'=>$resultado['wpassword'],
								'token'=>$resultado['wtoken'],
								'encriptado'=>$resultado['wencriptado'],
								'nombre'=>$resultado['wnombre'],
								'message'=>'OK',
								'ok'=>true,
								'status'=>'202');
							} else {
								$row[] = array('id'=>1,'message'=>'ERROR:: El password no existe'.$passwordDB.'--->'.$password.'','status'=>'404','ok'=>false); 
							}
						$var = var2js($row);
						echo $var;
						 
?>