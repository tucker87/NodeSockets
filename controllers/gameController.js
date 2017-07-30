let players = [];
let food = []
let playerConnectionIDCount = 0;

exports.index = (req, res, next) => {
    res.render('game', {})
}

exports.join = (ws, req, next) => {
    ws.id = playerConnectionIDCount++
    console.log('WebSocket was opened')
    console.log(Object.keys(players))
    players[ws.id] = ws
    
    ws.on('message', msg => {
        var player = JSON.parse(msg)
        players[ws.id].body = player.body
        players[ws.id].name = ws.id
        ws.send(JSON.stringify(
            
            {
                otherPlayers: players
                    .filter(p => p != null && p.name != ws.id)    
                    .map(p => ({ name: p.name, body: p.body }))
            }
        ))
    })

    ws.on('close', () => {
        delete players[ws.id];
        console.log('WebSocket was closed')
    })
}