const Utils = require('./Utils')

class Food {
    constructor(board, food) {
        this.id = food.id
        this.x = food.x !== null ? food.x : Utils.randomBoardPosition(board)
        this.y = food.y !== null ? food.y : Utils.randomBoardPosition(board)
        this.board = board
    }
    
    draw() {
        this.board.drawSquare(this.x, this.y, this.board.options.food)
    }
}

module.exports = Food