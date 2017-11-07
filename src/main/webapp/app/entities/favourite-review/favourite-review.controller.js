(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteReviewController', FavouriteReviewController);

    FavouriteReviewController.$inject = ['FavouriteReview'];

    function FavouriteReviewController(FavouriteReview) {

        var vm = this;

        vm.favouriteReviews = [];

        loadAll();

        function loadAll() {
            FavouriteReview.query(function(result) {
                vm.favouriteReviews = result;
                vm.searchQuery = null;
            });
        }
    }
})();
