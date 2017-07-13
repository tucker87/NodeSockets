class Board {
    constructor(canvas, options) {
        this.backgroundColor = "white"
        this.wallColor = "black"
        this.canvas = canvas
        this.context = canvas.getContext("2d");
        this.options = options
        canvas.width = options.canvas.width
        canvas.height = options.canvas.height
    }

    update() {
        this.drawBackground()
    }

    drawBackground() {
        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.strokeStyle = this.wallColor
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
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

    width() {
        return this.canvas.width / this.options.blocks.size
    }

    height() {
        return this.canvas.height / this.options.blocks.size
    }
}

module.exports = Board