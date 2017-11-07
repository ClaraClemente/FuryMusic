(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ReviewDetailController', ReviewDetailController);

    ReviewDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Review', 'Album', 'FavouriteReview'];

    function ReviewDetailController($scope, $rootScope, $stateParams, previousState, entity, Review, Album, FavouriteReview) {
        var vm = this;

        vm.review = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:reviewUpdate', function(event, result) {
            vm.review = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
