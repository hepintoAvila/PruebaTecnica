
						
<?php
include_once "funciones.php";
// Función para ejecutar la consulta
function ejecutarConsulta($nusuario, $email, $conexion) {
    try {
        // Paso 1: Preparar la consulta SQL
        $consulta = "SELECT COUNT(*) AS num FROM tab_usuarios WHERE wnombre = :nusuario OR Wemail = :email";
        $stmt = $conexion->prepare($consulta);

        // Paso 2: Asociar los parámetros y ejecutar la consulta
        $stmt->bindParam(':nusuario', $nusuario, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        // Paso 3: Obtener y retornar el resultado
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resultado['num'];
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

							$resultado = ejecutarConsulta($nusuario, $email, $conexion);
							// Hacer algo con el resultado
							if ($resultado==0) {
								$sentencia = $conexion->prepare("SELECT fun_insert_usuarios(?, ?, ?, ?, ?, ?, ?);");
								$resultado = $sentencia->execute([$id, $nusuario, $password, $email, $rol,$token,$encriptado]); 
								$row[] = array(
								'id'=>1,
								'message'=>'Registro Insertado',
								'status'=>'202');
							} else {
								$row[] = array('id'=>1,'message'=>'El email fue registrado correctamente','status'=>'202');
							}
						$var = var2js($row);
						if ($resultado === true) {
							echo $var;	 
						} else{
						$row[] = array(
								'id'=>1,
								'message'=>'Registro NO Insertado.Algo salió mal. Por favor verifica que la tabla exista',
								'status'=>'404');
								$var = var2js($row);	
								echo $var;	 
						}
?>