(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('BandDetailController', BandDetailController);

    BandDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Band', 'Country', 'Genre', 'FavouriteBand', 'Hatred', 'Concerts', 'Social', 'ArtistBandStatus'];

    function BandDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Band, Country, Genre, FavouriteBand, Hatred, Concerts, Social, ArtistBandStatus) {
        var vm = this;

        vm.band = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('furyMusicApp:bandUpdate', function(event, result) {
            vm.band = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
