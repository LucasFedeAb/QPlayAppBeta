// definir los datos de la prueba
const quizData = [
    {
        category: "GEOGRAFIA",
        question: "¿Cuál es la capital de Brasil?",
        answers: ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Buenos Aires"],
        correctAnswer: 0,
    },
    {
        category: "CIENCIA",
        question: "¿En qué año se lanzó el primer iPhone?",
        answers: ["2005", "2006", "2007", "2008"],
        correctAnswer: 2,
    },
    {   
        category: "GEOGRAFIA",
        question: "¿En qué continente se encuentra el río Nilo?",
        answers: ["África", "Asia", "Europa", "América"],
        correctAnswer: 0,
    },
    {
        category: "HISTORIA",
        question: "¿Quién pintó la Mona Lisa?",
        answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: 1,
    },
];


// función para barajar el array usando el método Fisher-Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  
// barajar el array quizData
shuffleArray(quizData);

let currentQuestion = 0; // índice de la pregunta actual
let userAnswers = []; // array para almacenar las respuestas del usuario
let isAnswered = false; // indica si ya se ha respondido a la pregunta actual
let getScore = 0;

// función para verificar la respuesta del usuario
function checkAnswer(selectedAnswer) {
    // si ya se ha respondido a la pregunta actual, no se hace nada
    if (isAnswered) {
        return;
    }
    
    // marcar que ya se ha respondido a la pregunta actual
    isAnswered = true;


    // desactivar los botones de respuesta
    /* document.querySelector(".btn0").disabled = true;
    document.querySelector(".btn1").disabled = true;
    document.querySelector(".btn2").disabled = true;
    document.querySelector(".btn3").disabled = true; */
    // detener el temporizador
    clearInterval(timer);

    // verificar si la respuesta es correcta y actualizar el botón
    let btn = document.querySelector(".btn" + selectedAnswer);
    let textAlert = document.querySelector(".alert__msg");
    
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {

        btn.classList.add("correct");
        textAlert.classList.add("textCorrect");
        getScore= getScore+10;
        document.querySelector(".alert__msg").innerText = `Correcto`;
        document.querySelector(".score").innerText = `Score: ${getScore}`;
        
    } else {    
        btn.classList.add("incorrect");
        textAlert.classList.add("textIncorrect");
        document.querySelector(".alert__msg").innerText = `Incorrecto`;
        // resaltar la respuesta correcta
        document.querySelector(`.btn${quizData[currentQuestion].correctAnswer}`).classList.add("correct");
        
    }
    
    // guardar la respuesta del usuario
    userAnswers[currentQuestion] = selectedAnswer;

   
    // pasar a la siguiente pregunta después de 1 segundo
    setTimeout(function () {
        // restablecer los botones
        btn.classList.remove("correct");
        btn.classList.remove("incorrect");
        textAlert.classList.remove("textCorrect");
        textAlert.classList.remove("textIncorrect");
        document.querySelector(".alert__msg").innerText = ` `;
        document.querySelector(`.btn${quizData[currentQuestion].correctAnswer}`).classList.remove("correct");
        // pasar a la siguiente pregunta o mostrar el puntaje final
        console.log(currentQuestion);
        if (currentQuestion < quizData.length -1) {
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
    clearInterval(timer);
    document.getElementById("timer").innerText = 10;

    // mostrar la pregunta y las respuestas posibles
    document.querySelector(".category").innerText = quizData[currentQuestion].category;
    document.getElementById("question").innerText = quizData[currentQuestion].question;
    document.querySelector(".btn0").innerText = quizData[currentQuestion].answers[0];
    document.querySelector(".btn1").innerText = quizData[currentQuestion].answers[1];
    document.querySelector(".btn2").innerText = quizData[currentQuestion].answers[2];
    document.querySelector(".btn3").innerText = quizData[currentQuestion].answers[3];

    // activar los botones de respuesta
  
    document.querySelector(".btn0").disabled = false;
    document.querySelector(".btn0").addEventListener("click", function() { checkAnswer(0); });
    document.querySelector(".btn1").disabled = false;
    document.querySelector(".btn1").addEventListener("click", function() { checkAnswer(1); });
    document.querySelector(".btn2").disabled = false;
    document.querySelector(".btn2").addEventListener("click", function() { checkAnswer(2); });
    document.querySelector(".btn3").disabled = false;
    document.querySelector(".btn3").addEventListener("click", function() { checkAnswer(3); });


    // iniciar el temporizador
    startTimer();
}

let timer; // variable para almacenar el temporizador


// establecer el tiempo inicial
function startTimer() {
    let time = 9;

    // actualizar el temporizador cada segundo
    timer = setInterval(function () {
        // restablecer el temporizador si se acaba el tiempo
        if (time <= 0) {
            clearInterval(timer);
            // pasar a la siguiente pregunta
            setTimeout(function () {
                // pasar a la siguiente pregunta o mostrar el puntaje final
                if (currentQuestion < quizData.length - 1) {
                    currentQuestion++;
                
                    showQuestion();
                } else {
                    showScore();
                }
            }, 1000);

        }

        // actualizar la visualización del temporizador
        document.querySelector("#timer").innerText = time;
        time--;
    }, 1000);
}

// función para mostrar el puntaje final

function showScore() {
    // desactivar los botones de respuesta
    document.querySelector(".btn0").disabled = true;
    document.querySelector(".btn1").disabled = true;
    document.querySelector(".btn2").disabled = true;
    document.querySelector(".btn3").disabled = true;
  
    // mostrar el puntaje final
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] === quizData[i].correctAnswer) {
        score= score+10;
      }
    }
    let scoreText = `Score FINAL: ${score}`;
    let scoreFin = document.querySelector(".score");
    scoreFin.classList.add("scoreFin");
    scoreFin.classList.remove(".score");
    document.querySelector(".scoreFin").innerText = scoreText;
}
// iniciar la prueba al cargar la página
showQuestion();

