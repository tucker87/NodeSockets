 const Player = require('./Player')

module.exports = class Server {
    constructor(board) {
        this.board = board
    }
    openWs() {
        this.ws = new WebSocket('ws://localhost:3000/game/')
        this.ws.onmessage = function (board, event) {
            board.otherPlayers = JSON.parse(event.data).otherPlayers.map(op => {
                let player = new Player(board, op.body)
                player.body = op.body
                return player
            })
            console.log(board.otherPlayers)
        }.bind(null, this.board)
    }

    sendMessage(msg) {
        if (this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(msg))
        }
    }
}
