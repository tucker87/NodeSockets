let gameEvents = ({ ws, players, foods }) =>
    ({
        eat: (id) => {
            foods[id].x += 1
            foods[id].y += 1
        },
        move: (player) => {
            players[ws.id].body = player.body
            players[ws.id].name = ws.id
            ws.send(JSON.stringify(
                {
                    otherPlayers: players
                        .filter(p => p != null && p.name != ws.id)
                        .map(p => ({ name: p.name, body: p.body })),
                    foods
                }
            ))
        }
    })

module.exports = gameEvents