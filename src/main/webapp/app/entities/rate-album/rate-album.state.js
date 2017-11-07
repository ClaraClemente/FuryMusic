(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('rate-album', {
            parent: 'entity',
            url: '/rate-album',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.rateAlbum.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rate-album/rate-albums.html',
                    controller: 'RateAlbumController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rateAlbum');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('rate-album-detail', {
            parent: 'rate-album',
            url: '/rate-album/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.rateAlbum.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rate-album/rate-album-detail.html',
                    controller: 'RateAlbumDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rateAlbum');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'RateAlbum', function($stateParams, RateAlbum) {
                    return RateAlbum.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'rate-album',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('rate-album-detail.edit', {
            parent: 'rate-album-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-album/rate-album-dialog.html',
                    controller: 'RateAlbumDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['RateAlbum', function(RateAlbum) {
                            return RateAlbum.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('rate-album.new', {
            parent: 'rate-album',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-album/rate-album-dialog.html',
                    controller: 'RateAlbumDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                rate: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('rate-album', null, { reload: 'rate-album' });
                }, function() {
                    $state.go('rate-album');
                });
            }]
        })
        .state('rate-album.edit', {
            parent: 'rate-album',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-album/rate-album-dialog.html',
                    controller: 'RateAlbumDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['RateAlbum', function(RateAlbum) {
                            return RateAlbum.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('rate-album', null, { reload: 'rate-album' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('rate-album.delete', {
            parent: 'rate-album',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-album/rate-album-delete-dialog.html',
                    controller: 'RateAlbumDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['RateAlbum', function(RateAlbum) {
                            return RateAlbum.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('rate-album', null, { reload: 'rate-album' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
