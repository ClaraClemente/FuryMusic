(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('concerts', {
            parent: 'entity',
            url: '/concerts',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.concerts.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/concerts/concerts.html',
                    controller: 'ConcertsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('concerts');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('concerts-detail', {
            parent: 'concerts',
            url: '/concerts/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.concerts.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/concerts/concerts-detail.html',
                    controller: 'ConcertsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('concerts');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Concerts', function($stateParams, Concerts) {
                    return Concerts.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'concerts',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('concerts-detail.edit', {
            parent: 'concerts-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/concerts/concerts-dialog.html',
                    controller: 'ConcertsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Concerts', function(Concerts) {
                            return Concerts.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('concerts.new', {
            parent: 'concerts',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/concerts/concerts-dialog.html',
                    controller: 'ConcertsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                place: null,
                                latitude: null,
                                longitud: null,
                                urlGoogle: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('concerts', null, { reload: 'concerts' });
                }, function() {
                    $state.go('concerts');
                });
            }]
        })
        .state('concerts.edit', {
            parent: 'concerts',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/concerts/concerts-dialog.html',
                    controller: 'ConcertsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Concerts', function(Concerts) {
                            return Concerts.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('concerts', null, { reload: 'concerts' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('concerts.delete', {
            parent: 'concerts',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/concerts/concerts-delete-dialog.html',
                    controller: 'ConcertsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Concerts', function(Concerts) {
                            return Concerts.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('concerts', null, { reload: 'concerts' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
