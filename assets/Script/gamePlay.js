/* Recuperamos variables almacenadas en storage*/
let categorySelect = localStorage.getItem('categorySelect'); 
let categorySelectNav = localStorage.getItem('categorySelectNav');
let SelectNavGame

//variables
let answerCategory; 
let currentQuestion = 0; // índice de la pregunta actual
let userAnswers = []; // array para almacenar las respuestas del usuario
let isAnswered = false;
let getScore = 0;
let life = 3;
let timer; // variable para almacenar el temporizador

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
const lifeContainer = document.querySelector("#life");

/* Funcion asignar valor string */
function varValue(valueString){
    SelectNavGame = valueString;
    localStorage.setItem('SelectNavGame', SelectNavGame);
}

/* Escuchamos click del nav */
navSports.addEventListener("click", function() {varValue("Deportes");});
navGeography.addEventListener("click", function() {varValue("Geografia");});
navHistory.addEventListener("click", function() {varValue("Historia");});
navDevs.addEventListener("click", function() {varValue("Programacion");});
navAll.addEventListener("click", function() {varValue("Aleatorio");});

/* Recupoeramos informacion de click storage */
SelectNavGame = localStorage.getItem('SelectNavGame');

/* Arrays de preguntas y respuestas */
class Question {
    constructor(question, answer0, answer1, answer2, answer3, correctAnswer) {
        this.question = question
        this.answer0 = answer0
        this.answer1 = answer1
        this.answer2 = answer2
        this.answer3 = answer3
        this.correctAnswer = correctAnswer
    }
}

const geography = [
    new Question("¿Cual es la capital de Francia?", "Brujas", "Marsella", "Paris", "Bruselas", 2),
    new Question("¿Cuál es la capital de Brasil?", "Brasilia", "Rio de Janeiro", "Sao Paulo", "Buenos Aires", 0),
    new Question("¿Cuál es el océano más grande del mundo?", "Océano Atlántico", "Océano Pacífico", "Océano Índico", "Océano Ártico", 1),
    new Question("¿Cuál es el río más largo del mundo?", "Río Nilo", "Río Yangtze", "Río Misisipi", "Río Amazonas", 3),
    new Question("¿Cuál es el desierto más grande del mundo?", "Desierto del Sahara", "Desierto de Gobi", "Desierto de Kalahari", "Desierto de Atacama", 0),
    new Question("¿En qué país se encuentra la Torre Eiffel?", "Italia", "España", "Francia", "Reino Unido", 2),
    new Question("¿Cuál es el país más grande del mundo por superficie?", "China", "Estados Unidos", "Rusia", "Canadá", 2),
    new Question("¿Cuál es la capital de Canadá?", "Toronto", "Montreal", "Vancouver", "Ottawa", 3),
    new Question("¿En qué continente se encuentra el monte Kilimanjaro?", "África", "Asia", "Europa", "América del Sur", 0),
    new Question("¿Cuál es la ciudad más poblada del mundo?", "Tokio", "Shanghai", "Mumbai", "Ciudad de México", 0),
    new Question("¿En qué país se encuentra la Gran Muralla China?", "India", "China", "Corea del Norte", "Japón", 1),
    new Question("¿Cuál es el país más pequeño del mundo por superficie?", "Mónaco", "San Marino", "El Vaticano", "Liechtenstein", 2)
]

const sports = [
    new Question("¿En que deporte se destacó Mike Tyson?", "Basquet ", "Boxeo", "MMA", "Ciclismo", 1),
    new Question("¿Cuantos campeonatos del mundo tiene la Seleccion Argentina?", "1", "2", "3", "4", 2),
    new Question("¿En qué deporte se destaca Usain Bolt?", "Fútbol", "Atletismo", "Baloncesto", "Natación", 1),
    new Question("¿Quién es considerado el mejor jugador de baloncesto de todos los tiempos?", "Michael Jordan", "Kobe Bryant", "LeBron James", "Stephen Curry", 0),
    new Question("¿En qué deporte compiten los Lakers y los Celtics?", "Fútbol", "Baloncesto", "Hockey sobre hielo", "Béisbol", 1),
    new Question("¿Quién ganó el primer Mundial de Fútbol?", "Brasil", "Argentina", "Alemania", "Uruguay", 3),
    new Question("¿Qué país es considerado la cuna del fútbol?", "Brasil", "Alemania", "Argentina", "Inglaterra", 3),
    new Question("¿En qué deporte se destacó Michael Phelps?", "Atletismo", "Natación", "Esquí", "Snowboard", 1),
    new Question("¿Qué tenista tiene el récord de más títulos de Grand Slam en individuales?", "Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras", 0),
    new Question("¿Cuál es el equipo de fútbol más exitoso de la historia?", "Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", 0),
    new Question("¿En qué deporte compite Manny Pacquiao?", "MMA", "Lucha libre", "Boxeo", "Kickboxing", 2),
    new Question("¿Cuántas veces ha ganado la Copa del Mundo de Rugby la selección de Nueva Zelanda?", "1", "2", "3", "4", 2)
]

