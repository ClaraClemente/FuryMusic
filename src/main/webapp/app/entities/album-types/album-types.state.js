(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('album-types', {
            parent: 'entity',
            url: '/album-types',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.albumTypes.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/album-types/album-types.html',
                    controller: 'AlbumTypesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('albumTypes');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('album-types-detail', {
            parent: 'album-types',
            url: '/album-types/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.albumTypes.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/album-types/album-types-detail.html',
                    controller: 'AlbumTypesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('albumTypes');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AlbumTypes', function($stateParams, AlbumTypes) {
                    return AlbumTypes.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'album-types',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('album-types-detail.edit', {
            parent: 'album-types-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album-types/album-types-dialog.html',
                    controller: 'AlbumTypesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlbumTypes', function(AlbumTypes) {
                            return AlbumTypes.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('album-types.new', {
            parent: 'album-types',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album-types/album-types-dialog.html',
                    controller: 'AlbumTypesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                type: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('album-types', null, { reload: 'album-types' });
                }, function() {
                    $state.go('album-types');
                });
            }]
        })
        .state('album-types.edit', {
            parent: 'album-types',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album-types/album-types-dialog.html',
                    controller: 'AlbumTypesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlbumTypes', function(AlbumTypes) {
                            return AlbumTypes.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('album-types', null, { reload: 'album-types' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('album-types.delete', {
            parent: 'album-types',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album-types/album-types-delete-dialog.html',
                    controller: 'AlbumTypesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AlbumTypes', function(AlbumTypes) {
                            return AlbumTypes.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('album-types', null, { reload: 'album-types' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
