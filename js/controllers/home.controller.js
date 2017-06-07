(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'MovieDBFactory','LocalFactory'];

    function HomeController($scope, MovieDBFactory,LocalFactory) {
        $scope.LocalFactory = LocalFactory;
        $scope.films = [];
        $scope.addFavourite = addFavourite;
        $scope.addSeeLater = addSeeLater;
        activate();

        ////////////////

        function activate() {
        }

        //////////////////////////
        function addFavourite(film){
            LocalFactory.addFavourites(film);
        }
        //////////////////////////
        function addSeeLater(film){
            LocalFactory.addSeeLater(film);
        }
    }
})();