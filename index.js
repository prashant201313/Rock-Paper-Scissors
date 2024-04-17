const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const gameRules = document.querySelector('.game-rules');
const next = document.querySelector('.next-btn');

const choiceBtn = document.querySelectorAll('.circles');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const result = document.querySelectorAll('.result');

const winner = document.querySelector('.winner');
const text = document.querySelector('.text');
const against = document.querySelector('.against');
const play = document.querySelector('.play');

const pcScoreElem = document.getElementById('pcscore');
const userScoreElem = document.getElementById('userscore');

let pcScore = JSON.parse(localStorage.getItem('pcScore')) || 0;
let userScore = JSON.parse(localStorage.getItem('userScore')) || 0;

pcScoreElem.textContent = pcScore;
userScoreElem.textContent = userScore;

const CHOICES = [
    {
        name: "rock",
        beats: "scissor"
    },
    {
        name: "scissor",
        beats: "paper"
    },
    {
        name: "paper",
        beats: "rock"
    },
]

// Game Logic
choiceBtn.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice);
    })
})

function choose(choice) {
    const pcchoice = pcChoose();
    displayResults([choice, pcchoice]);
    displayWinner([choice, pcchoice]);
}

function pcChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    result.forEach((resultDiv, ind) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <button class="circles" data-choice="${results[ind].name}">
                    <img src="image/${results[ind].name}circle.png" class="background-image" alt="" />
                    <img src="image/${results[ind].name}.png" class="logo ${results[ind].name}" alt="" />
                </button>    
            `
        });
    })
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const pcWins = isWinner(results.reverse());

        if(userWins) {
            text.innerText = "YOU WIN";
            next.style.display = "block";
            btnRules.classList.toggle('show');
            result[0].style.boxShadow = 'inset 0 0 0 16px #279b27, 0 0 0 25px #279b27, 0 0 0 50px #32a62f, 0 0 0 75px #66b248';
            userScore++;
            userScoreElem.textContent = userScore;
            localStorage.setItem('userScore', JSON.stringify(userScore));
        }
        else if(pcWins) {
            text.innerText = "YOU LOST";
            result[1].style.boxShadow = 'inset 0 0 0 16px #279b27, 0 0 0 25px #279b27, 0 0 0 50px #32a62f, 0 0 0 75px #66b248';
            pcScore++;
            pcScoreElem.textContent = pcScore;
            localStorage.setItem('pcScore', JSON.stringify(pcScore));
        }
        else {
            text.innerText = "TIE UP";
            against.innerText = '';
            play.innerText = "REPLAY";
        }
    })
    winner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

// Play Again
play.addEventListener('click', () => {
    window.location.reload();
})

// To Show or hide the rules of game
btnRules.addEventListener('click', () => {
    gameRules.style.display = 'block';
});

btnClose.addEventListener('click', () => {
    gameRules.style.display = 'none';
});
