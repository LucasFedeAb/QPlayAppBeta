/* Importamos array de preguntas y respuestas */
import { geography, history, sports, devs, } from './questions.js';


/* Recuperamos variables almacenadas en storage*/
let categorySelect = localStorage.getItem('categorySelect');
let categorySelectNav = localStorage.getItem('categorySelectNav');
let nameNav = localStorage.getItem('Alias');
let SelectNavGame
let categoryDefault
let userId
//localStorage.removeItem('userId');

//variables
let answerCategory; //almacenar array a barajar
let currentQuestion = 0; // índice de la pregunta actual
let userAnswers = []; // array para almacenar las respuestas del usuario
let isAnswered = false;
let getScore = 0;
let life = 3;
let timer;
let avatarImg;

/* let counterLine;

/* Botones nav gamePlay */
const navSports = document.querySelector('#nav-deportes');
const navGeography = document.querySelector('#nav-geografia');
const navHistory = document.querySelector('#nav-historia');
const navDevs = document.querySelector('#nav-programacion');
const navVehiculos = document.querySelector('#nav-vehiculos');
const navAll = document.querySelector('#nav-aleatorio');

/* Mostrar contenido */
const showCategory = document.querySelector(".category");
const showQuest = document.querySelector("#question");
const showBtn0 = document.querySelector(".btn0");
const showBtn1 = document.querySelector(".btn1");
const showBtn2 = document.querySelector(".btn2");
const showBtn3 = document.querySelector(".btn3");
const btnAnswers = document.querySelector("#btn-answers");
const timerContainer = document.querySelector(".div__time");
const timerText = document.querySelector("#timer-text");
const lifeContainer = document.querySelector("#life-container");
const timeLine = document.querySelector('.time__line');
const line = document.getElementById("line");
const avatarContainer = document.getElementById("avatar-container");
const changeAvatar = document.querySelector('.btn__avatar');
const nameUser = document.querySelector('#nombre-user');
/* const lifeIcon = document.querySelector('.life__icon'); */
nameUser.innerHTML=`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
  class="bi bi-person text-secondary" viewBox="0 0 20 20">
  <path
    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
</svg>
<p>Alias: ${nameNav}</p>
`;


/* Funcion asignar valor string */
function varValue(valueString) {
    SelectNavGame = valueString;
    localStorage.setItem('SelectNavGame', SelectNavGame);
}

/* Escuchamos click del nav */
navSports.addEventListener("click", function () { varValue("Deportes"); });
navGeography.addEventListener("click", function () { varValue("Geografia"); });
navHistory.addEventListener("click", function () { varValue("Historia"); });
navDevs.addEventListener("click", function () { varValue("Programacion"); });
navAll.addEventListener("click", function () { varValue("Aleatorio"); });
navVehiculos.addEventListener("click", function () { varValue("Vehiculos"); });

/* Recuperamos informacion de click storage */
SelectNavGame = localStorage.getItem('SelectNavGame');

//Funcion agregar categoria con for of
const addCategory = (array, nameCategory) => {
    for (const elemento of array) {
        elemento.category = nameCategory;
    }
}
addCategory(geography, "GEOGRAFIA");
addCategory(sports, "DEPORTES");
addCategory(history, "HISTORIA");
addCategory(devs, "PROGRAMACION");
/* addCategory(vehicles, "VEHICULOS"); */

//Creamos array todas las categorias
const allCategory = geography.concat(sports, history, devs);

/* Funcion para acceder a array segun click categorias  */
function clickCategory(btnCategory) {
    switch (btnCategory) {
        case "Geografia":
            answerCategory = geography;
            break;
        case "Deportes":
            answerCategory = sports;
            break;
        case "Historia":
            answerCategory = history;
            break;
        case "Programacion":
            answerCategory = devs;
            break;
        case "Aleatorio":
            answerCategory = allCategory;
            break;
        /* case "Vehiculos":
            answerCategory = vehicles;
        break; */
        
    }
}

/* Verificar categoria seleccionada segun nav o slider */
function handleCategorySelection(category) {
    if (category) {
        localStorage.setItem('categoryDefault', category);
        clickCategory(category);
    }
    localStorage.removeItem('categorySelect');
    localStorage.removeItem('categorySelectNav');
    localStorage.removeItem('SelectNavGame');
    
}

// Llamada a la función para cada caso
handleCategorySelection(categorySelect);
handleCategorySelection(categorySelectNav);
handleCategorySelection(SelectNavGame);

if (answerCategory === undefined) {
    categoryDefault = localStorage.getItem('categoryDefault');
    clickCategory(categoryDefault); //Categoria por defecto si actualiza el navegador
    // barajar el array almacenado en answerCategory
    shuffleArray(answerCategory);
} else {
    shuffleArray(answerCategory);
}

