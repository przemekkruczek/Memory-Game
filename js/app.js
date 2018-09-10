const cards = [
    {'img':'images/title_1.png','number':1},
    {'img':'images/title_2.png','number':2},
    {'img':'images/title_3.png','number':3},
    {'img':'images/title_4.png','number':4},
    {'img':'images/title_5.png','number':5},
    {'img':'images/title_6.png','number':6},
    {'img':'images/title_7.png','number':7},
    {'img':'images/title_8.png','number':8},
    {'img':'images/title_9.png','number':9},
    {'img':'images/title_10.png','number':10}
];

const gameBoard = document.querySelector('.game-board');
const gridTiles = document.createElement('div');
gridTiles.setAttribute('class','grid-tiles');
gameBoard.appendChild(gridTiles);

const gameGrid = cards.concat(cards);

let activeCard = "";
const popup = document.getElementById("win-window");
const activeCards = [];
let gameResult = 0;
const gamePairs = gameGrid.length/2;
const startTime = new Date().getTime();

const clickCard = function () {
    let card = document.querySelectorAll('.card');
    card = [...card];

    activeCard = this;
    if(activeCard === activeCards[0]) return;
    const back = this.lastChild;
    const front = this.firstChild;
    back.classList.add('back');
    front.classList.remove('front');

    //1 click
    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
    }
    //2 click
    else {
        card.forEach(card => card.removeEventListener('click',clickCard));
        activeCards[1] = activeCard;
        setTimeout(function () {
            if(activeCards[0].dataset.name === activeCards[1].dataset.name) {
                activeCards.forEach(activeCard => {
                    activeCard.classList.add('off');
                    activeCard.firstChild.remove();
                    activeCard.lastChild.remove();
                });
                gameResult++;
                if(gameResult === gamePairs) {
                    popup.classList.add("show");
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime)/1000;
                    document.querySelector('.score').innerHTML = `${gameTime} seconds`;
                }
            }else{
                activeCards.forEach(activeCard => {
                    activeCard.firstChild.classList.add('front');
                    activeCard.lastChild.classList.remove('back');
                });
            }
            activeCard = '';
            activeCards.length = 0;
            card.forEach(card => card.addEventListener('click',clickCard));
        },1000)
    }
};

function startGame(){
    gameGrid.sort(() => Math.random()-0.5);

    gameGrid.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.name = item.number;
        const front = document.createElement("div");
        const back = document.createElement("div");
        back.classList.add("back");
        back.style.backgroundImage = `url(${item.img})`;

        gridTiles.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        setTimeout(function () {
            gameGrid.forEach(item => {
                front.classList.add('front');
                back.classList.remove('back');
                card.addEventListener('click',clickCard);
            })
        },1500);
    });
}
startGame();

