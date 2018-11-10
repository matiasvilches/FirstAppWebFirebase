Primera App Web con Firebase - JavaScript
-

![Firebase](https://i.imgur.com/cA0z6ak.png)

Esta es mi primera app web con [Firebase](https://firebase.google.com/?authuser=0), que espero seguir desarrollando a futuro. Todo el código está indentado y validado.

En esta **primera versión**, la aplicación registra usuarios con la modalidad de "Usuario y contraseña" e "Iniciar sesión con Google", donde el usuario debe verificar su correo electrónico para poder ser miembro de la app web.

![index](https://i.imgur.com/Xpnp0kZ.png)
![index](https://i.imgur.com/WuLwKO3.png)

---

Uso:
-
1. Clona o descarga el proyecto, abre el archivo "index.html" y pega tu configuración de firebase. *[Más información](https://firebase.google.com/docs/web/setup?authuser=0)*
	```javascript
      var config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        projectId: "<PROJECT_ID>",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
      };
      firebase.initializeApp(config);
	```

2.  Luego, pega la carpeta "PrimeraApp" en la carpeta "htdocs" de tu servidor local, en mi caso es XAMPP.

	`C:\xampp\htdocs\firebase\PrimeraApp`

3. Para finalizar, inicia Apache y busca la ruta del proyecto.

    `http://localhost:82/firebase/PrimeraApp/`

4. ¡Enjoy! :metal: 
