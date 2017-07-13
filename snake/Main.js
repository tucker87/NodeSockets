const Direction = require('./Direction')
const Player = require('./Player')
const Board = require('./Board')
const Controls = require('./Controls')
const Options = require('./Options')

let canvas = document.getElementById("gameCanvas")

let board = new Board(canvas, Options)
let player = new Player(board)

document.onkeydown = function (e) {
    player.turn(Controls.Keys[e.keyCode])
}

let lastFrameTimeMs = 0
function gameLoop(timeStamp) {
    if (timeStamp < lastFrameTimeMs + (1000 / Options.fps)) {
        requestAnimationFrame(gameLoop)
        return
    }

    board.update()
    player.update()

    lastFrameTimeMs = timeStamp
    requestAnimationFrame(gameLoop)
}
gameLoop()