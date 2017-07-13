const Direction = require('./Direction')

class Player {
    constructor(board) {
        let offset = 5
        let startingX = this.random(1 + offset, board.width() - offset)
        let startingY = this.random(1 + offset, board.height() - offset)
        this.direction = this.random(0, 3)
        this.length = 4
        this.body = [{ x: startingX, y: startingY }]        
        this.board = board
    }
    update() {
        this.move()
        this.draw()
    }
    move() {
        var head = this.body[this.body.length - 1]
        var newHead = Object.assign({}, head);
        newHead = Direction.add(newHead, this.direction)
        this.body.push(newHead)
        if(this.body.length > this.length)
            this.body.shift()
    }
    draw() {
        for (let coor of this.body) {
            this.board.drawSquare(coor.x, coor.y)
        }
    }
    turn(newDirection) {
        if (!Direction.isOpposite(this.direction, newDirection))
            this.direction = newDirection
    }

    random(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

module.exports = Player