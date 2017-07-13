const Direction = require('./Direction')
const Player = require('./Player')
const Board = require('./Board')

let canvas = document.getElementById("gameCanvas")

document.onkeydown = onKeyDown

function onKeyDown(e) {
    player.x = 0
    player.y = 0

    var keys = {
        37: Direction.LEFT(),
        38: Direction.UP(),
        39: Direction.RIGHT(),
        40: Direction.DOWN()
    }

    var newDirection = keys[e.keyCode]
    if (newDirection !== undefined) {
        player.turn(newDirection)
    }
}

let options = {
    fps: 5,
    canvas: {
        height: 400,
        width: 400
    },
    blocks: {
        size: 20,
        color: "black",
        borderColor: "white"
    }
}
let board = new Board(canvas, options)
let player = new Player(board)

var lastFrameTimeMs = 0
function gameLoop(timeStamp) {
    if (timeStamp < lastFrameTimeMs + (1000 / options.fps)) {
        requestAnimationFrame(gameLoop);
        return
    }

    board.update()
    player.update()

    lastFrameTimeMs = timeStamp;
    requestAnimationFrame(gameLoop);
}
gameLoop()