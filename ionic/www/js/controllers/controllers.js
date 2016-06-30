angular.module('fastWeather.controllers', [])

.controller('AppController', function () {



})

.controller('HomeController', ['$scope', '$http', 'weatherFactory', function ($scope, $http, weatherFactory) {    

    $scope.activeUnit = function() {
        $scope.isCelActive = !$scope.isCelActive;
        $scope.isFahActive = !$scope.isFahActive;
    }

    $scope.onSwipeRefresh = function() {
        $scope.mainFunc();
    }

    $scope.mainFunc = function() {

        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var date = new Date();

        $scope.loadingTemp = true;

        $scope.isCelActive = false;
        $scope.isFahActive = false;

        $scope.wDay = dayNames[date.getDay()];
        $scope.month = monthNames[date.getMonth()];
        $scope.mDay = date.getUTCDate();

        $scope.hr = ('0' + date.getHours()).substr(-2);
        $scope.min = ('0' + date.getMinutes()).substr(-2);

        $scope.error = false;

        $scope.partOfDay = function() {
            var hours = date.getHours();

            if (hours < 6 || hours >= 21) {
                return 'night';
            } else {
                return 'day';
            }
        }

        weatherFactory.getLocation().success(function(data) {

            $scope.loadingTemp = false;

            if (data.status === 'fail') {
                $scope.error = data.message;
                return false;
            }
            
            $scope.loadingTemp = true;

            $scope.city = data.city + ', ';
            $scope.country = data.country;

            weatherFactory.getWeather($scope.city + $scope.country).success(function(data) {

                $scope.loadingTemp = false;

                if (data.cod !== 200) {
                    $scope.error = data.message;
                    return false;
                }

                $scope.isCelActive = true;

                var temp = data.main.temp;

                $scope.tempCel = Math.round(temp);
                $scope.unitCel = 'C';
                $scope.tempFah = Math.round( (temp * 9)/5 + 32 );
                $scope.unitFah = 'F';
                $scope.weather = data.weather[0].main;

                $scope.humidity = data.main.humidity + ' %';
                $scope.wind = data.wind.speed + ' m/s';

                var sunset = new Date(data.sys.sunset * 1000);
                $scope.sunset = sunset.getHours() + ':' + sunset.getMinutes();

                var sunrise = new Date(data.sys.sunrise * 1000);
                $scope.sunrise = sunrise.getHours() + ':' + sunrise.getMinutes();

            }).error(function(data, status) {

                alert('error 2: ' + data + ', ' + status);

            });

        }).error(function(data, status) {

            alert('error 1: ' + data + ', ' + status);

        });

    };

    $scope.mainFunc();

}]);