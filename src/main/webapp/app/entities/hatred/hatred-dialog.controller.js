(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('HatredDialogController', HatredDialogController);

    HatredDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Hatred', 'User', 'Band'];

    function HatredDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Hatred, User, Band) {
        var vm = this;

        vm.hatred = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.bands = Band.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.hatred.id !== null) {
                Hatred.update(vm.hatred, onSaveSuccess, onSaveError);
            } else {
                Hatred.save(vm.hatred, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:hatredUpdate', result);
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
