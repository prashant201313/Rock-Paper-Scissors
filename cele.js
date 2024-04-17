const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const gameRules = document.querySelector('.game-rules');

btnRules.addEventListener('click', () => {
    gameRules.style.display = 'block';
});

btnClose.addEventListener('click', () => {
    gameRules.style.display = 'none';
});