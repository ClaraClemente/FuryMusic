(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pending', {
            parent: 'entity',
            url: '/pending',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.pending.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pending/pendings.html',
                    controller: 'PendingController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pending');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pending-detail', {
            parent: 'pending',
            url: '/pending/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.pending.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pending/pending-detail.html',
                    controller: 'PendingDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pending');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pending', function($stateParams, Pending) {
                    return Pending.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pending',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pending-detail.edit', {
            parent: 'pending-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pending/pending-dialog.html',
                    controller: 'PendingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pending', function(Pending) {
                            return Pending.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pending.new', {
            parent: 'pending',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pending/pending-dialog.html',
                    controller: 'PendingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                pending: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pending', null, { reload: 'pending' });
                }, function() {
                    $state.go('pending');
                });
            }]
        })
        .state('pending.edit', {
            parent: 'pending',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pending/pending-dialog.html',
                    controller: 'PendingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pending', function(Pending) {
                            return Pending.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pending', null, { reload: 'pending' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pending.delete', {
            parent: 'pending',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pending/pending-delete-dialog.html',
                    controller: 'PendingDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pending', function(Pending) {
                            return Pending.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pending', null, { reload: 'pending' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
