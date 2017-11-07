(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistBandStatusDialogController', ArtistBandStatusDialogController);

    ArtistBandStatusDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArtistBandStatus', 'Artist', 'Band'];

    function ArtistBandStatusDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArtistBandStatus, Artist, Band) {
        var vm = this;

        vm.artistBandStatus = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.artists = Artist.query();
        vm.bands = Band.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.artistBandStatus.id !== null) {
                ArtistBandStatus.update(vm.artistBandStatus, onSaveSuccess, onSaveError);
            } else {
                ArtistBandStatus.save(vm.artistBandStatus, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:artistBandStatusUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.incorporationDate = false;
        vm.datePickerOpenStatus.leavingDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
