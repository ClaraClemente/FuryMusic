(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('ArtistBandStatus', ArtistBandStatus);

    ArtistBandStatus.$inject = ['$resource', 'DateUtils'];

    function ArtistBandStatus ($resource, DateUtils) {
        var resourceUrl =  'api/artist-band-statuses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.incorporationDate = DateUtils.convertLocalDateFromServer(data.incorporationDate);
                        data.leavingDate = DateUtils.convertLocalDateFromServer(data.leavingDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.incorporationDate = DateUtils.convertLocalDateToServer(copy.incorporationDate);
                    copy.leavingDate = DateUtils.convertLocalDateToServer(copy.leavingDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.incorporationDate = DateUtils.convertLocalDateToServer(copy.incorporationDate);
                    copy.leavingDate = DateUtils.convertLocalDateToServer(copy.leavingDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