// función para barajar el array usando el método Fisher-Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// función para verificar la respuesta del usuario
function checkAnswer(selectedAnswer) {
    // si ya se ha respondido a la pregunta actual, no se hace nada
    if (isAnswered) {
        return;
    }

    // marcar que ya se ha respondido a la pregunta actual
    isAnswered = true;


    // detener el temporizador
    clearInterval(timer);
    line.classList.remove("countdown-line");
    timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time', 'div__time__end');
    timerContainer.classList.add('time__empty');

    // verificar si la respuesta es correcta y actualizar el botón
    let btn = document.querySelector(".btn" + selectedAnswer);
    let textAlert = document.querySelector(".alert__msg");

    if (selectedAnswer === answerCategory[currentQuestion].correctAnswer) {
        btn.classList.add("correct");
        textAlert.classList.add("textCorrect");
        getScore = getScore + 10;
        document.querySelector(".alert__msg").innerText = `Correcto`;
        document.querySelector(".score").innerText = `Score: ${getScore}`;

    } else {
        life--;

        switch (life) {
            case 2:
                document.querySelector('.life__3').remove();
            break;
            case 1:
                document.querySelector('.life__2').remove();
            break;
            case 0:
                document.querySelector('.life__1').remove();
            break;
        }

        console.log(life);
        btn.classList.add("incorrect");
        textAlert.classList.add("textIncorrect");
        textAlert.innerText = `Incorrecto`;
        // resaltar la respuesta correcta
        document.querySelector(`.btn${answerCategory[currentQuestion].correctAnswer}`).classList.add("correct");

    }

    // guardar la respuesta del usuario
    userAnswers[currentQuestion] = selectedAnswer;


    // pasar a la siguiente pregunta después de 1 segundo
    setTimeout(function () {
        // restablecer los botones
        timerContainer.classList.remove('time__empty');
        line.classList.add("countdown-line");
        timerContainer.classList.add('div__time');
        btn.classList.remove("correct");
        btn.classList.remove("incorrect");
        textAlert.classList.remove("textCorrect");
        textAlert.classList.remove("textIncorrect");
        document.querySelector(".alert__msg").innerText = ` `;
        
        document.querySelector(`.btn${answerCategory[currentQuestion].correctAnswer}`).classList.remove("correct");
        // pasar a la siguiente pregunta o mostrar el puntaje final
        //console.log(currentQuestion);
        if (currentQuestion < answerCategory.length - 1 && life > 0) {
            currentQuestion++

            showQuestion();
        } else {
            showScore();
        }
        // restablecer el indicador de respuesta
        isAnswered = false;
    }, 1000);
}

// función para mostrar la pregunta y las respuestas posibles

function showQuestion() {
    // restablecer el temporizador
    timerContainer.classList.remove('time__empty');
    clearInterval(timer);
    line.classList.add("countdown-line");
    timerContainer.classList.add('div__time');
    timerText.innerText = `Tiempo: 15`;
    /* document.querySelector("#life").innerText = life; */
    // mostrar la pregunta y las respuestas posibles
    showCategory.innerText = answerCategory[currentQuestion].category;
    showQuest.innerText = answerCategory[currentQuestion].question;
    showBtn0.innerText = answerCategory[currentQuestion].answer0;
    showBtn1.innerText = answerCategory[currentQuestion].answer1;
    showBtn2.innerText = answerCategory[currentQuestion].answer2;
    showBtn3.innerText = answerCategory[currentQuestion].answer3;

    // activar los botones de respuesta

    showBtn0.disabled = false;
    showBtn0.addEventListener("click", function () { checkAnswer(0); });
    showBtn1.disabled = false;
    showBtn1.addEventListener("click", function () { checkAnswer(1); });
    showBtn2.disabled = false;
    showBtn2.addEventListener("click", function () { checkAnswer(2); });
    showBtn3.disabled = false;
    showBtn3.addEventListener("click", function () { checkAnswer(3); });


    // iniciar el temporizador
    startTimer();
}


// establecer el tiempo inicial
function startTimer() {
    let time = 14;
    // actualizar el temporizador cada segundo
    timer = setInterval(function () {
        // restablecer el temporizador si se acaba el tiempo
        if (time <=0) {
            line.classList.remove("countdown-line");
            timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end', 'div__time');
            timerContainer.classList.add('time__empty');
            clearInterval(timer);
            life--;
            switch (life) {
                case 2:
                    document.querySelector('.life__3').remove();
                break;
                case 1:
                    document.querySelector('.life__2').remove();
                break;
                case 0:
                    document.querySelector('.life__1').remove();
                break;
            }
            // pasar a la siguiente pregunta
            setTimeout(function () {
                // pasar a la siguiente pregunta o mostrar el puntaje final
                if (currentQuestion < answerCategory.length - 1 && life > 0) {
                    currentQuestion++;
                    showQuestion();
                } else {
                    showScore();
                }

            }, 1000);

        }

        // actualizar la visualización del temporizador

        if (time < 10) {
            timerText.innerText = `Tiempo: 0${time}`;
        } else{
            timerText.innerText = `Tiempo: ${time}`;
        }

        if (time && time < 4) {
            timerContainer.classList.add('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end');
        }
        time--;
    }, 1000);
}
// función para mostrar el puntaje final

