(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteReviewDeleteController',FavouriteReviewDeleteController);

    FavouriteReviewDeleteController.$inject = ['$uibModalInstance', 'entity', 'FavouriteReview'];

    function FavouriteReviewDeleteController($uibModalInstance, entity, FavouriteReview) {
        var vm = this;

        vm.favouriteReview = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FavouriteReview.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
