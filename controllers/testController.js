var connections = {};
var connectionIDCounter = 0;

exports.index = (req, res, next) => {
    res.render('home', {})
}

exports.broadcast = (req, res, next) => {
    var message = req.query.message
    console.log(message)
    for (let key of Object.keys(connections)) {
        connections[key].send(message)
    }
    res.end("Message Sent: " + message)
}

exports.message = (ws, req, next) => {
    ws.id = connectionIDCounter++;
    connections[ws.id] = ws;
    console.log('WebSocket was opened')
    console.log(Object.keys(connections))

    ws.on('message', msg => {
        ws.send(msg)
    })

    ws.on('close', () => {
        delete connections[ws.id];
        console.log('WebSocket was closed')
    })
}