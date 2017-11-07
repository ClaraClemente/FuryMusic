(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('AlbumTypes', AlbumTypes);

    AlbumTypes.$inject = ['$resource'];

    function AlbumTypes ($resource) {
        var resourceUrl =  'api/album-types/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
