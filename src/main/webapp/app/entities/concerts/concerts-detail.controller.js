(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ConcertsDetailController', ConcertsDetailController);

    ConcertsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Concerts', 'Band', 'Artist'];

    function ConcertsDetailController($scope, $rootScope, $stateParams, previousState, entity, Concerts, Band, Artist) {
        var vm = this;

        vm.concerts = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:concertsUpdate', function(event, result) {
            vm.concerts = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
