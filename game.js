// Regra do jogo.
game = {
    // Atributos auxiliares.
    firstCard: null,
    secundCard: null,
    lockMode: false,
    contMoves: 0,
    ranking: [],
    fruits: [
        'abacaxi',
        'banana',
        'coco',
        'limao',
        'maca',
        'manga',
        'maracuja',
        'melancia',
        'morango',
        'uva'
    ],
    cards: null,

    // Crinando  cards baseados na lista de frutas do array fruits.
    createCardsFromFruits: function () {
        this.cards = []
        this.fruits.forEach(fruit => {
            this.cards.push(this.createPairFromFruits(fruit));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuflleCards()
        return this.cards;
    },

    // Criando pares com ids diferentes. 
    createPairFromFruits: function (fruit) {
        return [{
            id: this.createId(fruit),
            icon: fruit,
            fliped: false
        }, {
            id: this.createId(fruit),
            icon: fruit,
            fliped: false
        }]
    },

    // Criando ids aleatórios para identificar cada uma das cartas.
    createId: function (fruit) {
        return fruit + parseInt(Math.random() * 1000);
    },

    // Embaralhando os cards.
    shuflleCards: function () {
        currentIndex = this.cards.length;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    },

    // Pegando o card clicado e mudando seu estado para fliped caso ele já não tenha sido clicado.
    setCard: function (id) {
        let card = this.cards.filter(card => card.id == id)[0];
        if (this.lockMode || card.fliped) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.fliped = true;
            return true;
        } else {
            this.secundCard = card;
            this.secundCard.fliped = true;
            this.lockMode = true;
            this.contMoves++;
            return true;
        }
    },

    // Verificando se foi formado um par depois de dois cards terem sido clicados.
    checkMate: function () {
        if (!this.firstCard || !this.secundCard) {
            return false;
        }
        return this.firstCard.icon === this.secundCard.icon;
    },

    // Verificado se o jogo foi finalizado.
    gameOver: function () {
        return this.cards.filter(card => !card.fliped).length == 0;
    },

    // Reiniciando os cards
    clearCards: function () {
        this.firstCard = null;
        this.secundCard = null;
        this.lockMode = false;
    },

    // Mudando o estado dos cards para not fliped 
    unflipedCard: function () {
        this.firstCard.fliped = false;
        this.secundCard.fliped = false;
        this.clearCards();
    }

}
