var express       = require('express')
  , app           = express()
  , cors          = require('cors')
  , http          = require('http').Server(app)
  , io            = require('socket.io')(http)
  , routes        = require('./routes')
  , port          = process.env.PORT || 3000

require('./socket')(io)
app.use(cors())
app.use(routes)

http.listen(port)