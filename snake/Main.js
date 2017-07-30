const Direction = require('./Direction')
const Board = require('./Board')
const Data = require('./Data')
const options = require('./Options')
const controls = require('./Controls')

let canvas = document.getElementById("gameCanvas")

let board = new Board(canvas, options)
let server = new Data()

server.openWs().then(() => {
    board.addFood()
    board.respawnPlayer()

    document.onkeydown = function (e) {
        board.player.turn(controls.Keys[e.keyCode])
    }
    gameLoop()
})


let lastFrameTimeMs = 0
function gameLoop(timeStamp) {
    if (timeStamp < lastFrameTimeMs + (1000 / options.fps)) {
        requestAnimationFrame(gameLoop)
        return
    }

    server.sendMessage(board.player).then((data) => {
        board.setOtherPlayers(data.otherPlayers)
        board.update()
    })


    lastFrameTimeMs = timeStamp
    requestAnimationFrame(gameLoop)
}