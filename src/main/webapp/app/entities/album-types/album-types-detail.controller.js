(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('AlbumTypesDetailController', AlbumTypesDetailController);

    AlbumTypesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AlbumTypes', 'Album'];

    function AlbumTypesDetailController($scope, $rootScope, $stateParams, previousState, entity, AlbumTypes, Album) {
        var vm = this;

        vm.albumTypes = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:albumTypesUpdate', function(event, result) {
            vm.albumTypes = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
