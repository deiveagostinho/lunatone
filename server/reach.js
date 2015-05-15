var save            = require('save')
  , R               = require('ramda')
  , utils           = require('./utils')
  , maybeRespond    = utils.maybeRespond
  , data            = require('../data/reach.json')

var Reach = save('Reach', {idProperty: 'id', debug: false})

function getList (req, res) {
  var response = null
  Reach.find('', function(err, obj){
    response = maybeRespond('Unable to get a list of reaches.', 404, err, {items: obj})
  })

  return res.status(response.status).json(response.items)
}

function create (req, res) {
  var response = null
  Reach.create(req.body, function(err, obj){
    response = maybeRespond('Unable to create a new post.', 400, err, obj)
  })

  return res.status(response.status).json(response)
}

module.exports = {
    getList   : getList
  , create    : create
}

data.response.forEach(function (item) {
  var reach = {
      total   : R.path(['post_impressions', '0', 'value']) (item)         || 0
    , organic : R.path(['post_impressions_organic', '0', 'value']) (item) || 0
    , viral   : R.path(['post_impressions_viral', '0', 'value']) (item)   || 0
    , paid    : R.path(['post_impressions_paid', '0', 'value']) (item)    || 0
  }
  Reach.create(reach)
})