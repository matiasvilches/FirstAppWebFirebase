/*
*   FUNCIONES JAVASCRIPT CON FIREBASE
*
*   @autor: matiasvilches
*   @fecha: 09/11/2018
*/


// Declaramos globalmente los elementos HTML.

// Botones.
var btnCerrarSesion = document.getElementById('btnCerrarSesion');
var btnRegistrarme = document.getElementById('btnRegistrarme');
var btnIniciarGoogle = document.getElementById('btnIniciarGoogle');
var btnIngresar = document.getElementById('btnIngresar');
// Datos del usuario.
var emailUsuario = document.getElementById('emailUsuario');
var nombreUsuario = document.getElementById('nombreUsuario');
var fotoUsuario = document.getElementById('fotoUsuario');
var listaUsuario = document.getElementById('listaUsuario');
// Alertas y contenidos.
var alertaUsuarioRegistrado = document.getElementById('alertaUsuarioRegistrado');
var contenidoUsuarioRegistrado = document.getElementById('contenidoUsuarioRegistrado');
var alertaRegistroUsuario = document.getElementById('alertaRegistroUsuario');
var contenidoRegistroUsuario = document.getElementById('contenidoRegistroUsuario');
var alertaIngreso = document.getElementById('alertaIngreso');
var contenidoIngreso = document.getElementById('contenidoIngreso');
// Otros.
var lineaDivisoria = document.getElementById('lineaDivisoria');
var tituloBienvenido = document.getElementById('tituloBienvenido');


// Registrar usuario.
function registrarUsuario() {
    // Valores de las cajas de texto de Registro de usuario.
    var emailRegistro = document.getElementById('txtEmailR').value;
    var contraseñaRegistro = document.getElementById('pswContraseñaR').value;

    // Agregamos el usuario.
    firebase.auth().createUserWithEmailAndPassword(emailRegistro, contraseñaRegistro)
    .then(function() {
        // Llamamos a la función verificar correo electronico.
        verificar();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // Mostramos las lertas de error.
        if (errorCode == 'auth/weak-password') {
            alertaRegistroUsuario.className = 'alert alert-danger col-md-7 text-center';
            alertaRegistroUsuario.style.display = 'block';
            contenidoRegistroUsuario.innerText = 'La contraseña debe tener 6 o más caracteres.';
        } else if (errorCode == 'auth/invalid-email') {
            alertaRegistroUsuario.className = 'alert alert-danger col-md-7 text-center';
            alertaRegistroUsuario.style.display = 'block';
            contenidoRegistroUsuario.innerText = 'Ingresa tu correo electrónico.';
        } else if (errorCode == 'auth/email-already-in-use') {
            alertaRegistroUsuario.className = 'alert alert-danger col-md-7 text-center';
            alertaRegistroUsuario.style.display = 'block';
            contenidoRegistroUsuario.innerText = 'El correo electrónico ingresado ya está en uso por otra cuenta.';
        }
    });
}


// Ingresar.
function ingresar() {
    // Valores de las cajas de texto de Ingreso.
    var emailIngreso = document.getElementById('txtEmailI').value;
    var contraseñaIngreso = document.getElementById('pswContraseñaI').value;

    // Ingresar con correo electrónico y contraseña.
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contraseñaIngreso)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // Mostramos las alertas de error.
        if (errorCode == 'auth/wrong-password') {
            alertaIngreso.className = 'alert alert-danger col-md-7 text-center';
            alertaIngreso.style.display = 'block';
            contenidoIngreso.innerText = 'Contraseña incorrecta.';
        } else if (errorCode == 'auth/invalid-email') {
            alertaIngreso.className = 'alert alert-danger col-md-7 text-center';
            alertaIngreso.style.display = 'block';
            contenidoIngreso.innerText = 'Ingresa tu correo electrónico.';
        } else if (errorCode == 'auth/user-not-found') {
            alertaIngreso.className = 'alert alert-danger col-md-7 text-center';
            alertaIngreso.style.display = 'block';
            contenidoIngreso.innerText = 'El correo electrónico ingresado no ha sido registrado, o el usuario pudo haber sido eliminado.';
        }
    });
}


// Observador.
function observador() {
    // Comprobamos si hay usuarios activos.
    firebase.auth().onAuthStateChanged(function(user) {

        // Validamos si el usuario está activo.
        if (user) {
            // User is signed in.
            // Datos del usuario.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // Usuario activo.
            console.log('Usuario activo: ' + email);

            // Correo de verificación.
            console.log('¿Verificó su correo electrónico? ' + emailVerified);

            // Llamamos a la función.
            soloUsuariosRegistrados(user);
        } else {
            // No user is signed in.
            // Mensaje por consola.
            console.log('No hay usuarios activos.');
        }
    });
}


