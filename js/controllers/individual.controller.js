(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('IndividualController', IndividualController);

    IndividualController.$inject = ['$scope', '$routeParams', 'MovieDBFactory', 'omdbFactory', '$sce', 'OpenSubtitlesFactory','ControlModalFactory'];

    function IndividualController($scope, $routeParams, MovieDBFactory, omdbFactory, $sce, OpenSubtitlesFactory, ControlModalFactory) {
        $scope.close = close;
        $scope.MovieDBFactory = MovieDBFactory;
        $scope.omdbFactory = omdbFactory;
        $scope.OpenSubtitlesFactory = OpenSubtitlesFactory;
        $scope.ControlModalFactory = ControlModalFactory;
        $scope.film = {};
        $scope.video = false;
        $scope.existingSimilar = false;
        $scope.limitCharacters = limitCharacters;
        $scope.subtitles = {};
        $scope.modal = 0;
        activate();

        ////////////////

        function activate() {
            $scope.modal = parseInt(ControlModalFactory.get());
            console.log($scope.modal);
            $scope.modal = ControlModalFactory.modify($scope.modal);
            console.log($scope.modal);
            document.querySelector('body').style.overflow = "hidden";
            $scope.video = false;
            MovieDBFactory.getOneFilm($routeParams.id)
                .then(function (response) {
                    $scope.film = response;
                    $scope.film.descrip = limitCharacters($scope.film.descrip);
                    omdbFactory.getMovieData($scope.film.idIMDB)
                        .then(function (response) {
                            $scope.film.runtime = response.runtime;
                            $scope.film.year = response.year;
                            $scope.film.imdbRating = response.imdbRating;
                            $scope.film.rottenTomatoes = response.rottenTomatoes;
                            $scope.film.metascore = response.metascore;
                        })
                    OpenSubtitlesFactory.getSubtitles($scope.film.idIMDB)
                        .then(function (response) {
                            $scope.subtitles = response;
                        })
                });
            MovieDBFactory.getVideo($routeParams.id, 'es')
                .then(function (response) {
                    if (response != null) {
                        $scope.video = true;
                        var baseURL = "https://www.youtube.com/embed/"
                        $scope.film.video = $sce.trustAsResourceUrl(baseURL + response.key);
                    } else {
                        MovieDBFactory.getVideo($routeParams.id, 'en-US')
                            .then(function (response) {
                                if (response != null) {
                                    $scope.video = true;
                                    var baseURL = "https://www.youtube.com/embed/"
                                    $scope.film.video = $sce.trustAsResourceUrl(baseURL + response.key);
                                }
                            })
                    }
                })
            MovieDBFactory.getFilmsSimilares($routeParams.id)
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.similares = response;
                        $scope.existingSimilar = true;
                    } else {
                        $scope.similares = response;
                        $scope.existingSimilar = false;
                    }
                })


        }
        /////////////////
        function limitCharacters(text) {
            if (text != '' && text != null) {
                var array = text.split("");
                if (array.length > 500) {
                    array.splice(450, array.length);
                    array = array.join("") + "...";
                    return array;
                } else { 
                    return text
                }
            } else {
                return ""
            }
        }
        ////////////////
        function close() {
            window.history.go(-($scope.modal));
            document.querySelector('body').style.overflow = "visible";
            ControlModalFactory.reset();
        }
    }
})();