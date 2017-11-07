(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('SocialDialogController', SocialDialogController);

    SocialDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Social', 'Artist', 'Band', 'User'];

    function SocialDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Social, Artist, Band, User) {
        var vm = this;

        vm.social = entity;
        vm.clear = clear;
        vm.save = save;
        vm.artists = Artist.query();
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
            if (vm.social.id !== null) {
                Social.update(vm.social, onSaveSuccess, onSaveError);
            } else {
                Social.save(vm.social, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:socialUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
