function buildQueryString(opcion) {
  let datos = opcion;
  let queryString = datos[0]
    ? Object.keys(datos[0])
        .map((key) => `${key}=${datos[0][key]}`)
        .join("&")
    : "";

  return queryString;
}

const obtenerRespuesta = async (url) => {
  try {
    // Realizar la solicitud usando fetch
    const response = await fetch(url);

    // Verificar si la respuesta fue exitosa (código 200)
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    // Obtener los datos de la respuesta en formato JSON
    const data = await response.json();

    // Aquí puedes hacer algo con los datos
    return data;
  } catch (error) {
    console.error("Error al obtener la respuesta:", error);
    throw error; // Lanza el error para que el llamador lo maneje si es necesario
  }
};
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

const bufferABase64 = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ABuffer = (buffer) =>
  Uint8Array.from(atob(buffer), (c) => c.charCodeAt(0));
const LONGITUD_SAL = 16;
const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;

const desencriptar = async (contraseña, encriptadoEnBase64) => {
  const decoder = new TextDecoder();
  const datosEncriptados = base64ABuffer(encriptadoEnBase64);
  const sal = datosEncriptados.slice(0, LONGITUD_SAL);
  const vectorInicializacion = datosEncriptados.slice(
    0 + LONGITUD_SAL,
    LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION
  );
  const clave = await derivacionDeClaveBasadaEnContraseña(
    contraseña,
    sal,
    100000,
    256,
    "SHA-256"
  );
  const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: vectorInicializacion },
    clave,
    datosEncriptados.slice(LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION)
  );
  return decoder.decode(datosDesencriptadosComoBuffer);
};

document.addEventListener("DOMContentLoaded", async () => {
  const $usuario = document.querySelector("#lusuario"),
    $password = document.querySelector("#lpassword"),
    $botonLogin = document.querySelector("#botonLogin");

  $botonLogin.onclick = async (e) => {
    e.preventDefault();

    const usuario = $usuario.value;
    const password = $password.value;

    if (!password) {
      return alert("No hay password");
    }

    const objectForm = {
      usuario: usuario,
      password: btoa(password),
    };

    const opcion = [objectForm];
    let datos = [];
    const queryString = buildQueryString(opcion);
    const url = `https://api.compucel.co/v4/?accion=iniciarSession&${queryString}`;

    //Obtener respuesta de la EndPoint
    obtenerRespuesta(url)
      .then(async (respuesta) => {
        if (respuesta[0].ok) {
          localStorage.removeItem("textoCifradoBase64");
          localStorage.removeItem("token");
          localStorage.removeItem("nombreUsuario");
          localStorage.removeItem("rol");
          localStorage.removeItem("Cuestionarios");
          localStorage.removeItem("idCuestionario");
          localStorage.removeItem("CuestionariosById");
          localStorage.removeItem("datosBasicosCuestionario");
          localStorage.setItem("textoCifradoBase64", respuesta[0].encriptado);
          localStorage.setItem("nombreUsuario", respuesta[0].nombre);
          localStorage.setItem("rol", respuesta[0].rol);
          localStorage.setItem("token", respuesta[0].token);
        } else {
          localStorage.setItem("seccion", 0);
          Swal.fire("Error:: su usuario o contraseña son incorrectas");
        }
      })
      .catch((error) => {
        Swal.fire("Error:: su usuario o contraseña son incorrectas");
      });
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let textoCifradoBase64 = localStorage.getItem("textoCifradoBase64");
        let token = localStorage.getItem("token");

        const passwords = password;
        if (
          textoCifradoBase64.length > 0 ||
          textoCifradoBase64 !== "undefined" ||
          textoCifradoBase64 !== "null"
        ) {
          const desencriptado = await desencriptar(
            passwords,
            textoCifradoBase64
          );
          if (desencriptado) {
            if (token === desencriptado) {
              localStorage.setItem("tokenSesion", token);
              Swal.fire("OK:: Inicio de session...");
              window.location.href = "http://localhost/app_quiz/";
            } else {
              Swal.fire("Error:: su usuario o contraseña son incorrectas");
            }
          } else {
            Swal.fire("Error:: la contraseña es incorrecta");
          }
        }
      } catch (e) {
        console.error("Error", e);
      }
    }
  };
});
