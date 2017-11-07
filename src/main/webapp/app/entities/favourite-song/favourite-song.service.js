(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteSong', FavouriteSong);

    FavouriteSong.$inject = ['$resource', 'DateUtils'];

    function FavouriteSong ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-songs/:id';

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
