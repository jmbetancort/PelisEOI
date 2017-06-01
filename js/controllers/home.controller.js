(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','MovieDBFactory'];
    function HomeController($scope,MovieDBFactory) {
        /*var Home = this;
        Home.films = [];
        Home.postersFilms = [];*/
        $scope.films = [];
        activate();

        ////////////////

        function activate() { 
            MovieDBFactory.getFilms('popular')
            .then(function (response) {
                        $scope.films = response;
                    });
        }
    }
})();