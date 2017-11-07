(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumTypesController', AlbumTypesController);

    AlbumTypesController.$inject = ['AlbumTypes'];

    function AlbumTypesController(AlbumTypes) {

        var vm = this;

        vm.albumTypes = [];

        loadAll();

        function loadAll() {
            AlbumTypes.query(function(result) {
                vm.albumTypes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
