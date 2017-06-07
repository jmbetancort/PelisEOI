(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('SeeLaterController', SeeLaterController);

    SeeLaterController.$inject = ['$scope','LocalFactory'];
    function SeeLaterController($scope,LocalFactory) {
        $scope.LocalFactory = LocalFactory;
        $scope.filmsSeeLater = [];
        $scope.deleteFilm = deleteFilm
        activate();

        ////////////////

        function activate() {
            document.querySelector('.ocultAside').style.visibility = "visible";
            $scope.filmsSeeLater = LocalFactory.getSeeLater();
         }
         ///////////////
         function deleteFilm(film){
            LocalFactory.deleteSeeLater(film);
            $scope.filmsSeeLater = LocalFactory.getSeeLater();
         }
    }
})();