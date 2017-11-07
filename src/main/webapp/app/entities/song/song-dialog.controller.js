(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('SongDialogController', SongDialogController);

    SongDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Song', 'Album', 'FavouriteSong', 'Collection'];

    function SongDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Song, Album, FavouriteSong, Collection) {
        var vm = this;

        vm.song = entity;
        vm.clear = clear;
        vm.save = save;
        vm.albums = Album.query();
        vm.favouritesongs = FavouriteSong.query();
        vm.collections = Collection.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.song.id !== null) {
                Song.update(vm.song, onSaveSuccess, onSaveError);
            } else {
                Song.save(vm.song, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:songUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
