(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteSongDetailController', FavouriteSongDetailController);

    FavouriteSongDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteSong', 'Song', 'User'];

    function FavouriteSongDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteSong, Song, User) {
        var vm = this;

        vm.favouriteSong = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteSongUpdate', function(event, result) {
            vm.favouriteSong = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
