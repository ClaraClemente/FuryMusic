(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteArtistDeleteController',FavouriteArtistDeleteController);

    FavouriteArtistDeleteController.$inject = ['$uibModalInstance', 'entity', 'FavouriteArtist'];

    function FavouriteArtistDeleteController($uibModalInstance, entity, FavouriteArtist) {
        var vm = this;

        vm.favouriteArtist = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FavouriteArtist.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
