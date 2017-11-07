(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumDialogController', AlbumDialogController);

    AlbumDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Album', 'AlbumTypes', 'Review', 'FavouriteAlbum', 'RateAlbum', 'Pending', 'Song'];

    function AlbumDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Album, AlbumTypes, Review, FavouriteAlbum, RateAlbum, Pending, Song) {
        var vm = this;

        vm.album = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.albumtypes = AlbumTypes.query();
        vm.reviews = Review.query();
        vm.favouritealbums = FavouriteAlbum.query();
        vm.ratealbums = RateAlbum.query();
        vm.pendings = Pending.query();
        vm.songs = Song.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.album.id !== null) {
                Album.update(vm.album, onSaveSuccess, onSaveError);
            } else {
                Album.save(vm.album, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:albumUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.releaseDate = false;

        vm.setImg = function ($file, album) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        album.img = base64Data;
                        album.imgContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
