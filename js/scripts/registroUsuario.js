function generarAleatorio(longitud) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indiceAleatorio);
  }

  return resultado;
}
function buildQueryString(opcion) {
  let datos = opcion;
  let queryString = datos[0]
    ? Object.keys(datos[0])
        .map((key) => `${key}=${datos[0][key]}`)
        .join("&")
    : "";

  return queryString;
}

document.addEventListener("DOMContentLoaded", async () => {
  const $passwordEncriptar = document.querySelector("#password"),
    $btnRegistrar = document.querySelector("#btnRegistrar"),
    $name = document.querySelector("#lname"),
    $email = document.querySelector("#lemail"),
    $rol = document.querySelector("#lrol");

  const bufferABase64 = (buffer) =>
    btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const base64ABuffer = (buffer) =>
    Uint8Array.from(atob(buffer), (c) => c.charCodeAt(0));
  const LONGITUD_SAL = 16;
  const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;
  const derivacionDeClaveBasadaEnContraseña = async (
    contraseña,
    sal,
    iteraciones,
    longitud,
    hash,
    algoritmo = "AES-CBC"
  ) => {
    const encoder = new TextEncoder();
    let keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(contraseña),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(sal),
        iterations: iteraciones,
        hash,
      },
      keyMaterial,
      { name: algoritmo, length: longitud },
      false,
      ["encrypt", "decrypt"]
    );
  };
  const encriptar = async (contraseña, textoPlano) => {
    const encoder = new TextEncoder();
    const sal = window.crypto.getRandomValues(new Uint8Array(LONGITUD_SAL));
    const vectorInicializacion = window.crypto.getRandomValues(
      new Uint8Array(LONGITUD_VECTOR_INICIALIZACION)
    );
    const bufferTextoPlano = encoder.encode(textoPlano);
    const clave = await derivacionDeClaveBasadaEnContraseña(
      contraseña,
      sal,
      100000,
      256,
      "SHA-256"
    );
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: vectorInicializacion },
      clave,
      bufferTextoPlano
    );
    return bufferABase64([
      ...sal,
      ...vectorInicializacion,
      ...new Uint8Array(encrypted),
    ]);
  };

  $btnRegistrar.onclick = async (e) => {
    e.preventDefault();

    const name = $name.value;
    const password = $passwordEncriptar.value;
    const email = $email.value;
    const rol = $rol.value;

    if (!password) {
      return alert("No hay password");
    }
    //Genero texto aleatorio para encritar el password
    const textoPlano = generarAleatorio(16);
    // si no existe el texto plano no ejecuta la rutina de enviar datos
    if (textoPlano?.length > 0) {
      //encrito el password con el textogenerado
      const encriptado = await encriptar(password, textoPlano);

      //Creo el objeto que va ha guardarse en la BD del registro usuario
      //btoa es una funcion para encoding para no enviar la variable password expuesta
      const objectForm = {
        name: name,
        password: btoa(password),
        email: email,
        rol: rol,
        token: textoPlano,
        encriptado: encriptado,
      };

      // Concateno el objeto con una funcion para enviar por GET las variables
      const opcion = [objectForm];
      const queryString = buildQueryString(opcion);

      const url = `https://api.compucel.co/v4/?accion=registrarUsuario&${queryString}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("" + data[0].message + "");
        })

        .catch((error) => {
          console.error("Error al enviar la solicitud:", error);
        });
    } else {
      return alert("No hay textoplano");
    }
  };
});
