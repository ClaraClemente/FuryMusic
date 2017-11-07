(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ArtistDialogController', ArtistDialogController);

    ArtistDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Artist', 'Country', 'FavouriteArtist', 'Concerts', 'Social', 'ArtistBandStatus'];

    function ArtistDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Artist, Country, FavouriteArtist, Concerts, Social, ArtistBandStatus) {
        var vm = this;

        vm.artist = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.countries = Country.query();
        vm.favouriteartists = FavouriteArtist.query();
        vm.concerts = Concerts.query();
        vm.socials = Social.query();
        vm.artistbandstatuses = ArtistBandStatus.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.artist.id !== null) {
                Artist.update(vm.artist, onSaveSuccess, onSaveError);
            } else {
                Artist.save(vm.artist, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:artistUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthdate = false;
        vm.datePickerOpenStatus.deathdate = false;

        vm.setImg = function ($file, artist) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        artist.img = base64Data;
                        artist.imgContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
