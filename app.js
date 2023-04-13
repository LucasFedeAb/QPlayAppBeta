// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyD1i4iDQYxF9fkFyOZWTbR7k5985oMj-Ig",
  authDomain: "qplay-d4df1.firebaseapp.com",
  projectId: "qplay-d4df1",
  storageBucket: "qplay-d4df1.appspot.com",
  messagingSenderId: "72363993079",
  appId: "1:72363993079:web:91becc5d6d2604d1eff0f2",
  measurementId: "G-QMDH7211B7"
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Inicializar Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD1i4iDQYxF9fkFyOZWTbR7k5985oMj-Ig",
    authDomain: "qplay-d4df1.firebaseapp.com",
    projectId: "qplay-d4df1",
    storageBucket: "qplay-d4df1.appspot.com",
    messagingSenderId: "72363993079",
    appId: "1:72363993079:web:91becc5d6d2604d1eff0f2",
    measurementId: "G-QMDH7211B7"
});

// Inicializar Cloud Firestore a través de Firebase
const db = firebase.firestore();


// Obtener referencia a la colección 'items' en la base de datos
const itemsRef = db.collection('items');

// Obtener referencia al elemento <ul> en el DOM
const itemsList = document.getElementById('items');

// Mostrar los elementos de la colección 'items' en la página
itemsRef.onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    const item = doc.data();
    const li = document.createElement('li');
    li.textContent = item.name;
    itemsList.appendChild(li);
  });
});


// Obtener referencia al formulario
const addItemForm = document.getElementById('add-item-form');

// Escuchar el evento 'submit' del formulario
addItemForm.addEventListener('submit', event => {
  event.preventDefault();

  // Obtener el valor del input
  const itemName = document.getElementById('item-name').value;

  // Agregar el nuevo elemento a la colección 'items' en la base de datos
  itemsRef.add({ name: itemName });
});


