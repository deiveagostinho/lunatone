var express       = require('express')
  , app           = module.exports = express()
  , R             = require('ramda')
  , utils         = require('./utils')
  , bodyParser    = require('body-parser')
  , multer        = require('multer')
  , endpoint      = utils.endpoint

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(multer())

var Post    = require('./post')
  , Reach   = require('./reach')
  , version = require('../package.json').version

app.get(endpoint(), function (req, res) {
  return res.json({version: version})
})

app.get(endpoint('posts'), Post.getList)
app.get(endpoint('posts/:id'), Post.get)
app.post(endpoint('posts'), Post.create)
app.put(endpoint('posts/:id'), Post.update)
app.delete(endpoint('posts/:id'), Post.delete)

app.get(endpoint('reach'), Reach.getList)
app.post(endpoint('reach'), Reach.create)