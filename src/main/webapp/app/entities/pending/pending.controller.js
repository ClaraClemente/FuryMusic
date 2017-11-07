(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('PendingController', PendingController);

    PendingController.$inject = ['Pending'];

    function PendingController(Pending) {

        var vm = this;

        vm.pendings = [];

        loadAll();

        function loadAll() {
            Pending.query(function(result) {
                vm.pendings = result;
                vm.searchQuery = null;
            });
        }
    }
})();
