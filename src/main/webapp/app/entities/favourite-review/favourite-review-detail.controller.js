(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteReviewDetailController', FavouriteReviewDetailController);

    FavouriteReviewDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteReview', 'Review', 'User'];

    function FavouriteReviewDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteReview, Review, User) {
        var vm = this;

        vm.favouriteReview = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteReviewUpdate', function(event, result) {
            vm.favouriteReview = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
