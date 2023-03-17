game = {
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
    }

}
