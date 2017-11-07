(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('favourite-artist', {
            parent: 'entity',
            url: '/favourite-artist',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteArtist.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-artist/favourite-artists.html',
                    controller: 'FavouriteArtistController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteArtist');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('favourite-artist-detail', {
            parent: 'favourite-artist',
            url: '/favourite-artist/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteArtist.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-artist/favourite-artist-detail.html',
                    controller: 'FavouriteArtistDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteArtist');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FavouriteArtist', function($stateParams, FavouriteArtist) {
                    return FavouriteArtist.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'favourite-artist',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('favourite-artist-detail.edit', {
            parent: 'favourite-artist-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-artist/favourite-artist-dialog.html',
                    controller: 'FavouriteArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteArtist', function(FavouriteArtist) {
                            return FavouriteArtist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-artist.new', {
            parent: 'favourite-artist',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-artist/favourite-artist-dialog.html',
                    controller: 'FavouriteArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                liked: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('favourite-artist', null, { reload: 'favourite-artist' });
                }, function() {
                    $state.go('favourite-artist');
                });
            }]
        })
        .state('favourite-artist.edit', {
            parent: 'favourite-artist',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-artist/favourite-artist-dialog.html',
                    controller: 'FavouriteArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteArtist', function(FavouriteArtist) {
                            return FavouriteArtist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-artist', null, { reload: 'favourite-artist' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-artist.delete', {
            parent: 'favourite-artist',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-artist/favourite-artist-delete-dialog.html',
                    controller: 'FavouriteArtistDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FavouriteArtist', function(FavouriteArtist) {
                            return FavouriteArtist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-artist', null, { reload: 'favourite-artist' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
