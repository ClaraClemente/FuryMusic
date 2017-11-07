(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteLabelDetailController', FavouriteLabelDetailController);

    FavouriteLabelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteLabel', 'Label', 'User'];

    function FavouriteLabelDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteLabel, Label, User) {
        var vm = this;

        vm.favouriteLabel = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteLabelUpdate', function(event, result) {
            vm.favouriteLabel = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
