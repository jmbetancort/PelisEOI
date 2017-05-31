(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('PopularityController', PopularityController);

    PopularityController.$inject = ['$scope','MovieDBFactory'];
    function PopularityController($scope,MovieDBFactory) {
        $scope.films = [];
        activate();

        ////////////////

        function activate() { 
            MovieDBFactory.getDiscover("popularity.desc")
            .then(function (response) {
                        $scope.films = response;
                    });
        }
    }
})();