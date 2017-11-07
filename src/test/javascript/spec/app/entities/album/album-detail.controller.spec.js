'use strict';

describe('Controller Tests', function() {

    describe('Album Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAlbum, MockAlbumTypes, MockReview, MockFavouriteAlbum, MockRateAlbum, MockPending, MockSong;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAlbum = jasmine.createSpy('MockAlbum');
            MockAlbumTypes = jasmine.createSpy('MockAlbumTypes');
            MockReview = jasmine.createSpy('MockReview');
            MockFavouriteAlbum = jasmine.createSpy('MockFavouriteAlbum');
            MockRateAlbum = jasmine.createSpy('MockRateAlbum');
            MockPending = jasmine.createSpy('MockPending');
            MockSong = jasmine.createSpy('MockSong');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Album': MockAlbum,
                'AlbumTypes': MockAlbumTypes,
                'Review': MockReview,
                'FavouriteAlbum': MockFavouriteAlbum,
                'RateAlbum': MockRateAlbum,
                'Pending': MockPending,
                'Song': MockSong
            };
            createController = function() {
                $injector.get('$controller')("AlbumDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'furyMusicApp:albumUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
