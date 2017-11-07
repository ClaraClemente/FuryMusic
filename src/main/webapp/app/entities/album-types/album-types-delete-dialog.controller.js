(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumTypesDeleteController',AlbumTypesDeleteController);

    AlbumTypesDeleteController.$inject = ['$uibModalInstance', 'entity', 'AlbumTypes'];

    function AlbumTypesDeleteController($uibModalInstance, entity, AlbumTypes) {
        var vm = this;

        vm.albumTypes = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AlbumTypes.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
