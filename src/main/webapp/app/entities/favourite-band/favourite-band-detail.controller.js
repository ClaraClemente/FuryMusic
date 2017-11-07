(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteBandDetailController', FavouriteBandDetailController);

    FavouriteBandDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteBand', 'Band', 'User'];

    function FavouriteBandDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteBand, Band, User) {
        var vm = this;

        vm.favouriteBand = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteBandUpdate', function(event, result) {
            vm.favouriteBand = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
