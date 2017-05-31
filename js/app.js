(function() {
    'use strict';

    angular.module('JMAPP', ['ngRoute']).config(config);
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/",{
                controller: 'HomeController',
                templateUrl: 'views/home.html'
            })
            .when("/individual.html",{
                controller: 'IndividualController',
                templateUrl: 'views/individual.html'
            })
            .when("/recentsFilms.html",{
                controller: 'FilmsRecentController',
                templateUrl: 'views/recentsFilms.html'
            })
            .when("/popularity.html",{
                controller: 'PopularityController',
                templateUrl: 'views/popularity.html'
            })
            .otherwise( { redirectTo: "/"});
    }
})();