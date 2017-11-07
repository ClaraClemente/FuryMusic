(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('LabelDetailController', LabelDetailController);

    LabelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Label', 'Country', 'FavouriteLabel'];

    function LabelDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Label, Country, FavouriteLabel) {
        var vm = this;

        vm.label = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('furyMusicApp:labelUpdate', function(event, result) {
            vm.label = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
