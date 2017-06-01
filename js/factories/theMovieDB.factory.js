(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('MovieDBFactory', MovieDBFactory);

    MovieDBFactory.$inject = ['$http'];

    function MovieDBFactory($http) {
        var service = {
            getFilms: getFilms
        };

        return service;

        ////////////////
        function getFilms(mode) {
            return $http.get('https://api.themoviedb.org/3/movie/'+mode+'?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&page=1&region=ES')
                .then(function (response) {
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/NotImage.jpg",
                                name: element.title
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.title
                            })
                        }
                    })
                    return films;
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return [];
                });
        }
    }
})();