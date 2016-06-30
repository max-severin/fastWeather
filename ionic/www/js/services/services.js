'use strict';

angular.module('fastWeather.services',[])
.factory('weatherFactory', ['$http', function ($http) {

    return {
        getLocation: function () {
            return $http({
				url: 'http://ip-api.com/json/', 
				method: 'JSONP',
				params: { 'callback': 'JSON_CALLBACK' }
			});
        },
        getWeather: function (cityAndCountry) {
   			return $http({
				url: 'http://api.openweathermap.org/data/2.5/weather/', 
				method: 'JSONP',
				params: { 'q': cityAndCountry, 'units': 'metric', 'APPID': '7ca4e1a9f44078b82364bb580812149f', 'callback': 'JSON_CALLBACK' }
			});
        }
    };

}]);
