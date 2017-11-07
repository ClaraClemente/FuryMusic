(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('ConcertsController', ConcertsController);

    ConcertsController.$inject = ['Concerts'];

    function ConcertsController(Concerts) {

        var vm = this;

        vm.concerts = [];

        loadAll();

        function loadAll() {
            Concerts.query(function(result) {
                vm.concerts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
