(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteArtistDetailController', FavouriteArtistDetailController);

    FavouriteArtistDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteArtist', 'Artist', 'User'];

    function FavouriteArtistDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteArtist, Artist, User) {
        var vm = this;

        vm.favouriteArtist = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteArtistUpdate', function(event, result) {
            vm.favouriteArtist = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
