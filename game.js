game = {
    firstCard: null,
    secundCard: null,
    lockMode: false,
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
    createCardsFromFruits: function () {
        this.cards = []
        this.fruits.forEach(fruit => {
            this.cards.push(this.createPairFromFruits(fruit))
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuflleCards()
        return this.cards
    },
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
    createId: function (fruit) {
        return fruit + parseInt(Math.random() * 1000)
    },
    shuflleCards: function () {
        currentIndex = this.cards.length
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    },
    setCard: function (id) {
        let card = this.cards.filter(card => card.id == id)[0]
        if(this.lockMode || card.fliped){
            return false
        }
        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.fliped = true
            return true
        } else {
            this.secundCard = card
            this.secundCard.fliped = true
            this.lockMode = true
            return true
        }
    },
    checkMate: function () {
        if (!this.firstCard || !this.secundCard) {
            return false
        }
        return this.firstCard.icon === this.secundCard.icon
    },
    gameOver: function(){
       return this.cards.filter(card => !card.fliped).length == 0
    },
    clearCards: function(){
        this.firstCard = null
        this.secundCard = null
        this.lockMode = false
    },
    unflipedCard: function(){
        this.firstCard.fliped = false
        this.secundCard.fliped = false
        this.clearCards()
    }
}
