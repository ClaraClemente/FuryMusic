(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumDetailController', AlbumDetailController);

    AlbumDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Album', 'AlbumTypes', 'Review', 'FavouriteAlbum', 'RateAlbum', 'Pending', 'Song'];

    function AlbumDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Album, AlbumTypes, Review, FavouriteAlbum, RateAlbum, Pending, Song) {
        var vm = this;

        vm.album = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('furyMusicApp:albumUpdate', function(event, result) {
            vm.album = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
