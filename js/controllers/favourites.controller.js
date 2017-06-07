(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('FavouritesController', FavouritesController);

    FavouritesController.$inject = ['$scope','LocalFactory'];
    function FavouritesController($scope, LocalFactory) {
        $scope.LocalFactory = LocalFactory;
        $scope.filmsFav = [];
        $scope.deleteFilm = deleteFilm;
        activate();

        ////////////////

        function activate() {
            document.querySelector('.ocultAside').style.visibility = "visible";
            $scope.filmsFav = LocalFactory.getFavourites();
         }
         ///////////////
         function deleteFilm(film){
            LocalFactory.deleteFavourites(film);
            $scope.filmsFav = LocalFactory.getFavourites();
         }
    }
})();