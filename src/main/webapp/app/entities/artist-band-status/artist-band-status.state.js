(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('artist-band-status', {
            parent: 'entity',
            url: '/artist-band-status',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.artistBandStatus.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/artist-band-status/artist-band-statuses.html',
                    controller: 'ArtistBandStatusController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('artistBandStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('artist-band-status-detail', {
            parent: 'artist-band-status',
            url: '/artist-band-status/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.artistBandStatus.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/artist-band-status/artist-band-status-detail.html',
                    controller: 'ArtistBandStatusDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('artistBandStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ArtistBandStatus', function($stateParams, ArtistBandStatus) {
                    return ArtistBandStatus.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'artist-band-status',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('artist-band-status-detail.edit', {
            parent: 'artist-band-status-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist-band-status/artist-band-status-dialog.html',
                    controller: 'ArtistBandStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ArtistBandStatus', function(ArtistBandStatus) {
                            return ArtistBandStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('artist-band-status.new', {
            parent: 'artist-band-status',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist-band-status/artist-band-status-dialog.html',
                    controller: 'ArtistBandStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                incorporationDate: null,
                                leavingDate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('artist-band-status', null, { reload: 'artist-band-status' });
                }, function() {
                    $state.go('artist-band-status');
                });
            }]
        })
        .state('artist-band-status.edit', {
            parent: 'artist-band-status',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist-band-status/artist-band-status-dialog.html',
                    controller: 'ArtistBandStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ArtistBandStatus', function(ArtistBandStatus) {
                            return ArtistBandStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('artist-band-status', null, { reload: 'artist-band-status' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('artist-band-status.delete', {
            parent: 'artist-band-status',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist-band-status/artist-band-status-delete-dialog.html',
                    controller: 'ArtistBandStatusDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArtistBandStatus', function(ArtistBandStatus) {
                            return ArtistBandStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('artist-band-status', null, { reload: 'artist-band-status' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
