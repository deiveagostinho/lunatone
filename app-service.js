angular

  .module('lunatone')

  .factory('Resource', ['Restangular', function (Restangular) {

    function Resource(route) {
      this.route = route
    }

    Resource.prototype.getList = function (params) {
      return Restangular.all(this.route).getList(params)
    }

    Resource.prototype.get = function (id) {
      return Restangular.one(this.route, id).get()
    }

    Resource.prototype.update = function (resource) {
      return resource.save().$object;
    }

    Resource.prototype.create = function (resource) {
      return Restangular.all(this.route).post(resource)
    }

    Resource.prototype.remove = function (resource) {
      return Restangular.one(this.route, resource.id).remove()
    }

    return Resource
  }])

  .factory('Socket', function (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('https://lunatone.herokuapp.com/')
    })
  })