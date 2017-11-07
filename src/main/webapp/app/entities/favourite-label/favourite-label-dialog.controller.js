(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteLabelDialogController', FavouriteLabelDialogController);

    FavouriteLabelDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FavouriteLabel', 'Label', 'User'];

    function FavouriteLabelDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FavouriteLabel, Label, User) {
        var vm = this;

        vm.favouriteLabel = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.labels = Label.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.favouriteLabel.id !== null) {
                FavouriteLabel.update(vm.favouriteLabel, onSaveSuccess, onSaveError);
            } else {
                FavouriteLabel.save(vm.favouriteLabel, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:favouriteLabelUpdate', result);
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
