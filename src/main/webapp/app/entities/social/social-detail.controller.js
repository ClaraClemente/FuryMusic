(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('SocialDetailController', SocialDetailController);

    SocialDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Social', 'Artist', 'Band', 'User'];

    function SocialDetailController($scope, $rootScope, $stateParams, previousState, entity, Social, Artist, Band, User) {
        var vm = this;

        vm.social = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:socialUpdate', function(event, result) {
            vm.social = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
