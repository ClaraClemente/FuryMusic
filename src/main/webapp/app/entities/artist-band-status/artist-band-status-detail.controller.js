(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistBandStatusDetailController', ArtistBandStatusDetailController);

    ArtistBandStatusDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ArtistBandStatus', 'Artist', 'Band'];

    function ArtistBandStatusDetailController($scope, $rootScope, $stateParams, previousState, entity, ArtistBandStatus, Artist, Band) {
        var vm = this;

        vm.artistBandStatus = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:artistBandStatusUpdate', function(event, result) {
            vm.artistBandStatus = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
