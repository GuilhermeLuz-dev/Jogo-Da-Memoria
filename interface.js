const CARD = 'card'
const FRONT = 'cardFront'
const BACK = 'cardBack'

startgame()

function startgame ()  {
    initializeCards(game.createCardsFromFruits())
}

function initializeCards(){
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''

    game.cards.forEach(card =>{
        let cardElement = document.createElement('div');
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.id = card.id;

        createCardContent(card, cardElement)
        gameBoard.appendChild(cardElement)
    

    })
    
}
function createCardContent(card, cardElement){
        criateFace(FRONT, card, cardElement)
        criateFace(BACK, card, cardElement)
}

function criateFace(face, card , cardElement){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face)

    if (face == FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(card.icon);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(cardElementFace)
}
