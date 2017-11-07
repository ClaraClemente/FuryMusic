(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ConcertsDialogController', ConcertsDialogController);

    ConcertsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Concerts', 'Band', 'Artist'];

    function ConcertsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Concerts, Band, Artist) {
        var vm = this;

        vm.concerts = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.bands = Band.query();
        vm.artists = Artist.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.concerts.id !== null) {
                Concerts.update(vm.concerts, onSaveSuccess, onSaveError);
            } else {
                Concerts.save(vm.concerts, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:concertsUpdate', result);
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
