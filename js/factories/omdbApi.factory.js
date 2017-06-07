(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('omdbFactory', omdbFactory);

    omdbFactory.$inject = ['$http'];

    function omdbFactory($http) {
        var service = {
            getMovieData: getMovieData
        };

        return service;

        ////////////////
        function getMovieData(idIMDB) {
            return $http.get('https://www.omdbapi.com/?apikey=3370463f&i=' + idIMDB)
                .then(function (response) {
                    var data = {};
                    if (response.data.Runtime == 'N/A' || response.data.Runtime == 0) {
                        var runtime = "-----"
                    } else {
                        var runtime = parseInt(response.data.Runtime);
                        runtime = tiempo(runtime);
                    }
                    var year = response.data.Year;
                    if (response.data.Metascore == "N/A") {
                        var metascore = "--";
                    } else {
                        var metascore = response.data.Metascore;
                    }
                    if (response.data.imdbRating == "N/A") {
                        var imdbRating = "-";
                    } else {
                        var imdbRating = response.data.imdbRating;
                    }
                    var rottenTomatoes = "--%";
                    var array = response.data.Ratings;
                    if (array.length > 0) {
                        array.forEach(function (element, position) {
                            if (element.Source == "Rotten Tomatoes") {
                                rottenTomatoes = element.Value;
                            }
                        })
                    }
                    data = {
                        runtime: runtime,
                        year: year,
                        imdbRating: imdbRating,
                        rottenTomatoes: rottenTomatoes,
                        metascore: metascore
                    }
                    return data;
                }, function (error) {
                    alert("Fallo en la búsqueda");
                    return {}
                })
        }
        ////////////////////////////////////////////////////////
        function tiempo(valor) {
            var horas = 0;
            var minutos = 0;
            while (valor > 60) {
                horas = horas + 1;
                valor = valor - 60;
                minutos = parseInt(valor);
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            var tiempo = horas + 'h' + minutos + 'm';
            return tiempo;
        }
    }
})();