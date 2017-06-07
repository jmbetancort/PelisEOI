(function() {
    'use strict';

    angular.module('JMAPP', ['ngRoute' , 'rzModule']).config(config);
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("PelisEOI/",{
                controller: 'HomeController',
                templateUrl: 'views/home.html'
            })
            .when("/individual/:id",{
                controller: 'IndividualController',
                templateUrl: 'views/individual.html'
            })
            .when("/upcoming",{
                controller: 'UpcomingController',
                templateUrl: 'views/upcoming.html'
            })
            .when("PelisEOI/recents",{
                controller: 'RecentController',
                templateUrl: 'views/recents.html'
            })
            .when("/favourites",{
                controller: 'FavouritesController',
                templateUrl: 'views/favourites.html'
            })
            .when("/seeLater",{
                controller: 'SeeLaterController',
                templateUrl: 'views/seeLater.html'
            })
            .otherwise( { redirectTo: "/"});
    }
})();