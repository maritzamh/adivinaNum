// Genera un número aleatorio entre 1 y 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Obtiene referencias a elementos HTML relevantes
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

// Inicializa el contador de intentos del jugador y declara una variable para el botón de reinicio
let guessCount = 1;
let resetButton;

// Función que verifica la suposición del jugador
function checkGuess() {
    // Obtiene la suposición del jugador del campo de entrada y la convierte a número
    const userGuess = Number(guessField.value);

    // Si es el primer intento del jugador, muestra un mensaje de 'Previous guesses'
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    // Muestra la suposición del jugador en la sección de suposiciones anteriores
    guesses.textContent += '#' + guessCount + ': ' + userGuess + ' ';

    // Comprueba si la suposición del jugador es correcta
    if (userGuess === randomNumber) {
        // Si es correcta, muestra un mensaje de felicitaciones
        lastResult.textContent = 'Congratulations! You got it right! The correct number was ' + randomNumber;
        lastResult.className = 'lastResult correct'; // Aplica estilo para indicar respuesta correcta
        lowOrHi.textContent = ''; // Limpia el mensaje de 'too high' o 'too low'
        setGameOver(); // Llama a la función para finalizar el juego
    } else if (guessCount === 10) {
        // Si el jugador agota sus 10 intentos, muestra un mensaje de 'GAME OVER' y finaliza el juego
        lastResult.textContent = '!!!GAME OVER!!! The correct number was ' + randomNumber;
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        // Si la suposición es incorrecta, muestra un mensaje correspondiente
        lastResult.textContent = 'Wrong!';
        lastResult.className = 'lastResult incorrect'; // Aplica estilo para indicar respuesta incorrecta
        // Muestra si la suposición fue demasiado baja o demasiado alta
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    // Incrementa el contador de intentos, limpia el campo de entrada y lo enfoca para el siguiente intento
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// Agrega un evento de clic al botón de enviar suposiciones para activar la función checkGuess()
guessSubmit.addEventListener('click', checkGuess);

// Función que finaliza el juego
/*/function setGameOver() {
    // Deshabilita el campo de entrada y el botón de enviar suposiciones
    guessField.disabled = true;
    guessSubmit.disabled = true;
    // Crea un botón para iniciar un nuevo juego
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    // Agrega un evento de clic al botón de reinicio para activar la función resetGame()
    resetButton.addEventListener('click', resetGame);
    // Agrega el botón de reinicio al cuerpo del documento
    document.body.appendChild(resetButton);
}*/
function setGameOver() {
    // Deshabilita el campo de entrada y el botón de enviar suposiciones
    guessField.disabled = true;
    guessSubmit.disabled = true;
    // Crea un botón para iniciar un nuevo juego
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    // Agrega una clase al botón
    resetButton.classList.add('resetButton');
    // Agrega un evento de clic al botón de reinicio para activar la función resetGame()
    resetButton.addEventListener('click', resetGame);
    // Agrega el botón de reinicio al cuerpo del documento
    document.body.appendChild(resetButton);
}

// Función que reinicia el juego
function resetGame() {
    // Reinicia el contador de intentos
    guessCount = 1;
    // Limpia los mensajes de resultado de suposiciones anteriores
    guesses.textContent = '';
    lastResult.textContent = '';
    lowOrHi.textContent = '';
    // Elimina el botón de reinicio del juego
    resetButton.parentNode.removeChild(resetButton);
    // Habilita el campo de entrada y el botón de enviar suposiciones
    guessField.disabled = false;
    guessSubmit.disabled = false;
    // Limpia el campo de entrada y lo enfoca para la siguiente suposición
    guessField.value = '';
    guessField.focus();
    // Restablece el estilo del área de resultado y genera un nuevo número aleatorio
    lastResult.className = 'lastResult';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
