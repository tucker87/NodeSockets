const Player = require('./Player')

module.exports = class Data {
    openWs() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket('ws://localhost:3000/game/')
            this.ws.onopen = () => resolve()
            this.ws.onerror = error => reject(error)
            this.ws.onclose = (event) => console.log("Websocket socket closed: " + JSON.stringify(event))
        })
    }

    sendMessage(msg) {
        return new Promise((resolve, reject) => {
            this.ws.onmessage = (msg) =>
                resolve(JSON.parse(msg.data))
            
            this.ws.send(JSON.stringify(msg))
        })   
    }

    eat(id) {
        return this.sendMessage({type: 'eat', payLoad: id})
    }

    playerMove(player) {
        return this.sendMessage({type: 'move', payLoad: player})
    }
}
