angular

  .module('lunatone')

  .controller('ReachDetailCtrl', function ($scope, $stateParams, $state, Socket, Reach) {

    Reach.getList()
      .then(R.map(clearDataPoint))
      .then(bindTo($scope, 'reach'))

    bindTo($scope, 'isFormRendered', false)
    bindTo($scope, 'datapoint', {})

    Socket.on('reach:update', saveDataPoint($scope, 'reach'))

    $scope.toggle = function(){
      $scope.isFormRendered = !$scope.isFormRendered
    }

    $scope.save = function () {
      Reach
        .create(validateDataPoint($scope.datapoint))
        .then(clearDataPoint)
        .then(saveDataPoint($scope, 'reach'))
        .then(socketEmission(Socket, 'datapoint:create', null))
        .then($scope.toggle)
      }
  })

  .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
      .state('reach', {
        abstract: true,
        url: '/lunatone/statistics',
        templateUrl: templateReach('reach.html')
      })

      .state('reach.detail', {
        url: '',
        templateUrl: templateReach('reach-detail.html'),
        controller: 'ReachDetailCtrl'
      })
  }])