(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('UpcomingController', UpcomingController);

    UpcomingController.$inject = ['$scope', 'MovieDBFactory', 'LocalFactory'];

    function UpcomingController($scope, MovieDBFactory, LocalFactory) {
        $scope.films = [];
        $scope.filmsMostrar = [];
        $scope.totalPelis = 0;
        $scope.totalpages = 0;
        $scope.page = 0;
        $scope.incremento = 0;
        $scope.LocalFactory = LocalFactory;
        $scope.addFavourite = addFavourite;
        $scope.addSeeLater = addSeeLater;
        $scope.cargarPelis = cargarPelis;
        activate();
        ////////////////

        function activate() {
            $scope.incremento = 17;
            $scope.page = 1;
            document.querySelector('.ocultAside').style.visibility = "visible";
            MovieDBFactory.getFilms('upcoming',$scope.page)
                .then(function (response) {
                    $scope.films = response.films;
                    for(var i=0;i<18;i++){
                        $scope.filmsMostrar.push($scope.films[i]);
                    }
                    $scope.totalPelis = response.totalPelis;
                    $scope.totalpages = response.totalpages;
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
        //////////////////////////
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                cargarPelis();
            }
        });
        ///////////////////////////
        function cargarPelis(){
            if ($scope.page < $scope.totalpages){
                $scope.page = $scope.page + 1;
                MovieDBFactory.getFilms('upcoming',$scope.page)
                .then(function (response) {
                    $scope.films.push(response.films);
                    var dif = $scope.films.length - $scope.filmsMostrar.length;
                    if(dif <= 18){
                        $scope.filmsMostrar = $scope.films;
                    } else {
                        for(var i= $scope.incremento; i < $scope.incremento + 18; i++){
                            $scope.filmsMostrar.push($scope.films[i]);
                        }
                        $scope.incremento = $scope.incremento + 18;
                    }
                });
            }
        }
    }
})();