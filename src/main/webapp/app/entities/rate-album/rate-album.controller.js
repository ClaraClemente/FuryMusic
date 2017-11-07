(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('RateAlbumController', RateAlbumController);

    RateAlbumController.$inject = ['RateAlbum'];

    function RateAlbumController(RateAlbum) {

        var vm = this;

        vm.rateAlbums = [];

        loadAll();

        function loadAll() {
            RateAlbum.query(function(result) {
                vm.rateAlbums = result;
                vm.searchQuery = null;
            });
        }
    }
})();
