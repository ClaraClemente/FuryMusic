'use strict';

describe('Controller Tests', function() {

    describe('Artist Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockArtist, MockCountry, MockFavouriteArtist, MockConcerts, MockSocial, MockArtistBandStatus;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockArtist = jasmine.createSpy('MockArtist');
            MockCountry = jasmine.createSpy('MockCountry');
            MockFavouriteArtist = jasmine.createSpy('MockFavouriteArtist');
            MockConcerts = jasmine.createSpy('MockConcerts');
            MockSocial = jasmine.createSpy('MockSocial');
            MockArtistBandStatus = jasmine.createSpy('MockArtistBandStatus');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Artist': MockArtist,
                'Country': MockCountry,
                'FavouriteArtist': MockFavouriteArtist,
                'Concerts': MockConcerts,
                'Social': MockSocial,
                'ArtistBandStatus': MockArtistBandStatus
            };
            createController = function() {
                $injector.get('$controller')("ArtistDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'furyMusicApp:artistUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
