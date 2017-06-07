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
                return parseInt(localStorage.getItem('ControlModal'));
            } else {
                return 0;
            }
            
        }
        ////////////////
        function modify(numero){
            var num = numero + 1;
            localStorage.setItem('ControlModal', num);
            return parseInt(localStorage.getItem('ControlModal'));
        }
        ////////////////
        function reset(){
            var num = 0;
            localStorage.setItem('ControlModal', num);
        }
    }
})();