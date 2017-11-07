(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteAlbum', FavouriteAlbum);

    FavouriteAlbum.$inject = ['$resource', 'DateUtils'];

    function FavouriteAlbum ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-albums/:id';

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
