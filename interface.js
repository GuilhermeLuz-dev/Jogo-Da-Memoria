const CARD = 'card'
const FRONT = 'cardFront'
const BACK = 'cardBack'
const ICON = 'icon'

startgame()


function startgame() {
    initializeCards(game.createCardsFromFruits())   
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    game.contMoves = 0    
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.id = card.id;

        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })

}
function createCardContent(card, cardElement) {
    criateFace(FRONT, card, cardElement)
    criateFace(BACK, card, cardElement)
}

function criateFace(face, card, cardElement) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face)

    if (face == FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(cardElementFace)
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.secundCard) {
          
            document.getElementById('contMoves').innerHTML = game.contMoves;
            if (game.checkMate()) {
                if (game.gameOver()) {
                    let gameOver = document.getElementById('gameOver')
                    gameOver.style.display = 'flex'
                    game.ranking.push({'nome': game.namePlayer, 'qtd_jogadas': game.contMoves})
                    game.sortRanking()
                    updateViewRanking()
                }
                game.clearCards()
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secundCardView = document.getElementById(game.secundCard.id)
                    firstCardView.classList.remove('flip')
                    secundCardView.classList.remove('flip')
                    game.unflipedCard(game.namePlayer)
                }, 1000)
            }

        }
    }
}

function reset() {
    inputName = document.getElementById('name')
    if (inputName.value != '' && inputName.value.length <= 10) {
        let gameOver = document.getElementById('gameOver')
        gameOver.style.display = 'none'
        game.clearCards()
        startgame()
        game.namePlayer =  inputName.value
    }else{
        inputName.style.border = '2px solid red'
        setTimeout(()=>{
            inputName.style.border = 'none'
        },500)
    }
    if(localStorage.length != 0){
        for(let i = 0; i< localStorage.length; i++){
            game.ranking[i] = localStorage.getItem(`${i}`)
        }
        localStorage.clear()
        document.getElementById('list').innerHTML = ''
        for(let i =0; i< game.ranking.length; i++){
            document.getElementById('list').innerHTML += game.ranking[i] 
        }

    }
}

function updateViewRanking(){
    ranking = document.getElementById('list')
    ranking.innerHTML = ''
    for(let i = 0; i < game.ranking.length; i++){
        ranking.innerHTML +=  `<li>${game.ranking[i].nome} - ${game.ranking[i].qtd_jogadas}</li>`
        localStorage.setItem(`${i}`,  `<li>${game.ranking[i].nome} - ${game.ranking[i].qtd_jogadas}</li>`)
    }

}
