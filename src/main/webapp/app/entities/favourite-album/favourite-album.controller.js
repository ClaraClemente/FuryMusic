(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteAlbumController', FavouriteAlbumController);

    FavouriteAlbumController.$inject = ['FavouriteAlbum'];

    function FavouriteAlbumController(FavouriteAlbum) {

        var vm = this;

        vm.favouriteAlbums = [];

        loadAll();

        function loadAll() {
            FavouriteAlbum.query(function(result) {
                vm.favouriteAlbums = result;
                vm.searchQuery = null;
            });
        }
    }
})();
