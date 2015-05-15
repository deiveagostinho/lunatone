var express       = require('express')
  , app           = express()
  , http          = require('http').Server(app)
  , io            = require('socket.io')(http)
  , routes        = require('./server/routes')
  , port          = process.env.PORT || 3000

require('./server/socket')(io)

app.use(routes)
app.use('/app', express.static('client/src'))
app.use('/bower', express.static('client/bower_components'))

app.get('*', function (req, res) {
  var options = {
    root: __dirname + '/client/src/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  }

  return res.sendFile('index.html', options, function (err) {
    if (err) {
      res.status(err.status).end();
    }
  })
})

http.listen(port)