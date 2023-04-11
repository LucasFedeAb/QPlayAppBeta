/* Importamos array de preguntas y respuestas */
import { geography, history, sports, devs, } from './questions.js';

/* Recuperamos variables almacenadas en storage*/
let categorySelect = localStorage.getItem('categorySelect');
let categorySelectNav = localStorage.getItem('categorySelectNav');
let SelectNavGame
let categoryDefault

//variables
let answerCategory; //almacenar array a barajar
let currentQuestion = 0; // índice de la pregunta actual
let userAnswers = []; // array para almacenar las respuestas del usuario
let isAnswered = false;
let getScore = 0;
let life = 3;
let timer;
/* let counterLine;

/* Botones nav gamePlay */
const navSports = document.querySelector('#nav-deportes');
const navGeography = document.querySelector('#nav-geografia');
const navHistory = document.querySelector('#nav-historia');
const navDevs = document.querySelector('#nav-programacion');
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
/* const lifeIcon = document.querySelector('.life__icon'); */

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
        /* btn.innerHTML= '<div class="icon tick"><i class="fas fa-check"></i></div>'; */
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
        /* btn.innerHTML='<div class="icon cross"><i class="fas fa-times"></i></div>'; */
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
    /* startTimerLine(15); */
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
// iniciar la prueba al cargar la página
showQuestion();

