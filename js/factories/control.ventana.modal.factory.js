(function() {
'use strict';

    angular
        .module('JMAPP')
        .factory('ControlModalFactory', ControlModalFactory);

    ControlModalFactory.$inject = [];
    function ControlModalFactory() {
        var service = {
            get: get,
            modify: modify,
            reset: reset
        };
        
        return service;

        ////////////////
        function get() { 
            if ('controlModal' in localStorage){
                console.log(localStorage.getItem('Controlmodal'))
                return parseInt(localStorage.getItem('Controlmodal'));
            } else {
                return 0;
            }
            
        }
        ////////////////
        function modify(numero){
            var num = numero + 1;
            console.log(num);
            localStorage.setItem('controlModal', num);
            return parseInt(localStorage.getItem('Controlmodal'));
        }
        ////////////////
        function reset(){
            var num = 0;
            localStorage.setItem('controlModal', num);
            console.log( localStorage.getItem('Controlmodal'));
        }
    }
})();