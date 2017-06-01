(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('GenresFactory', GenresFactory);

    GenresFactory.$inject = ['$http'];

    function GenresFactory($http) {
        var service = {
            getAll: getAll
        };

        return service;

        ////////////////
        function getAll() {
            return $http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es')
                .then(function (response) {
                    var array = response.data.genres;
                    var genres = [];
                    array.forEach(function (element, position) {
                        if (element.name == 'película de la televisión') {
                            genres.push({
                                id: element.id,
                                name: 'Película TV',
                                option: ''
                            })
                        } else {
                            genres.push({
                                id: element.id,
                                name: element.name,
                                option: ''
                            })
                        }
                    })
                    return genres;
                }, function (error) {
                    alert("Fallo en la obtención de los géneros");
                    return [];
                });
        }
    }
})();