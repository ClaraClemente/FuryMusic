(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('RateAlbumDetailController', RateAlbumDetailController);

    RateAlbumDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'RateAlbum', 'Album', 'User'];

    function RateAlbumDetailController($scope, $rootScope, $stateParams, previousState, entity, RateAlbum, Album, User) {
        var vm = this;

        vm.rateAlbum = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:rateAlbumUpdate', function(event, result) {
            vm.rateAlbum = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
