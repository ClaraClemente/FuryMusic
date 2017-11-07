(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteBandDeleteController',FavouriteBandDeleteController);

    FavouriteBandDeleteController.$inject = ['$uibModalInstance', 'entity', 'FavouriteBand'];

    function FavouriteBandDeleteController($uibModalInstance, entity, FavouriteBand) {
        var vm = this;

        vm.favouriteBand = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FavouriteBand.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
