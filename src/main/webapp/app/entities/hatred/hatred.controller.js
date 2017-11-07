(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('HatredController', HatredController);

    HatredController.$inject = ['Hatred'];

    function HatredController(Hatred) {

        var vm = this;

        vm.hatreds = [];

        loadAll();

        function loadAll() {
            Hatred.query(function(result) {
                vm.hatreds = result;
                vm.searchQuery = null;
            });
        }
    }
})();
