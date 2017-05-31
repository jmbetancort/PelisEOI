(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('MovieDBFactory', MovieDBFactory);

    MovieDBFactory.$inject = ['$http'];

    function MovieDBFactory($http) {
        var service = {
            getDiscover: getDiscover,
            getRecent: getRecent
        };

        return service;

        ////////////////
        function getDiscover(sortby) {
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&sort_by='+sortby+'&include_adult=false&include_video=false&page=1')
                .then(function (response) {
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/NotImage.jpg",
                                name: element.original_title
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.original_title
                            })
                        }
                    })
                    return films;

                }, function (error) {
                    alert("Failed search performed!");
                    return [];
                });
        }

        function getRecent() {
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&sort_by=release_date.desc&include_adult=false&include_video=false&page=1')
                .then(function (response) {
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/proximamente.png",
                                name: element.original_title
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.original_title
                            })
                        }
                    })
                    return films;

                }, function (error) {
                    alert("Failed search performed!");
                    return [];
                });
        }
    }
})();