(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('SongDetailController', SongDetailController);

    SongDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Song', 'Album', 'FavouriteSong', 'Collection'];

    function SongDetailController($scope, $rootScope, $stateParams, previousState, entity, Song, Album, FavouriteSong, Collection) {
        var vm = this;

        vm.song = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:songUpdate', function(event, result) {
            vm.song = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
