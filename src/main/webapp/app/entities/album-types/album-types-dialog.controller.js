(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumTypesDialogController', AlbumTypesDialogController);

    AlbumTypesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'AlbumTypes', 'Album'];

    function AlbumTypesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, AlbumTypes, Album) {
        var vm = this;

        vm.albumTypes = entity;
        vm.clear = clear;
        vm.save = save;
        vm.albums = Album.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.albumTypes.id !== null) {
                AlbumTypes.update(vm.albumTypes, onSaveSuccess, onSaveError);
            } else {
                AlbumTypes.save(vm.albumTypes, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:albumTypesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
