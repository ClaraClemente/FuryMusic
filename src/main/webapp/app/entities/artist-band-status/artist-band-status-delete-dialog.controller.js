(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistBandStatusDeleteController',ArtistBandStatusDeleteController);

    ArtistBandStatusDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArtistBandStatus'];

    function ArtistBandStatusDeleteController($uibModalInstance, entity, ArtistBandStatus) {
        var vm = this;

        vm.artistBandStatus = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ArtistBandStatus.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
