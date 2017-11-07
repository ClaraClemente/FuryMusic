(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteArtistController', FavouriteArtistController);

    FavouriteArtistController.$inject = ['FavouriteArtist'];

    function FavouriteArtistController(FavouriteArtist) {

        var vm = this;

        vm.favouriteArtists = [];

        loadAll();

        function loadAll() {
            FavouriteArtist.query(function(result) {
                vm.favouriteArtists = result;
                vm.searchQuery = null;
            });
        }
    }
})();
