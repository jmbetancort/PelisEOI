(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope','GenresFactory'];

    function MainController($scope, GenresFactory) {
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
        Main.GenresFactory = GenresFactory;
        Main.genres = [];
        Main.optionSelect = optionSelect;
        Main.btnSelects = [];
        Main.resetFilter = resetFilter;
        activate();

        ////////////////

        function activate() {
            GenresFactory.getAll()
            .then(function(response){
                Main.genres = response;
            })
        }
        ///////////////////////////////////////////////////////////////////////
        $scope.$watch("Main.slider.maxValue",function(value){
            var max;
            if(Main.slider.maxValue>2000){
                max = Main.slider.maxValue - 2000;
            } else{
                max = Main.slider.maxValue - 1900;
            }
            document.querySelector('.rz-pointer-max').innerHTML = max;
        })
                $scope.$watch("Main.slider.minValue",function(value){
            var min;
            if(Main.slider.minValue>2000){
                min = Main.slider.minValue - 2000;
            } else{
                min = Main.slider.minValue - 1900;
            }
            document.querySelector('.rz-pointer-min').innerHTML = min;
        })
        //////////////////////////////////////////////////////////////////
        function optionSelect(genre){
            if(genre.option == ''){
                genre.option = genre.name;
                Main.btnSelects.push(genre.name);
            } else if(genre.option == genre.name){
                genre.option = "";
                Main.btnSelects.forEach(function(element,position){
                    if(element == genre.name){
                        Main.btnSelects.splice(position,1);
                    }
                })
            }
        }
        ///////////////////////////////////////////////////////////////
        function resetFilter(){
            Main.slider.minValue = 1975;
            Main.slider.maxValue = 2017;
            Main.genres.forEach(function(element,position){
                element.option = "";
            })
            Main.btnSelects = [];
        }
    }
})();