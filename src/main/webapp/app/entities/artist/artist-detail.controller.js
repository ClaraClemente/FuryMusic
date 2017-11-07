(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistDetailController', ArtistDetailController);

    ArtistDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Artist', 'Country', 'FavouriteArtist', 'Concerts', 'Social', 'ArtistBandStatus'];

    function ArtistDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Artist, Country, FavouriteArtist, Concerts, Social, ArtistBandStatus) {
        var vm = this;

        vm.artist = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('furyMusicApp:artistUpdate', function(event, result) {
            vm.artist = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
