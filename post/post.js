angular

  .module('lunatone')

  .controller('PostListCtrl', function ($scope, Socket, Post) {
    Post.getList()
      .then(bindTo($scope, 'posts'))

    Socket.on('posts:update', function (message) {
      var index = R.findIndex(function(p){ return p.id === message.post.id}, $scope.posts)
      index === -1 ? 
          $scope.posts[$scope.posts.length] = message.post
        : $scope.posts[index] = message.post
    })

    Socket.on('posts:remove', function (message) {
      $scope.posts = R.filter(function(p){ return p.id !== message.post}, $scope.posts)
    })

  })

  .controller('PostDetailCtrl', function ($scope, $stateParams, $state, Socket, Post) {
    Post.get($stateParams.id)
      .then(bindTo($scope, 'post'))
      .catch(go($state.go, 'post.list', null))

    $scope.delete = function () {
      Post.remove($scope.post)
        .then(R.prop('id'))
        .then(socketEmission(Socket, 'post:delete', 'post'))
        .then(go($state.go, 'post.list', null))
    }

    Socket.on('posts:update', function (message) {
      if(message.post.id === $scope.post.id){
        $scope.post = message.post
      }
    })

    Socket.on('posts:remove', function (message) {
      if(message.post === $scope.post.id){
        $scope.deleted = true
      }
    })
  })

  .controller('PostEditCtrl', function ($scope, $stateParams, $state, Socket, Post) {
    $stateParams.id ?
        Post.get($stateParams.id)
          .then(bindTo($scope, 'post'))
          .catch(go($state.go, 'post.list', null))
      : bindTo($scope, 'post', {})

    $scope.networks  = ['Facebook', 'Twitter']
    $scope.postTypes = ['Text', 'Photo']
    $scope.tags      = ['converstaion', 'sales', 'social', 'meme']
    $scope.countries = ['Denmark', 'Brazil', 'Japan', 'Chile']
    $scope.languages = ['Danish', 'Portuguese', 'Japanese', 'Spanish']

    $scope.dropzoneConfig = {
      options: {
        url: '/',
        acceptedFiles: '.jpg',
        autoProcessQueue: false,
        previewsContainer: '.preview'
      },
      eventHandlers: {
        addedfile: function (image) {
          this.previewsContainer.innerHTML = image.name

          var fileReader = new FileReader()

          fileReader.onload = function (e) {
            $scope.$apply(function() {
              $scope.post.image = e.target.result
            })
          }

          fileReader.readAsDataURL(image)
        }
      }
    }

    $scope.isPhotoType = function () {
      return $scope.post && $scope.post.type &&$scope.post.type.toLowerCase() === 'photo'
    }

    $scope.save = function (shouldPublish) {
      $scope.post.published = shouldPublish
      var saving = $scope.post.id ? $scope.post.save() : Post.create($scope.post)

        saving
        .then(socketEmission(Socket, 'post:edit', 'post'))
        .then(go($state.go, 'post.list', null))
    }
  })

  .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
      .state('post', {
        abstract: true,
        url: '/lunatone/posts',
        templateUrl: templatePost('post.html')
      })

      .state('post.list', {
        url: '',
        templateUrl: templatePost('post-list.html'),
        controller: 'PostListCtrl'
      })

      .state('post.add', {
        url: '/add',
        templateUrl: templatePost('post-edit.html'),
        controller: 'PostEditCtrl'
      })

      .state('post.edit', {
        url: '/edit/{id}',
        templateUrl: templatePost('post-edit.html'),
        controller: 'PostEditCtrl'
      })

      .state('post.detail', {
        url: '/{id}',
        templateUrl: templatePost('post-detail.html'),
        controller: 'PostDetailCtrl'
      })
    }
  ])