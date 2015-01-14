'use strict';

angular.module('imageCropPOC', [
  
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/crop', {
        templateUrl: 'views/partials/cropimage.html',
        controller: 'CropimageCtrl'
      })
      .when('/finish', {
        templateUrl: 'views/partials/finish.html',
        controller: 'FinishCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
  });