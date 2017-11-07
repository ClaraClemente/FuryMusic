(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('hatred', {
            parent: 'entity',
            url: '/hatred',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.hatred.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hatred/hatreds.html',
                    controller: 'HatredController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hatred');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('hatred-detail', {
            parent: 'hatred',
            url: '/hatred/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.hatred.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hatred/hatred-detail.html',
                    controller: 'HatredDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hatred');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Hatred', function($stateParams, Hatred) {
                    return Hatred.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'hatred',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('hatred-detail.edit', {
            parent: 'hatred-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hatred/hatred-dialog.html',
                    controller: 'HatredDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hatred', function(Hatred) {
                            return Hatred.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hatred.new', {
            parent: 'hatred',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hatred/hatred-dialog.html',
                    controller: 'HatredDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                hated: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('hatred', null, { reload: 'hatred' });
                }, function() {
                    $state.go('hatred');
                });
            }]
        })
        .state('hatred.edit', {
            parent: 'hatred',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hatred/hatred-dialog.html',
                    controller: 'HatredDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hatred', function(Hatred) {
                            return Hatred.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hatred', null, { reload: 'hatred' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hatred.delete', {
            parent: 'hatred',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hatred/hatred-delete-dialog.html',
                    controller: 'HatredDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Hatred', function(Hatred) {
                            return Hatred.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hatred', null, { reload: 'hatred' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
