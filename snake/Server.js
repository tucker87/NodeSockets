const Player = require('./Player')

module.exports = class Server {
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
}
