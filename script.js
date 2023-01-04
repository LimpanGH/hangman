var programming_languages = [
    "python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html", 
	"css",
	"c",
	"csharp",
	"golang", 
	"kotlin",
	"php",
	"sql",
	"ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// This function will pick one of the words in our array of programming-languages.
function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
    // alert(answer);
}

/*  * btn-lg is setting the size of the buttons
    * m-2 is setting the margin between the buttons: https://getbootstrap.com/docs/4.0/utilities/spacing/ 
    * the strings with + letter + could be cleaned up by converting then to template strings */
function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxzy'.split('').map(letter =>
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

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    
    //alert(answer);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } 
    
    else if (answer.indexOf (chosenLetter) === -1) {
        mistakes++;
        updateMistakes(); 
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

    function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

 function updateMistakes() { 
    document.getElementById('mistakes').innerHTML = mistakes;
 }

 function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg'; 

    randomWord ();
    guessedWord();
    updateMistakes();
    generateButtons();

 }

    document.getElementById('maxWrong').innerHTML = maxWrong


randomWord();
generateButtons();
guessedWord();