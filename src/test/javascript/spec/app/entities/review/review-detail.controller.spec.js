'use strict';

describe('Controller Tests', function() {

    describe('Review Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockReview, MockAlbum, MockFavouriteReview;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockReview = jasmine.createSpy('MockReview');
            MockAlbum = jasmine.createSpy('MockAlbum');
            MockFavouriteReview = jasmine.createSpy('MockFavouriteReview');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Review': MockReview,
                'Album': MockAlbum,
                'FavouriteReview': MockFavouriteReview
            };
            createController = function() {
                $injector.get('$controller')("ReviewDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'furyMusicApp:reviewUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
