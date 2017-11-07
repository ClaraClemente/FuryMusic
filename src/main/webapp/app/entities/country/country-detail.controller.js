(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('CountryDetailController', CountryDetailController);

    CountryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Country', 'UserExt', 'Artist', 'Band', 'Label'];

    function CountryDetailController($scope, $rootScope, $stateParams, previousState, entity, Country, UserExt, Artist, Band, Label) {
        var vm = this;

        vm.country = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:countryUpdate', function(event, result) {
            vm.country = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
