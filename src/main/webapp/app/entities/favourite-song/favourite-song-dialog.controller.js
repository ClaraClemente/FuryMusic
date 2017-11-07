(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteSongDialogController', FavouriteSongDialogController);

    FavouriteSongDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FavouriteSong', 'Song', 'User'];

    function FavouriteSongDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FavouriteSong, Song, User) {
        var vm = this;

        vm.favouriteSong = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.songs = Song.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.favouriteSong.id !== null) {
                FavouriteSong.update(vm.favouriteSong, onSaveSuccess, onSaveError);
            } else {
                FavouriteSong.save(vm.favouriteSong, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:favouriteSongUpdate', result);
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
