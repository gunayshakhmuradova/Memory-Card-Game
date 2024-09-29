//Variables;
let cards = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝'];
let shuffled = [];
let flipped = [];
let matched = [];
let moves = 0;
//let resetGame;
//let removeCards;
let timer;
let time = 0;
let timerStarted = false;

const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
//Sounds
const flipSound = new Audio('./sounds/flip.wav'); 
const matchedSound = new Audio('./sounds/matched.wav');
const resetSound = new Audio('./sounds/reset.wav');

// Timer
const startTimer = () => {
    timer = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `Time: ${formatTime(time)}`;
    }, 1000);
};
//Format Timer seconds
const formatTime = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

// Shuffle cards
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Flipped Cards
const flip = function () {
    if (flipped.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add('flipped');
        flipped.push(this);
        
        flipSound.play(); //sound

        if (flipped.length === 2) checkMatch();
    }
}

// Check Matches
const checkMatch = () => {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    let [card1, card2] = flipped;

    if (card1.dataset.card === card2.dataset.card) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matched.push(card1, card2);

        matchedSound.play(); //Sound
        removeCards(card1, card2); //Remove cards

        if (matched.length === cards.length * 2) {
            clearInterval(timer);
            alert(`Congratulations! You finished in ${time} seconds.`);
        }
        flipped = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flipped = []; 
        }, 1000);
    }
}

//Remove Cards
const removeCards = (firstCard, secondCard) => {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
    }, 1000); 
};

// Create Board
const createBoard = () => {
    shuffled = shuffle([...cards, ...cards]);
    shuffled.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.innerHTML = 
            `<div class="card-inner">
                <div class="card-front">💕</div>
                <div class="card-back">${card}</div>
            </div>`;
        cardElement.addEventListener('click', flip);
        board.appendChild(cardElement);
    });
}

// Start Game
function startGame() {
    if(!timerStarted) {
        startTimer();
        timerStarted = true;    
    }
    
    createBoard();
}

//Reset game
const resetGame = () => {
    clearInterval(timer);
    board.innerHTML = '';
    shuffled = [];
    flipped = [];
    matched = [];
    moves = 0;
    time = 0;
    timerStarted = false;

    document.getElementById('timer').innerText = `Time: `;
    movesDisplay.textContent = `Moves: 0`;

    resetSound.play(); //Sound

    startTimer();
    timerStarted = true;

    createBoard();
};

window.onload = startGame;
