(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('RecentController', RecentController);

    RecentController.$inject = ['$scope', 'MovieDBFactory', 'LocalFactory'];

    function RecentController($scope, MovieDBFactory, LocalFactory) {
        $scope.films = [];
        $scope.totalPelis = 0;
        $scope.LocalFactory = LocalFactory;
        $scope.addFavourite = addFavourite;
        $scope.addSeeLater = addSeeLater;
        activate();

        ////////////////

        function activate() {
            document.querySelector('.ocultAside').style.visibility = "visible";
            MovieDBFactory.getFilms('now_playing')
                .then(function (response) {
                    $scope.films = response.films;
                    $scope.totalPelis = response.totalPelis;
                });
        }
        ///////////////////////////////////////////////////////////////////////
        $scope.$watch("Main.nameFilm", function (value) {
            if (value != undefined) {
                search(value);
            }
        })
        //////////////////////////////////////////////////////////////////
        function search(nameFilm) {
            if (nameFilm != "") {
                var query = nameFilm.split("");
                for (var i = 0; i < query.length; i++) {
                    if (query[i] == " ") {
                        query[i] = "%20";
                    }
                }
                query = query.join("");
                MovieDBFactory.searchFilm(query)
                    .then(function (response) {
                        $scope.films = response.films;
                        $scope.totalPelis = response.totalPelis;
                    })
            } else if (nameFilm == "") {
                MovieDBFactory.getFilms('now_playing')
                    .then(function (response) {
                        $scope.films = response.films;
                        $scope.totalPelis = response.totalPelis;
                    });
            }
        }
        //////////////////////////
        function addFavourite(film) {
            LocalFactory.addFavourites(film);
        }
        //////////////////////////
        function addSeeLater(film) {
            LocalFactory.addSeeLater(film);
        }
    }
})();