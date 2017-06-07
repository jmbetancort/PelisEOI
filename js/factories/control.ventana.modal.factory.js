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
                return JSON.parseInt(localStorage.getItem('Controlmodal'));
            } else {
                return 0;
            }
            
        }
        ////////////////
        function modify(numero){
            var num = numero + 1;
            console.log(num);
            localStorage.setItem('controlModal', JSON.stringify(num));
            return JSON.parseInt(localStorage.getItem('Controlmodal'));
        }
        ////////////////
        function reset(){
            var num = 0;
            localStorage.setItem('controlModal', JSON.stringify(num));
            console.log(JSON.parseInt(localStorage.getItem('Controlmodal')));
        }
    }
})();