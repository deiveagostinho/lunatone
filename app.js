angular

  .module('lunatone', [
    'ngResource',
    'ngSanitize',
    'restangular',
    'btford.socket-io',
    'ui.router',
    'ui.select'
  ])

  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://lunatone.herokuapp.com/')
  })

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $urlRouterProvider.otherwise('/')
      $stateProvider
        .state('home', {
          url: '/lunatone/',
          templateUrl: templateApp('app.html'),
          controller: 'AppCtrl'
        })
        
      if(window.history && window.history.pushState){
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        })
      }
  }])
  
  .controller('AppCtrl', function($scope){
    
  })