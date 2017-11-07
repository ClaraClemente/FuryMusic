'use strict';

describe('Controller Tests', function() {

    describe('Song Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSong, MockAlbum, MockFavouriteSong, MockCollection;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSong = jasmine.createSpy('MockSong');
            MockAlbum = jasmine.createSpy('MockAlbum');
            MockFavouriteSong = jasmine.createSpy('MockFavouriteSong');
            MockCollection = jasmine.createSpy('MockCollection');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Song': MockSong,
                'Album': MockAlbum,
                'FavouriteSong': MockFavouriteSong,
                'Collection': MockCollection
            };
            createController = function() {
                $injector.get('$controller')("SongDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'furyMusicApp:songUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
