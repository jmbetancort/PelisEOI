(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('FilmsRecentController', FilmsRecentController);

    FilmsRecentController.$inject = ['$scope','MovieDBFactory'];
    function FilmsRecentController($scope,MovieDBFactory) {
        $scope.films = [];
        activate();

        ////////////////

        function activate() { 
            MovieDBFactory.getRecent()
            .then(function (response) {
                        $scope.films = response;
                    });
        }
    }
})();