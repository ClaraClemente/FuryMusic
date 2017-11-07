(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('LabelController', LabelController);

    LabelController.$inject = ['DataUtils', 'Label'];

    function LabelController(DataUtils, Label) {

        var vm = this;

        vm.labels = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Label.query(function(result) {
                vm.labels = result;
                vm.searchQuery = null;
            });
        }
    }
})();
