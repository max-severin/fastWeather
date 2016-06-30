angular.module('fastWeather', ['ionic', 'ngCordova', 'fastWeather.controllers', 'fastWeather.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {

    $ionicPlatform.ready(function() {    

        $cordovaSplashscreen.show();    

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $timeout(function(){
            $cordovaSplashscreen.hide();
        }, 500);

    });
    
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
    
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $urlRouterProvider.otherwise('/app');
});
