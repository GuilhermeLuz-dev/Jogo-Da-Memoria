// Declarando constantes .
const CARD = 'card'
const FRONT = 'cardFront'
const BACK = 'cardBack'
const ICON = 'icon'

// Fução que inicial. 
startgame();

// Criando cards .
function startgame() {
    initializeCards(game.createCardsFromFruits());
}

// Criando  cards com suas classes e eventos e adicionando no quadro.
function initializeCards() {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    game.contMoves = 0;
    updateViewRanking();
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.id = card.id;

        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })

}

// Função que cria a parte frontal e trazeira dos cards.
function createCardContent(card, cardElement) {
    criateFace(FRONT, card, cardElement);
    criateFace(BACK, card, cardElement);
}

// Identificando pela classe a face que sera criada e adicionando os elementos de acordo com o lado.
function criateFace(face, card, cardElement) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(cardElementFace);
}

// Adicionando efeito de giro nos cards no momento em que eles forem clicados e verficando se foi formado algum par ou se o jogo ja foi finalizado.
function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip');
        if (game.secundCard) {
            document.getElementById('contMoves').innerHTML = game.contMoves;
            if (game.checkMate()) {
                if (game.gameOver()) {
                    let gameOver = document.getElementById('gameOver');
                    gameOver.style.display = 'flex';
                    localStorage.setItem(game.namePlayer, game.contMoves);
                    updateViewRanking();
                }
                game.clearCards();
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secundCardView = document.getElementById(game.secundCard.id);
                    firstCardView.classList.remove('flip');
                    secundCardView.classList.remove('flip');
                    game.unflipedCard(game.namePlayer);
                }, 1000)
            }

        }
    }
}

// Função que reinicia o jogo.
function reset() {
    inputName = document.getElementById('name')
    if (inputName.value != '' && inputName.value.length <= 10) {
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'none';
        game.clearCards();
        startgame();
        game.namePlayer = inputName.value;
    } else {
        inputName.style.border = '2px solid red';
        setTimeout(() => {
            inputName.style.border = 'none';
        }, 500)
    }

}

// Atualizando o rankeamento com o novo vencedor.
function updateViewRanking() {
    lista = document.getElementById('list');
    lista.innerHTML = '';
    ranking = sortRanking();

    for (let i = 0; i < localStorage.length; i++) {
        if (i <= 10) {
            lista.innerHTML += `<li>${localStorage.key(i)} - ${ranking[i]}</li>`;
        }
    }
}
// Ordenando a lista de vencedores em ordem crescente.
function sortRanking() {
    let ranking = [];
    for (let i = 0; i < localStorage.length; i++) {
        ranking.push(localStorage.getItem(localStorage.key(i)));
    }
    ranking.sort()
    console.log(ranking);
    return ranking;
}