(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('PendingDeleteController',PendingDeleteController);

    PendingDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pending'];

    function PendingDeleteController($uibModalInstance, entity, Pending) {
        var vm = this;

        vm.pending = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pending.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
