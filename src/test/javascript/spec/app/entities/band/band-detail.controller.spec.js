'use strict';

describe('Controller Tests', function() {

    describe('Band Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockBand, MockCountry, MockGenre, MockFavouriteBand, MockHatred, MockConcerts, MockSocial, MockArtistBandStatus;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockBand = jasmine.createSpy('MockBand');
            MockCountry = jasmine.createSpy('MockCountry');
            MockGenre = jasmine.createSpy('MockGenre');
            MockFavouriteBand = jasmine.createSpy('MockFavouriteBand');
            MockHatred = jasmine.createSpy('MockHatred');
            MockConcerts = jasmine.createSpy('MockConcerts');
            MockSocial = jasmine.createSpy('MockSocial');
            MockArtistBandStatus = jasmine.createSpy('MockArtistBandStatus');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Band': MockBand,
                'Country': MockCountry,
                'Genre': MockGenre,
                'FavouriteBand': MockFavouriteBand,
                'Hatred': MockHatred,
                'Concerts': MockConcerts,
                'Social': MockSocial,
                'ArtistBandStatus': MockArtistBandStatus
            };
            createController = function() {
                $injector.get('$controller')("BandDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'furyMusicApp:bandUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
