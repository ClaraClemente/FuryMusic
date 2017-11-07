(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('favourite-review', {
            parent: 'entity',
            url: '/favourite-review',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteReview.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-review/favourite-reviews.html',
                    controller: 'FavouriteReviewController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteReview');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('favourite-review-detail', {
            parent: 'favourite-review',
            url: '/favourite-review/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'furyMusicApp.favouriteReview.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-review/favourite-review-detail.html',
                    controller: 'FavouriteReviewDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('favouriteReview');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FavouriteReview', function($stateParams, FavouriteReview) {
                    return FavouriteReview.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'favourite-review',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('favourite-review-detail.edit', {
            parent: 'favourite-review-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-review/favourite-review-dialog.html',
                    controller: 'FavouriteReviewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteReview', function(FavouriteReview) {
                            return FavouriteReview.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-review.new', {
            parent: 'favourite-review',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-review/favourite-review-dialog.html',
                    controller: 'FavouriteReviewDialogController',
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
                    $state.go('favourite-review', null, { reload: 'favourite-review' });
                }, function() {
                    $state.go('favourite-review');
                });
            }]
        })
        .state('favourite-review.edit', {
            parent: 'favourite-review',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-review/favourite-review-dialog.html',
                    controller: 'FavouriteReviewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouriteReview', function(FavouriteReview) {
                            return FavouriteReview.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-review', null, { reload: 'favourite-review' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-review.delete', {
            parent: 'favourite-review',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-review/favourite-review-delete-dialog.html',
                    controller: 'FavouriteReviewDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FavouriteReview', function(FavouriteReview) {
                            return FavouriteReview.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-review', null, { reload: 'favourite-review' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
