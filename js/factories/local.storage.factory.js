(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('LocalFactory', LocalFactory);

    LocalFactory.$inject = [];

    function LocalFactory() {
        var service = {
            getFavourites: getFavourites,
            getSeeLater: getSeeLater,
            addFavourites: addFavourites,
            addSeeLater: addSeeLater,
            deleteFavourites: deleteFavourites,
            deleteSeeLater: deleteSeeLater
        };

        return service;

        ////////////////
        function getFavourites() {
            if ('favourites' in localStorage) {
                return JSON.parse(localStorage.getItem('favourites'));
            } else {
                return [];
            }
        }
        ////////////////
        function getSeeLater() {
            if ('seeLater' in localStorage) {
                return JSON.parse(localStorage.getItem('seeLater'));
            } else {
                return [];
            }
        }
        ////////////////
        function addFavourites(film) {
            var films = getFavourites();
            var flag = true;
            films.forEach(function (element, position) {
                if (element.id == film.id) {
                    alert("Esta Película ya esta en Favoritos!");
                    flag = false;
                }
            })
            if (flag == true) {
                films.push(film);
            }
            localStorage.setItem('favourites', JSON.stringify(films));
        }
        ////////////////
        function addSeeLater(film) {
            var films = getSeeLater();
            var flag = true;
            films.forEach(function (element, position) {
                if (element.id == film.id) {
                    alert("Esta Película ya esta en ver luego!");
                    flag = false;
                }
            })
            if (flag == true) {
                films.push(film);
            }
            localStorage.setItem('seeLater', JSON.stringify(films));
        }
        ////////////////
        function deleteFavourites(film) {
            var films = getFavourites();
            films.forEach(function (element, position) {
                if (element.id == film.id) {
                    var isSure = confirm('¿Seguro que quieres borrar esta película de favoritos?');
                    if (isSure == true) {
                        films.splice(position,1);
                    }
                }
            })
            localStorage.setItem('favourites', JSON.stringify(films));
        }
        ////////////////
        function deleteSeeLater(film) {
            var films = getSeeLater();
            films.forEach(function (element, position) {
                if (element.id == film.id) {
                    var isSure = confirm('¿Seguro que quieres borrar esta película de ver luego?');
                    if (isSure == true) {
                        films.splice(position,1);
                    }
                }
            })
            localStorage.setItem('seeLater', JSON.stringify(films));
        }
    }
})();