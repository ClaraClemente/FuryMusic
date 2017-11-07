(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('BandDialogController', BandDialogController);

    BandDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Band', 'Country', 'Genre', 'FavouriteBand', 'Hatred', 'Concerts', 'Social', 'ArtistBandStatus'];

    function BandDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Band, Country, Genre, FavouriteBand, Hatred, Concerts, Social, ArtistBandStatus) {
        var vm = this;

        vm.band = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.countries = Country.query();
        vm.genres = Genre.query();
        vm.favouritebands = FavouriteBand.query();
        vm.hatreds = Hatred.query();
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
            if (vm.band.id !== null) {
                Band.update(vm.band, onSaveSuccess, onSaveError);
            } else {
                Band.save(vm.band, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:bandUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.creationDate = false;

        vm.setImg = function ($file, band) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        band.img = base64Data;
                        band.imgContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
