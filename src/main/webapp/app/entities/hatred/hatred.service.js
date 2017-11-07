(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('Hatred', Hatred);

    Hatred.$inject = ['$resource', 'DateUtils'];

    function Hatred ($resource, DateUtils) {
        var resourceUrl =  'api/hatreds/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
