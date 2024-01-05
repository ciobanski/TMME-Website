// cuvintele de ghicit
var astar_questions = [
    "astar",
    "euristice",
    "algoritm",
    "pathfinding",
    "labirint",
    "cautare"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

//functie care alege un cuvant random
function randomWord() {
    answer = astar_questions[Math.floor(Math.random() * astar_questions.length)];
}

//functie ce genereaza litere 
function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}
//functionalitatea jocului, verifica daca ai raspuns corect si daca nu, updateaza jocul cu o imagine noua a omuletului
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}
//functia de updatare a imaginii omuletului
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}
//verificarea castigului
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'Ai castigat!';
        document.getElementById('keyboard').style.color = 'white';
    }
}
//verificarea pierderii
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'Raspunsul era: ' + answer;
        document.getElementById('wordSpotlight').style.color = 'white';
        document.getElementById('keyboard').innerHTML = 'Ai pierdut!';
        document.getElementById('keyboard').style.color = 'white';
    }
}
//interactiunea cu jocului, aceasta parte creaza suprafata unde se introduc litere
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
    document.getElementById('wordSpotlight').style.color = 'white';
}
//functie ce tine cont de literele gresite
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}
//resetarea jocului pentru o runda noua
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();