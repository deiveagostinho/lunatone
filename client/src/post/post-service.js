angular

  .module('lunatone')

  .factory('Post', function (Resource) {
    return new Resource('posts')
  })