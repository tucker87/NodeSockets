var browserify = require('browserify-middleware');
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var app = express();
var expressWs = require('express-ws')(app)

var index = require('./routes/index')
var test = require('./routes/test')
var game = require('./routes/game')

const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/compiled/Main.js', browserify('./snake/Main.js'));

app.use('/', index)
app.use('/test', test)
app.use('/game', game)

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})