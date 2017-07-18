const Direction = require('./Direction')
const Board = require('./Board')
const Controls = require('./Controls')
const Options = require('./Options')

let canvas = document.getElementById("gameCanvas")

let board = new Board(canvas, Options)
board.addFood()
board.addPlayer()

document.onkeydown = function (e) {
    board.players[0].turn(Controls.Keys[e.keyCode])
}

let lastFrameTimeMs = 0
function gameLoop(timeStamp) {
    if (timeStamp < lastFrameTimeMs + (1000 / Options.fps)) {
        requestAnimationFrame(gameLoop)
        return
    }

    board.update()

    lastFrameTimeMs = timeStamp
    requestAnimationFrame(gameLoop)
}
gameLoop()