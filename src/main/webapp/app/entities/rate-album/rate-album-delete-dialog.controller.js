(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('RateAlbumDeleteController',RateAlbumDeleteController);

    RateAlbumDeleteController.$inject = ['$uibModalInstance', 'entity', 'RateAlbum'];

    function RateAlbumDeleteController($uibModalInstance, entity, RateAlbum) {
        var vm = this;

        vm.rateAlbum = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            RateAlbum.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
