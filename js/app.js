(function() {
    'use strict';

    angular.module('JMAPP', ['ngRoute']).config(config);
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/",{
                controller: 'HomeController',
                templateUrl: 'views/home.html',
                controllerAs: 'Home'
            })
            .when("/individual.html",{
                controller: 'IndividualController',
                templateUrl: 'views/individual.html'
            })
            .otherwise( { redirectTo: "/"});
    }
})();