// Module
var weatherCast = angular.module('weatherCast', ['ngRoute','ngResource']);

// Controllers

    // Home Page

weatherCast.controller('homeController', ['$scope','locationService', function ($scope, locationService) {

    $scope.location = locationService.location;
    
    $scope.$watch('location', function() {
        locationService.location = $scope.location;
    });
    
}]);

    // Weather Page

weatherCast.controller('weatherController', ['$scope','$resource','$routeParams','locationService','weatherService', function ($scope,$resource,$routeParams,locationService,weatherService) {
    // Access location input
    $scope.location = locationService.location;
    
    // Set days option
    $scope.days = $routeParams.days || 2;
    
    // Access Map Data
    $scope.weatherResult = weatherService.GetWeather($scope.location,$scope.days);
    
//    // Access Map Data
//    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=2d9ab78ceb9b3eaea815f2177f6d758d', {callback: "JSON_CALLBACK"}, {get: {method: 'JSONP'}});
//    
//    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.location, cnt:$scope.days});
    
    // Date Formatting
    $scope.toDate = function(date) {
        var myDate = new Date(date*1000);
        return myDate.toDateString();
    };
    
    // Temperature Formatting
    $scope.toF = function(k) {
        return Math.round(((1.8 * (k-273)) + 32)*10)/10; 
    };
    
    $scope.toC = function(k) {
        return Math.round((k - 273.15)*10)/10;
    };
    
    // Get Key Name of json item
    $scope.time = function(time) {
        return Object.keys(time)[0].toUpperCase();
    };
    
    
}]);

// Directive

weatherCast.directive('weatherResult', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherResult.html',
        replace: true,
        
    };
});

// Routing

weatherCast.config(function($routeProvider) {
    
    $routeProvider
    
    // Conditions
    
    .when('/', {
        templateUrl: '/pages/home.html',
        controller: 'homeController'
    })
    
    
    .when('/weather', {
        templateUrl: '/pages/weather.html',
        controller: 'weatherController'
    })
    
    .when('/weather/:days', {
        templateUrl: '/pages/weather.html',
        controller: 'weatherController'
    })
});

// Services

weatherCast.service('locationService', function() {
    
    this.location = "Bloomington, IN";

});

// get data from weather api 

weatherCast.service('weatherService', ['$resource', function($resource) {
    this.GetWeather = function(location, days) {
        // Access Map Data
    var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=2d9ab78ceb9b3eaea815f2177f6d758d', {callback: "JSON_CALLBACK"}, {get: {method: 'JSONP'}});
    
    return weatherAPI.get({q:location, cnt:days});
    }
}]);