(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'GenresFactory', 'MovieDBFactory'];

    function MainController($scope, GenresFactory, MovieDBFactory) {
        var Main = this;
        Main.slider = {
            minValue: 1975,
            maxValue: 2017,
            options: {
                floor: 1975,
                ceil: 2017,
                step: 1,
                noSwitching: true
            }
        };
        Main.slider1 = {
            minValue: 0,
            maxValue: 10,
            options: {
                floor: 0,
                ceil: 10,
                step: 1,
                noSwitching: true
            }
        };
        Main.GenresFactory = GenresFactory;
        Main.MovieDBFactory = MovieDBFactory;
        Main.genres = [];
        Main.optionSelect = optionSelect;
        Main.btnSelects = [];
        Main.resetFilter = resetFilter;
        Main.filter = filter;
        Main.visibleAside = visibleAside;
        Main.search = search;
        Main.films = [];
        Main.totalPelis = 0;
        Main.page = 0;
        Main.incremento = 0;
        activate();

        ////////////////

        function activate() {
            Main.incremento = 18;
            Main.page = 1;
            visibleAside();
            GenresFactory.getAll()
                .then(function (response) {
                    Main.genres = response;
                })
            MovieDBFactory.filterFilms(Main.slider.minValue, Main.slider.maxValue, Main.slider1.minValue, Main.slider1.maxValue, Main.btnSelects.join("2%C"), Main.page)
                .then(function (response) {
                    Main.films = response.films;
                    Main.totalPelis = response.totalPelis;
                })

        }
        ///////////////////////////////////////////////////////////////////////
        $scope.$watch("Main.slider.maxValue", function (value) {
            var max;
            if (Main.slider.maxValue > 2000) {
                max = Main.slider.maxValue - 2000;
                if (max < 10) {
                    max = '0' + max;
                }
            } else {
                max = Main.slider.maxValue - 1900;
            }
            document.querySelector('.rz-pointer-max').innerHTML = max;
            Main.page = 1;
            filter();
        })
        $scope.$watch("Main.slider.minValue", function (value) {
            var min;
            if (Main.slider.minValue > 2000) {
                min = Main.slider.minValue - 2000;
                if (min < 10) {
                    min = '0' + min;
                }
            } else {
                min = Main.slider.minValue - 1900;
            }
            document.querySelector('.rz-pointer-min').innerHTML = min;
            Main.page = 1;
            filter();
        })
        ///////////////////////////////////////////////////////////////////////
        $scope.$watch("Main.slider1.maxValue", function (value) {
            var max = Main.slider1.maxValue;
            document.querySelector('#valorationSlider > .rz-pointer-max').innerHTML = max;
            Main.page = 1;
            filter();
        })
        $scope.$watch("Main.slider1.minValue", function (value) {
            var min = Main.slider1.minValue;
            document.querySelector('#valorationSlider  span.rz-pointer.rz-pointer-min').innerHTML = min;
            Main.page = 1;
            filter();
        })
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
                        Main.films = response.films;
                        Main.totalPelis = response.totalPelis;
                    })
            } else if (nameFilm == "") {
                filter();
            }
        }
        //////////////////////////////////////////////////////////////////
        function optionSelect(genre) {
            if (genre.option == '') {
                genre.option = genre.name;
                Main.btnSelects.push(genre.id);
            } else if (genre.option == genre.name) {
                genre.option = '';
                Main.btnSelects.forEach(function (element, position) {
                    if (element == genre.id) {
                        Main.btnSelects.splice(position, 1);
                    }
                })
            }
            filter();
        }
        ///////////////////////////////////////////////////////////////
        function resetFilter() {
            Main.slider.minValue = 1975;
            Main.slider.maxValue = 2017;
            Main.slider1.minValue = 0;
            Main.slider1.maxValue = 10;
            Main.page = 1;
            Main.genres.forEach(function (element, position) {
                element.option = "";
            })
            Main.btnSelects = [];
        }
        /////////////////////////////////////////////////////////////////
        function filter() {
            MovieDBFactory.filterFilms(Main.slider.minValue, Main.slider.maxValue, Main.slider1.minValue, Main.slider1.maxValue, Main.btnSelects.join(), Main.page)
                .then(function (response) {
                    Main.films = response.films;
                    Main.totalPelis = response.totalPelis;
                })
        }
        //////////////////////////////////////////////////////////////////
        function visibleAside() {
            document.querySelector('.ocultAside').style.visibility = "hidden";
        }
    }
})();