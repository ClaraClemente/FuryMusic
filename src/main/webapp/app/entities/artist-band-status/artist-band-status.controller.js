(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistBandStatusController', ArtistBandStatusController);

    ArtistBandStatusController.$inject = ['ArtistBandStatus'];

    function ArtistBandStatusController(ArtistBandStatus) {

        var vm = this;

        vm.artistBandStatuses = [];

        loadAll();

        function loadAll() {
            ArtistBandStatus.query(function(result) {
                vm.artistBandStatuses = result;
                vm.searchQuery = null;
            });
        }
    }
})();
