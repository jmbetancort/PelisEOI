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
            if ('ControlModal' in localStorage){
                return parseInt(localStorage.getItem('Controlmodal'));
            } else {
                return 0;
            }
            
        }
        ////////////////
        function modify(numero){
            var num = numero + 1;
            localStorage.setItem('ControlModal', num);
            console.log(parseInt(localStorage.getItem('Controlmodal')))
            return parseInt(localStorage.getItem('Controlmodal'));
        }
        ////////////////
        function reset(){
            var num = 0;
            localStorage.setItem('ControlModal', num);
        }
    }
})();