(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('OpenSubtitlesFactory', OpenSubtitlesFactory);

    OpenSubtitlesFactory.$inject = ['$http'];

    function OpenSubtitlesFactory($http) {
        var service = {
            getSubtitles: getSubtitles
        };

        return service;

        ////////////////
        function getSubtitles(id) {
            var subtitles = {};
            const OS = require('opensubtitles-api');
            const OpenSubtitles = new OS({
                useragent: 'OSTestUserAgentTemp',
                username: 'jm25',
                password: 'Josemiguel92',
                ssl: true
            });
            OpenSubtitles.login()
                .then(res => {
                })
                .catch(err => {
                    alert("Error al conectar con Opensubtitles!")
                });
            return OpenSubtitles.search({'imdbid' : id,'limit' : 'best', 'sublanguageid': 'en,es'})
                .then(res => {
                    subtitles = {
                        es: res.es,
                        en: res.en,
                        de: res.de
                    }
                    return subtitles;
                })
        }
    }
})();