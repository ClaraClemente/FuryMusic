(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteBandDialogController', FavouriteBandDialogController);

    FavouriteBandDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FavouriteBand', 'Band', 'User'];

    function FavouriteBandDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FavouriteBand, Band, User) {
        var vm = this;

        vm.favouriteBand = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.bands = Band.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.favouriteBand.id !== null) {
                FavouriteBand.update(vm.favouriteBand, onSaveSuccess, onSaveError);
            } else {
                FavouriteBand.save(vm.favouriteBand, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:favouriteBandUpdate', result);
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