const history = [
    new Question("¿En qué año se produjo la Revolución Francesa?", "1789", "1798", "1812", "1830", 0),
    new Question("¿En qué año finalizó la Segunda Guerra Mundial?", "1940", "1950", "1945", "1939", 2),
    new Question("¿Qué emperador romano construyó el Coliseo?", "César Augusto", "Nerón", "Trajano", "Constantino", 0),
    new Question("¿Qué famoso líder africano luchó por la independencia de Ghana?", "Mandela", "Haile Selassie", "Kwame Nkrumah", "Kofi Annan", 2),
    new Question("¿Qué líder militar lideró la Revolución cubana en 1959?", "Fidel Castro", "Che Guevara", "Raul Castro", "Camilo Cienfuegos", 0),
    new Question("¿Qué territorio fue anexado por Hitler en 1938, previo al inicio de la Segunda Guerra Mundial?", "Checoslovaquia", "Polonia", "Dinamarca", "Austria", 3),
    new Question("¿Quién fue el primer presidente de Estados Unidos?", "Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln", 1),
    new Question("¿Qué líder mundial llevó a cabo la política conocida como 'Perestroika'?", "Vladimir Putin", "Nikita Kruschev", "Boris Yeltsin", "Mijail Gorbachov", 3),
    new Question("¿En qué año se produjo la Guerra de los Cien Años?", "1337", "1386", "1420", "1475", 0),
    new Question("¿Qué reina de Inglaterra fue conocida como 'La Reina Virgen'?", "María I", "Victoria", "Isabel I", "Ana", 2),
    new Question("¿Qué rey de España financió el viaje de Cristóbal Colón al Nuevo Mundo?", "Fernando II de Aragón", "Carlos I de España", "Felipe II de España", "Isabel I de Castilla", 3),
    new Question("¿Qué líder mundial conocido como el 'Padre de la Nación' luchó por la independencia de la India?", "Nelson Mandela", "Mahatma Gandhi", "Jawaharlal Nehru", "Indira Gandhi", 0)
]

const devs = [
    new Question("¿Qué significa HTML?", "Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperspace Text Markup Language", 0),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar el color de fondo de un elemento?", "color", "background-color", "border-color", "font-color", 1),
    new Question("¿Qué método de JavaScript se utiliza para agregar un nuevo elemento al final de un array?", "unshift()", "pop()", "shift()", "push()", 3),
    new Question("¿Qué elemento de HTML se utiliza para incluir CSS en una página?", "<style>", "<script>", "<link>", "<head>", 2),
    new Question("¿Qué tipo de valor devuelve el método parseInt() de JavaScript?", "booleano", "número entero", "cadena de texto", "flotante", 1),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar la posición de un elemento?", "position", "top", "left", "margin", 0),
    new Question("¿Qué evento de JavaScript se utiliza para detectar cuando un usuario hace clic en un elemento?", "onchange", "onclick", "onmouseclick", "onmouseover", 1),
    new Question("¿Qué elemento de HTML se utiliza para definir un enlace?", "<link>", "<a>", "<href>", "<url>", 1),
    new Question("¿Qué método de JavaScript se utiliza para agregar un nuevo elemento al inicio de un array?", "push()", "pop()", "shift()", "unshift()", 3),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar el tamaño de fuente de un elemento?", "text-size", "size", "font-size", "text-font", 2)
]

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
export const allCategory = geography.concat(sports, history, devs);

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

/* Verificar categoria seleccionada segun nav o galeria */
if (categorySelect) {
    clickCategory(categorySelect);
    localStorage.removeItem('categorySelect')
    localStorage.removeItem('categorySelectNav')
    localStorage.removeItem('SelectNavGame')
    
} else if (categorySelectNav) {
    clickCategory(categorySelectNav);
    localStorage.removeItem('categorySelect')
    localStorage.removeItem('categorySelectNav')
    localStorage.removeItem('SelectNavGame')
}else if (SelectNavGame) {
    clickCategory(SelectNavGame);
    localStorage.removeItem('categorySelect')
    localStorage.removeItem('categorySelectNav')
    localStorage.removeItem('SelectNavGame')
}
console.log(answerCategory);

// función para barajar el array usando el método Fisher-Yates shuffle
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


if (answerCategory === undefined) {
    answerCategory = sports; //Categoria por defecto si actualiza el navegador
    // barajar el array almacenado en answerCategory
    shuffleArray(answerCategory);
}else {
    shuffleArray(answerCategory);
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
    clearInterval(timer);
    document.querySelector("#timer").innerText = 10;
    document.querySelector("#life").innerText = life;

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
    let time = 9;

    // actualizar el temporizador cada segundo
    timer = setInterval(function () {
        // restablecer el temporizador si se acaba el tiempo
        if (time <= 0) {
            clearInterval(timer);
            life--;
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
        document.querySelector("#timer").innerText = time;
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
    btnAnswers.remove("#btn-answers");
    timerContainer.remove(".div__time");
    lifeContainer.innerText = life;
    

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

