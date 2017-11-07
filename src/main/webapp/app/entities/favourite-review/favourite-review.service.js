(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteReview', FavouriteReview);

    FavouriteReview.$inject = ['$resource', 'DateUtils'];

    function FavouriteReview ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-reviews/:id';

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
