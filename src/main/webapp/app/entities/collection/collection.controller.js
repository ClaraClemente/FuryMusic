(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('CollectionController', CollectionController);

    CollectionController.$inject = ['Collection'];

    function CollectionController(Collection) {

        var vm = this;

        vm.collections = [];

        loadAll();

        function loadAll() {
            Collection.query(function(result) {
                vm.collections = result;
                vm.searchQuery = null;
            });
        }
    }
})();
