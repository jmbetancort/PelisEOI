(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('MovieDBFactory', MovieDBFactory);

    MovieDBFactory.$inject = ['$http'];

    function MovieDBFactory($http) {
        var service = {
            getFilms: getFilms,
            filterFilms: filterFilms,
            searchFilm: searchFilm,
            getOneFilm: getOneFilm,
            getVideo: getVideo,
            getFilmsSimilares: getFilmsSimilares
        };

        return service;

        ////////////////
        function getFilms(mode,page) {
            return $http.get('https://api.themoviedb.org/3/movie/' + mode + '?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&page='+page+'&region=ES')
                .then(function (response) {
                    var totalpelis = response.data.total_results;
                    var totalpages = response.data.total_pages
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/NotImage.jpg",
                                name: element.title,
                                vote: element.vote_average
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.title,
                                vote: element.vote_average
                            })
                        }
                    })
                    return {
                        films: films,
                        totalPelis: totalpelis
                    }
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return {
                        films: [],
                        totalPelis: 0
                    }
                });
        }
        //////////////////////////////////////////////////////////
        function filterFilms(minDate, maxDate, minVote, maxVote, genres) {
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&region=ES&sort_by=primary_release_date.desc&include_adult=false&include_video=false&primary_release_date.gte=' + minDate + '&primary_release_date.lte=' + maxDate + '&vote_average.gte=' + minVote + '&vote_average.lte=' + maxVote + '&with_genres=' + genres)
                .then(function (response) {
                    var totalpelis = response.data.total_results;
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/NotImage.jpg",
                                name: element.title,
                                vote: element.vote_average,
                                year: (element.release_date.split("-")).splice(0, 1).join()
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.title,
                                vote: element.vote_average,
                                year: (element.release_date.split("-")).splice(0, 1).join()
                            })
                        }
                    })
                    return {
                        films: films,
                        totalPelis: totalpelis
                    }
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return {
                        films: [],
                        totalPelis: 0
                    }
                });
        }
        //////////////////////////////////////////////////////////
        function searchFilm(query) {
            return $http.get('https://api.themoviedb.org/3/search/movie?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&query=' + query + '&page=1&include_adult=false&region=ES')
                .then(function (response) {
                    var totalpelis = response.data.total_results;
                    var array = response.data.results;
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var films = [];
                    array.forEach(function (element, position) {
                        if (element.poster_path == null) {
                            films.push({
                                id: element.id,
                                poster: "img/NotImage.jpg",
                                name: element.title,
                                vote: element.vote_average,
                                year: (element.release_date.split("-")).splice(1, 2)
                            })
                        } else {
                            films.push({
                                id: element.id,
                                poster: baseURL + element.poster_path,
                                name: element.title,
                                vote: element.vote_average,
                                year: (element.release_date.split("-")).splice(1, 2)
                            })
                        }
                    })
                    return {
                        films: films,
                        totalPelis: totalpelis
                    }
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return {
                        films: [],
                        totalPelis: 0
                    }
                });
        }
        /////////////////////////////////////////////////////////////
        function getOneFilm(id) {
            return $http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es')
                .then(function (response) {
                    var film = {};
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    var title = response.data.title;
                    var idIMDB = response.data.imdb_id;
                    var genres = response.data.genres;
                    if (response.data.poster_path == null) {
                        var poster = "img/NotImage.jpg";
                    } else {
                        var poster = baseURL + response.data.poster_path;
                    }
                    if (response.data.production_companies == []) {
                        var company = "";
                    } else {
                        var company = response.data.production_companies;
                    }
                    var descrip = response.data.overview;
                    if (descrip != '' && descrip != null) {
                        descrip = puntofinal(descrip);
                    }
                    film = {
                        title: title,
                        idIMDB: idIMDB,
                        poster: poster,
                        genres: genres,
                        descrip: descrip,
                        company: company
                    }
                    return film
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return {}
                })
        }
        /////////////////////////////////////////////////////////
        function puntofinal(descripcion) {
            var array = descripcion.split("");
            if (array[(array.length) - 1] != ".") {
                array.splice(array.length, 0, ".");
            }
            return array.join("");
        }
        ////////////////////////////////////////////////////////////
        function getVideo(id, ln) {
            return $http.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=' + ln)
                .then(function (response) {
                    if (response.data.results.length > 0) {
                        return response.data.results[0];
                    } else {
                        return null;
                    }
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return null;
                })
        }
        //////////////////////////////////////////////////////////////////
        function getFilmsSimilares(id) {
            return $http.get('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=daf9a865f58518b9a01a5ebc5ba0b252&language=es&page=1')
                .then(function (response) {
                    var filmSimilares = [];
                    var baseURL = 'https://image.tmdb.org/t/p/w500';
                    if (response.data.results.length > 0) {
                        var nums = limit(response.data.results.length);
                        nums.forEach(function (element, position) {
                            if (response.data.results[element].poster_path == null) {
                                filmSimilares.push({
                                    poster: "img/NotImage.jpg",
                                    title: response.data.results[element].title,
                                    id: response.data.results[element].id
                                })
                            } else {
                                filmSimilares.push({
                                    poster: baseURL + response.data.results[element].poster_path,
                                    title: response.data.results[element].title,
                                    id: response.data.results[element].id
                                })
                            }
                        })
                        return filmSimilares
                    } else {
                        return [];
                    }
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return [];
                })
        }
        ////////////////////////////////////////////////////////////////////
        function limit(size) {
            var array = [];
            if (size <= 4) {
                for(var i = 0; i < size; i++){
                    array.push(i);
                }
                return array
            } else {
                array=[0,1,2,3]
                return array;
            }
        }
    }
})();