'use strict';

angular.module('fastWeather', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url:'/',
        views: {
            'home': {
                templateUrl : 'views/home.html',
                controller  : 'HomeController'
            }
        }
    });

    $urlRouterProvider.otherwise('/');
});
