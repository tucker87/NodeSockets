const Utils = require('./Utils')

class Food {
    constructor(board) {
        this.x = Utils.randomBoardPosition(board)
        this.y = Utils.randomBoardPosition(board)
        this.board = board
    }
    update() {
        
    }
    draw() {
        this.board.drawSquare(this.x, this.y, this.board.options.food)
    }
}

module.exports = Food