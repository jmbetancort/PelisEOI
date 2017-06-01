(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('RecentController', RecentController);

    RecentController.$inject = ['$scope','MovieDBFactory'];
    function RecentController($scope,MovieDBFactory) {
        $scope.films = [];
        activate();

        ////////////////

        function activate() { 
            MovieDBFactory.getFilms('now_playing')
            .then(function (response) {
                        $scope.films = response;
                    });
        }
    }
})();