const Direction = require('./Direction')

class Player {
    constructor(board) {
        this.body = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
        this.direction = Direction.RIGHT()
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
}

module.exports = Player