// Llamamos a la función observador.
observador();


// Esta función la verán solo usuarios registrados y verificados.
function soloUsuariosRegistrados(user) {
    // Estado del email verificado.
    var emailVerified = user.emailVerified;

    // Validar si el usuario ha verificado su correo electrónico.
    if(emailVerified == true) {
        // Mostramos contenido.
        lineaDivisoria.style.display = 'block';
        alertaUsuarioRegistrado.style.display = 'block';
        listaUsuario.style.display = 'block';
        btnCerrarSesion.style.display = 'block';
        tituloBienvenido.style.display = 'block';
        contenidoUsuarioRegistrado.innerHTML = 'Esto lo ven solo miembros de la aplicación web.';

        // Mostramos los datos del usuario en el front-end.
        // Pd: El nombre y foto se verán solo si se registra con Google.
        emailUsuario.innerHTML = `${user.email}`;
        nombreUsuario.innerHTML = `${user.displayName}`;
        fotoUsuario.innerHTML = `<img src="${user.photoURL}" width="150">`;

        // Escondemos y deshabilitamos contenido.
        alertaRegistroUsuario.style.display = 'none';
        btnRegistrarme.disabled = true;
        btnRegistrarme.className = 'btn btn-disabled';
        btnIniciarGoogle.disabled = true;
        btnIniciarGoogle.className = 'btn btn-disabled';
        btnIngresar.disabled = true;
        btnIngresar.className = 'btn btn-disabled';
    } else {
        // Mensaje.
        btnCerrarSesion.style.display = 'block';
        alertaIngreso.className = 'alert alert-warning col-md-7 text-center';
        alertaIngreso.style.display = 'block';
        contenidoIngreso.innerText = 'Accede a tu correo electrónico y verifica tu cuenta.';
    }
}


// Cerrar Sesión.
function cerrarSesion() {
    // Cerramos la sesión.
    firebase.auth().signOut().then(function() {
        // Sign-out successful.

        // Alertas.
        alertaRegistroUsuario.style.display = 'none';
        alertaUsuarioRegistrado.style.display = 'none';
        alertaIngreso.style.display = 'none';

        // Botones.
        btnRegistrarme.style.display = 'block';
        btnIniciarGoogle.style.display = 'block';
        btnIngresar.style.display = 'block';
        btnCerrarSesion.style.display = 'none';
        btnRegistrarme.disabled = false;
        btnRegistrarme.className = 'btn btn-primary';
        btnIniciarGoogle.disabled = false;
        btnIniciarGoogle.className = 'btn btn-default';
        btnIngresar.disabled = false;
        btnIngresar.className = 'btn btn-primary';

        // Datos del usuario.
        listaUsuario.style.display = 'none';
        fotoUsuario.style.display = 'none';
        
        // Otros.
        lineaDivisoria.style.display = 'none';
        tituloBienvenido.style.display = 'none';

        // Mensaje por consola.
        console.log('Cierre de sesión exitoso.');
        }).catch(function(error) {
        // An error happened.
        // Mensaje por consola.
        console.log('Error, no se ha podido cerrar la sesión correctamente. ' + error);
    });
}


// Verificar correo electronico.
function verificar() {
    var user = firebase.auth().currentUser;

    // Al verificar el correo, redirecciona a la app web.
    var actionCodeSettings = {
        url: 'http://localhost:82/firebase/Primera%20app/?email=' + user.email
    };

    // Envía el correo de verificación.
    user.sendEmailVerification(actionCodeSettings)
    .then(function() {
        // Email sent.
        // Alerta exitosa de Registro de usuario.
        alertaRegistroUsuario.className = 'col-md-7 alert alert-success text-center';
        alertaRegistroUsuario.style.display = 'block';
        contenidoRegistroUsuario.innerHTML = '¡Te has registrado exitosamente!';
    }).catch(function(error) {
        // An error happened.
        // Alerta de error de Registro de usuario.
        alertaRegistroUsuario.className = 'col-md-7 alert alert-danger text-center';
        alertaRegistroUsuario.style.display = 'block';
        contenidoRegistroUsuario.innerHTML = 'Error al enviar el correo de verificación.';
    });
}


// Registro con Google.
function registrarUsuarioGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    // Inicio se sesión de Google con popup.
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
