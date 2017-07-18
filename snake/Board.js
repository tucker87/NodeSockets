 const Food = require('./Food')
 const Player = require('./Player')
 const _ = require('lodash')

class Board {
    constructor(canvas, options) {
        this.backgroundColor = "white"
        this.wallColor = "black"
        this.canvas = canvas
        this.context = canvas.getContext("2d");
        this.options = options
        canvas.width = options.canvas.width
        canvas.height = options.canvas.height
        this.food = []
        this.players = []
    }

    update() {
        this.drawBackground()
        for (let food of this.food) {
            food.update();
            food.draw();
        }
        for (let player of this.players) {
            player.update();
            player.draw();
        }
    }

    drawBackground() {
        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.strokeStyle = this.wallColor
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawSquare(x, y, block) {
        let size = block.size
        var x = x * block.size, y = y * block.size
        this.context.fillStyle = block.color
        this.context.fillRect(x, y, block.size, block.size)
        this.context.strokeStyle = block.borderColor
        this.context.strokeRect(x, y, block.size, block.size)
        this.context.strokeRect(x + 1, y + 1, block.size - 1, block.size - 1)
    }

    width() {
        return this.canvas.width / this.options.blocks.size
    }

    height() {
        return this.canvas.height / this.options.blocks.size
    }
    addFood() {
        this.food.push(new Food(this))
    }
    addPlayer() {
        this.players.push(new Player(this))
    }
    killPlayer(player) {
        _.remove(this.players, player)
        this.addPlayer()
    }
    eatFood(food) {
        _.remove(this.food, food)
        this.addFood();
    }
}

module.exports = Board