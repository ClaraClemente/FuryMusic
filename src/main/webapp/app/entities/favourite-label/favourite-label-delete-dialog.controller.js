(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteLabelDeleteController',FavouriteLabelDeleteController);

    FavouriteLabelDeleteController.$inject = ['$uibModalInstance', 'entity', 'FavouriteLabel'];

    function FavouriteLabelDeleteController($uibModalInstance, entity, FavouriteLabel) {
        var vm = this;

        vm.favouriteLabel = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FavouriteLabel.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
