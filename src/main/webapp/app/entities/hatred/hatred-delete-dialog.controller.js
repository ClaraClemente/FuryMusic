(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('HatredDeleteController',HatredDeleteController);

    HatredDeleteController.$inject = ['$uibModalInstance', 'entity', 'Hatred'];

    function HatredDeleteController($uibModalInstance, entity, Hatred) {
        var vm = this;

        vm.hatred = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Hatred.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
