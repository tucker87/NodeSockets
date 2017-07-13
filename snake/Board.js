class Board {
    constructor(canvas, options) {
        this.width = 400
        this.height = 400
        this.backgroundColor = "white"
        this.wallColor = "black"
        this.canvas = canvas
        this.context = canvas.getContext("2d");
        this.options = options
        canvas.width = this.width
        canvas.height = this.height
    }

    update() {
        this.drawBackground()
    }

    drawBackground() {
        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.strokeStyle = this.wallColor
        this.context.strokeRect(0, 0, this.width, this.height)
    }

    drawSquare(x, y) {
        let size = this.options.blocks.size
        var x = x * size, y = y * size
        this.context.fillStyle = this.options.blocks.color
        this.context.fillRect(x, y, size, size)
        this.context.strokeStyle = this.options.blocks.borderColor
        this.context.strokeRect(x, y, size, size)
        this.context.strokeRect(x + 1, y + 1, size - 1, size - 1)
    }
}

module.exports = Board