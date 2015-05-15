// General Use

var bindTo = R.curry(function (scope, name, value) {
  scope[name] = value
  return value
})

var go = R.curry(function (state, url, id) {
  return function() {
    return id ?
      state(url, {id: id})
    : state(url)
  }
})


// Template Path Generation

var templateUrl = R.curry(function (path, file) {
  return "http://jugoncalv.es" + path + file
})

var templateApp = templateUrl('/lunatone/')
var templatePost = templateUrl('/lunatone/post/')
var templateReach = templateUrl('/lunatone/reach/')


// Socket Emission Helper

var socketEmission = R.curry(function (socket, message, name, data) {
  name ? 
      socket.emit(message, {[name] : data})
    : socket.emit(message, data)
  return data
})


// Data Point Helpers

var clearDataPoint = R.curry(function (data) {
  return {
    id: data.id,
    total: data.total,
    organic: data.organic,
    viral: data.viral,
    paid: data.paid
  }
})

var saveDataPoint = R.curry(function (scope, name, value) {
  scope[name] = scope[name].concat(value)
  return value
})

var validateDataPoint = R.curry(function (scopedDatapoint) {
  var datapoint = {
    organic: Number(scopedDatapoint.organic) || 0,
    viral: Number(scopedDatapoint.viral) || 0,
    paid: Number(scopedDatapoint.paid) || 0
  }

  datapoint.total = datapoint.organic + datapoint.viral + datapoint.paid

  return datapoint
})

// Graph Helpers

var translate = R.curry(function (x, y) {
  return "translate(" + x + "," + y + ")"
})

var differentFrom = R.curry(function(values, item){
  return values.reduce(function(acc, value){
    return acc && item !== value
  }, true)
})