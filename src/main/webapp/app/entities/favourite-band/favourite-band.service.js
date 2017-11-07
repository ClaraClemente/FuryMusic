(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteBand', FavouriteBand);

    FavouriteBand.$inject = ['$resource', 'DateUtils'];

    function FavouriteBand ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-bands/:id';

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
