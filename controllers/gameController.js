let gameEvents = require('../gameEvents')

let players = [];
let foods = []
let playerConnectionIDCount = 0;

exports.index = (req, res, next) => {
    res.render('game', {})
}

exports.join = (ws, req, next) => {
    ws.id = playerConnectionIDCount++
    console.log('WebSocket was opened')
    console.log(Object.keys(players))
    players[ws.id] = ws
    foods[ws.id] = { id: ws.id, x: 0, y: 0 }
    let gameEvents = gameEvents({ ws, players, foods })

    ws.on('message', msg => {
        var message = JSON.parse(msg)
        gameEvents[message.type](message.payLoad)
    })

    ws.on('close', () => {
        delete players[ws.id]
        delete foods[ws.id]
        console.log('WebSocket was closed')
    })
}