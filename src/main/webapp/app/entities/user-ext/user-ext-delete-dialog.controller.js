(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('UserExtDeleteController',UserExtDeleteController);

    UserExtDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserExt'];

    function UserExtDeleteController($uibModalInstance, entity, UserExt) {
        var vm = this;

        vm.userExt = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            UserExt.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
