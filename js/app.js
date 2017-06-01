(function() {
    'use strict';

    angular.module('JMAPP', ['ngRoute' , 'rzModule']).config(config);
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
            .when("/upcoming.html",{
                controller: 'UpcomingController',
                templateUrl: 'views/upcoming.html'
            })
            .when("/recents.html",{
                controller: 'RecentController',
                templateUrl: 'views/recents.html'
            })
            .otherwise( { redirectTo: "/"});
    }
})();