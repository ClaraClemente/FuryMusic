(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('PendingDetailController', PendingDetailController);

    PendingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pending', 'User', 'Album'];

    function PendingDetailController($scope, $rootScope, $stateParams, previousState, entity, Pending, User, Album) {
        var vm = this;

        vm.pending = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:pendingUpdate', function(event, result) {
            vm.pending = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
