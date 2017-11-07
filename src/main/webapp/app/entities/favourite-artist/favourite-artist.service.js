(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteArtist', FavouriteArtist);

    FavouriteArtist.$inject = ['$resource', 'DateUtils'];

    function FavouriteArtist ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-artists/:id';

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
