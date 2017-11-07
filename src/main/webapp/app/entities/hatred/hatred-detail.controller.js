(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('HatredDetailController', HatredDetailController);

    HatredDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Hatred', 'User', 'Band'];

    function HatredDetailController($scope, $rootScope, $stateParams, previousState, entity, Hatred, User, Band) {
        var vm = this;

        vm.hatred = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:hatredUpdate', function(event, result) {
            vm.hatred = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
