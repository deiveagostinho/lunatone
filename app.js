var express       = require('express')
  , app           = express()
  , cors          = require('cors')
  , server        = require('http').Server(app)
  , io            = require('socket.io').listen(server)
  , routes        = require('./routes')
  , port          = process.env.PORT || 3000

require('./socket')(io)
app.use(cors())
app.use(routes)

server.listen(port)