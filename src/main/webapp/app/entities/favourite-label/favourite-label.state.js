(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('favourite-label', {
            parent: 'entity',
            url: '/favourite-label',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteLabel.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-label/favourite-labels.html',
                    controller: 'FavouriteLabelController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteLabel');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('favourite-label-detail', {
            parent: 'favourite-label',
            url: '/favourite-label/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteLabel.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-label/favourite-label-detail.html',
                    controller: 'FavouriteLabelDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteLabel');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FavouriteLabel', function($stateParams, FavouriteLabel) {
                    return FavouriteLabel.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'favourite-label',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('favourite-label-detail.edit', {
            parent: 'favourite-label-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-label/favourite-label-dialog.html',
                    controller: 'FavouriteLabelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteLabel', function(FavouriteLabel) {
                            return FavouriteLabel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-label.new', {
            parent: 'favourite-label',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-label/favourite-label-dialog.html',
                    controller: 'FavouriteLabelDialogController',
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
                    $state.go('favourite-label', null, { reload: 'favourite-label' });
                }, function() {
                    $state.go('favourite-label');
                });
            }]
        })
        .state('favourite-label.edit', {
            parent: 'favourite-label',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-label/favourite-label-dialog.html',
                    controller: 'FavouriteLabelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteLabel', function(FavouriteLabel) {
                            return FavouriteLabel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-label', null, { reload: 'favourite-label' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-label.delete', {
            parent: 'favourite-label',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-label/favourite-label-delete-dialog.html',
                    controller: 'FavouriteLabelDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FavouriteLabel', function(FavouriteLabel) {
                            return FavouriteLabel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-label', null, { reload: 'favourite-label' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
