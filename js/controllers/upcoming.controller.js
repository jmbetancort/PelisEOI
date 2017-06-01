(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('UpcomingController', UpcomingController);

    UpcomingController.$inject = ['$scope','MovieDBFactory'];
    function UpcomingController($scope,MovieDBFactory) {
        $scope.films = [];
        activate();

        ////////////////

        function activate() { 
            MovieDBFactory.getFilms('upcoming')
            .then(function (response) {
                        $scope.films = response;
                    });
        }
    }
})();