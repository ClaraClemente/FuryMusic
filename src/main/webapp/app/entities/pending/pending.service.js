(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('Pending', Pending);

    Pending.$inject = ['$resource', 'DateUtils'];

    function Pending ($resource, DateUtils) {
        var resourceUrl =  'api/pendings/:id';

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
