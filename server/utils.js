var R               = require('ramda')

var maybeRespond = R.curry(function (errorMessage, status, error, object) {
  return !object ?
      { status: status, error: errorMessage}
    : R.merge(object, {status: 200, error: null})
})

var endpoint = function (param) {
  return param ?
      '/api/' + param
    : '/api'
}

module.exports = {
    maybeRespond : maybeRespond
  , endpoint     : endpoint
}