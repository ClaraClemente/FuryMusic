(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ConcertsDeleteController',ConcertsDeleteController);

    ConcertsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Concerts'];

    function ConcertsDeleteController($uibModalInstance, entity, Concerts) {
        var vm = this;

        vm.concerts = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Concerts.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
