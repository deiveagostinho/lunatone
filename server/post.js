var save            = require('save')
  , R               = require('ramda')
  , utils           = require('./utils')
  , maybeRespond    = utils.maybeRespond

var Post = save('Post', {idProperty: 'id'})

function create (req, res) {
  var response = null
  Post.create(req.body, function(err, obj){
    response = maybeRespond('Unable to create a new post.', 400, err, obj)
  })

  return res.status(response.status).json(response)
}

function update (req, res) {
  var response = null
  Post.update(req.body, true, function(err, obj){
    response = maybeRespond('Unable to update the current post.', 400, err, obj)
  })

  return res.status(response.status).json(response)
}

function get (req, res) {
  var response = null
  Post.read(req.params.id, function(err, obj){
    response = maybeRespond('Unable to get the requested post.', 404, err, obj)
  })

  return res.status(response.status).json(response)
}

function del (req, res) {
  var response = null
  Post.delete(req.params.id, function(err){
    response  = err ?
        {status: 400, error: "Unable to delete post " + req.params.id}
      : {status: 200, error: null, id: req.params.id}
  })
  return res.status(response.status).json(response)
}

function getList (req, res) {
  var response = null
  Post.find('', function(err, obj){
    response = obj
  })

  return res.status(200).json(response)
}

module.exports = {
    create   : create
  , update   : update
  , get      : get
  , getList  : getList
  , 'delete' : del
}