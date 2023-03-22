const CARD = 'card'
const FRONT = 'cardFront'
const BACK = 'cardBack'
const ICON = 'icon'

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
        cardElement.addEventListener('click',flipCard)
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
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(cardElementFace)
}

function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add('flip')
       
        if(game.secundCard){
            if(game.checkMate()){
                if(game.gameOver()){
                    let gameOver = document.getElementById('gameOver')
                    gameOver.style.display = 'flex'
                }
                game.clearCards()
            }else{
                setTimeout(()=>{
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secundCardView = document.getElementById(game.secundCard.id)
                    firstCardView.classList.remove('flip')
                    secundCardView.classList.remove('flip')
                    game.unflipedCard()
                },1000)
            }

        }
    }
}

function reset(){
    let gameOver = document.getElementById('gameOver')
    gameOver.style.display = 'none'
    game.clearCards()
    startgame()
}