function showScore() {
    // desactivar los botones de respuesta
    showBtn0.disabled = true;
    showBtn1.disabled = true;
    showBtn2.disabled = true;
    showBtn3.disabled = true;
    line.classList.remove("countdown-line");
    timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end');
    btnAnswers.remove("#btn-answers");
    timerContainer.remove(".div__time");
    lifeContainer.remove();
    showCategory.innerText = `Vidas:${life}`;
    showQuest.remove();
    document.querySelector("#question-container").remove();

    // mostrar el puntaje final
    let score = 0;
    for (let i = 0; i < answerCategory.length; i++) {
        if (userAnswers[i] === answerCategory[i].correctAnswer) {
            score = score + 10;
        }
    }
    let scoreText = `SCORE FINAL: ${score}`;
    let scoreFin = document.querySelector(".score");
    scoreFin.classList.remove(".score");
    scoreFin.classList.add("scoreFin");
    scoreFin.innerText = scoreText;

}

function generateUserId() {
    userId = localStorage.getItem('userId');
    if (!userId) {
      // Si el identificador único no está almacenado en el localStorage, se genera uno nuevo
      userId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
      localStorage.setItem('userId', userId);
    }
    return userId;
}
generateUserId();

async function createAvatar(username) {
    const url = `https://avatars.dicebear.com/api/bottts/${username}.svg`;

    try {
        const response = await fetch(url);
        const svg = await response.text();
        
        avatarImg = document.createElement("img");
        avatarImg.setAttribute('class', 'user__img bg-light me-3');
        avatarImg.setAttribute("src", `data:image/svg+xml,${encodeURIComponent(svg)}`);
        avatarImg.setAttribute("alt", `Avatar for ${username}`);
        avatarContainer.appendChild(avatarImg);
    } catch (error) {
        console.error("Error al obtener el avatar:", error);
    }
}
createAvatar(userId);


/* function createAvatar(username) {
    const url = `https://avatars.dicebear.com/api/bottts/${username}.svg`;

    fetch(url)
        
        .then(response => {
            return response.text();
            
        })
        .then(svg => {
            avatarImg = document.createElement("img");
            avatarImg.setAttribute('class', 'user__img w-25 me-3');
            avatarImg.setAttribute("src", `data:image/svg+xml,${encodeURIComponent(svg)}`);
            avatarImg.setAttribute("alt", `Avatar for ${username}`);
            avatarContainer.appendChild(avatarImg);
        })
        .catch(error => {
            console.error("Error fetching avatar:", error);
        });
}
createAvatar(userId); */

/* Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    inputAttributes: {
        autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    showLoaderOnConfirm: true,
    preConfirm: (name) => {
        return fetch(`https://avatars.dicebear.com/api/bottts/${name}.svg`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
                Swal.showValidationMessage(`No se pudo cargar el avatar`);
            });
    },
    allowOutsideClick: () => !Swal.isLoading(),
    html: '<img id="avatar-img" class="user__img w-25 me-3" />',
    didRender: () => {
        const avatarImg = document.getElementById('avatar-img');
        const username = Swal.getInput().value;
        const url = `https://avatars.dicebear.com/api/bottts/${username}.svg`;
        avatarImg.src = `data:image/svg+xml,${encodeURIComponent(url)}`;
    }
}); */




/* const container = document.getElementById("avatar-container");
let avatarList;
//localStorage.removeItem('userId');
function listarAvatar(username) {
    const categories = ["bottts"];
    const url = `https://avatars.dicebear.com/api/bottts/${username}.svg`;

    fetch(url)

        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log(response);
            console.log(response);
            return response.text();

        })
        .then(categories => {
            categories.forEach(category => {
                for (let i = 0; i < 100; i++) {
                    const username = `${category}-${i}`;
                    const url = `https://avatars.dicebear.com/api/${categories}/${username}.svg`;
                    avatarList = document.createElement("img");
                    avatarList.setAttribute('class', 'user__img me-3');
                    avatarList.setAttribute("src", url);
                    avatarList.setAttribute("alt", `Avatar for ${username}`);
                    container.appendChild(avatarList);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching avatar:", error);
        });
} */


/* const containerAvatar = document.createElement('<div id="container-avatar"></div>');
const innerAvatar = document.querySelector('#container-avatar');
 */

/* swal({
    title: "Desea abandonar la partida?",
    text: "Si abandona la partida perdera el progreso!",
    icon: "question ",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
});
 */

//const username = 'asd';
//createAvatar(userId);

changeAvatar.addEventListener("click", function () { 
    localStorage.removeItem('userId');
    generateUserId();
    avatarImg.remove();
    createAvatar(userId);
});

/* createAvatar(username); */


// iniciar la prueba al cargar la página
showQuestion();

