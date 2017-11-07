(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('RateAlbumDialogController', RateAlbumDialogController);

    RateAlbumDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'RateAlbum', 'Album', 'User'];

    function RateAlbumDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, RateAlbum, Album, User) {
        var vm = this;

        vm.rateAlbum = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.albums = Album.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.rateAlbum.id !== null) {
                RateAlbum.update(vm.rateAlbum, onSaveSuccess, onSaveError);
            } else {
                RateAlbum.save(vm.rateAlbum, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:rateAlbumUpdate', result);
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
