var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var expressWs = require('express-ws')
var expressWs = expressWs(express())
var app = expressWs.app

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('home', {})
})

app.get('/broadcast', (request, response) => {
  var message = request.query.message
  console.log(message)
  for (const key of Object.keys(connections)) {
    connections[key].send(message)
  }
  response.end("Message Sent: " + message)
})

var connections = {};
var connectionIDCounter = 0;

app.ws('/', (ws, req) => {
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
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})