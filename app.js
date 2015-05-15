var express       = require('express')
  , app           = express()
  , cors          = require('cors')
  , http          = require('http').Server(app)
  , io            = require('socket.io')(http)
  , routes        = require('./routes')

require('./socket')(io)
app.use(cors())
app.set('port', (process.env.PORT || 3000))
app.use(routes)

app.listen(app.get('port'))