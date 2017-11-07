(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('Artist', Artist);

    Artist.$inject = ['$resource', 'DateUtils'];

    function Artist ($resource, DateUtils) {
        var resourceUrl =  'api/artists/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthdate = DateUtils.convertLocalDateFromServer(data.birthdate);
                        data.deathdate = DateUtils.convertLocalDateFromServer(data.deathdate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    copy.deathdate = DateUtils.convertLocalDateToServer(copy.deathdate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    copy.deathdate = DateUtils.convertLocalDateToServer(copy.deathdate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
