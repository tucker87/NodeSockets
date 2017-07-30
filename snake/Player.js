const Direction = require('./Direction')
const Utils = require('./Utils')
const _ = require('lodash')

let _board;

class Player {
    constructor(board, body) {
        _board = board
        
        this.body = body
            || [{
                x: Utils.randomBoardPosition(board),
                y: Utils.randomBoardPosition(board)
            }]
        
        this.direction = Utils.random(0, 3)
        this.length = 4
    }
    update() {
        this.move()
        this.updateCollision()
    }
    move() {
        let head = this.getHead()
        let newHead = Object.assign({}, head);
        newHead = Direction.add(newHead, this.direction)
        this.body.push(newHead)
        if(this.body.length > this.length)
            this.body.shift()
    }
    updateCollision() {
        let head = this.getHead()
        for (let food of _board.food) {
            if (head.x == food.x && head.y == food.y) 
                this.eat(food)
        }
        
        if (_.some(this.body.slice(0, this.body.length -1), head))
            _board.killPlayer(this)
        
        for (let otherPlayer of _board.players.slice(1)) {
            for(let coor of this.body)
                if (_.some(otherPlayer.body, coor))
                    _board.killPlayer(this)
        }
    }
    eat(food) {
        this.length++
        _board.eatFood(food)
    }
    draw() {
        for (let coor of this.body) {
            _board.drawSquare(coor.x, coor.y, _board.options.player)
        }
    }
    turn(newDirection) {
        if (newDirection != undefined && !Direction.isOpposite(this.direction, newDirection))
            this.direction = newDirection
    }
    getHead() {
        return this.body[this.body.length - 1]
    }
}

module.exports = Player