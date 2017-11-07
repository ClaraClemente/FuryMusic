(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteLabelController', FavouriteLabelController);

    FavouriteLabelController.$inject = ['FavouriteLabel'];

    function FavouriteLabelController(FavouriteLabel) {

        var vm = this;

        vm.favouriteLabels = [];

        loadAll();

        function loadAll() {
            FavouriteLabel.query(function(result) {
                vm.favouriteLabels = result;
                vm.searchQuery = null;
            });
        }
    }
})();
