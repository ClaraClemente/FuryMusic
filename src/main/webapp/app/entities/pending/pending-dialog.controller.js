(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('PendingDialogController', PendingDialogController);

    PendingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pending', 'User', 'Album'];

    function PendingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pending, User, Album) {
        var vm = this;

        vm.pending = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.albums = Album.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pending.id !== null) {
                Pending.update(vm.pending, onSaveSuccess, onSaveError);
            } else {
                Pending.save(vm.pending, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:pendingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
