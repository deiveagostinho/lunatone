module.exports = function (io) {
  io.set("transports", ["xhr-polling"])

  io.on('connection', function(socket){
    socket.on('post:create', function(post){
      socket.broadcast.emit('posts:update', post)
    })

    socket.on('post:edit', function(post){
      socket.broadcast.emit('posts:update', post)
    })

    socket.on('post:delete', function(post){
      socket.broadcast.emit('posts:remove', post)
    })

    socket.on('datapoint:create', function(reach){
      socket.broadcast.emit('reach:update', reach)
    })
  })
}