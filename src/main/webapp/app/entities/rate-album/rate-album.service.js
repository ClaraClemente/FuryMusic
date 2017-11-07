(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('RateAlbum', RateAlbum);

    RateAlbum.$inject = ['$resource', 'DateUtils'];

    function RateAlbum ($resource, DateUtils) {
        var resourceUrl =  'api/rate-albums/:id';

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
