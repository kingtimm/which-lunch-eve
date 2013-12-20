angular.module('whichLunchApp.controllers', []).
    controller('LunchCtrl', ['LunchPlaces', '$rootScope', 'Alerts',
        function(LunchPlaces, $rootScope, Alerts) {
            var app = this;

            app.data = {};
            app.newPlaceText = '';
            app.items = [];

            function randomizePlace() {
            // Select a random place.
                if (app.items.length > 0) {
                    app.randomPlace = app.items[Math.floor(Math.random()
                        * app.items.length)];
                } else {
                    app.randomPlace = {
                        name: 'No Items'
                    }
                }
             }

            app.listPlaces = function(etag) {
                LunchPlaces.list(etag).
                    success(function(data, status, headers, config){
                        app.items = angular.fromJson(data._items);
                        console.log('Total Places: ' + app.items.length);
                        randomizePlace();
                    }).error(function(data, status, headers, config){
                        console.log('Listing Response ' + status);
                    })
            };

            app.listPlaces();

            app.addPlace = function(name) {
                LunchPlaces.add(name).
                    success(function(data, status, headers, config) {
                        if (data.status === 'OK') {

                            data.name = name;
                            app.items.push(data);
                            Alerts.add('success', 'Successfully added '+name)
                        }
                        else {
                            Alerts.add('danger',data.issues[0]);
                        }

                    });
                app.newPlaceText = '';
            };

            app.removePlace = function(place) {
                // eve requires etag to be passed in for deletion (versioning)
                LunchPlaces.destroy(place._id, place.etag).
                    success(function(data, status, headers, config) {
                        // eve caches the list of items unless an
                        // "If-None-Match" header is passed w/ etag
                        app.items.splice(app.items.indexOf(place), 1);
                        Alerts.add('success', 'Successfully deleted '+name)
                    });
                app.newPlaceText = '';

            };

            app.updatePlace = function(place) {
                LunchPlaces.update(place).
                    success(function(data, status, headers, config) {
                        // eve caches the list of items unless an
                        // "If-None-Match" header is passed w/ etag
                        place.etag = data.etag;
                        Alerts.add('success', 'Successfully updated '+name)
                    }).
                    error(function(data, status, headers, config){
                        if (status == 412){
                            Alerts.add('danger', 'Someone else might have edited' +' ' + place.name + '. Please refresh page.')
                        }
                        else {
                            Alerts.add('danger', 'Something bad happened, ' +
                                'not sure what.')
                        }
                    });
            };

            app.tryAgain = function() {
                var noRepeatList = app.items.slice();
                var index = noRepeatList.indexOf(app.randomPlace);
                if (index > -1) {
                    noRepeatList.splice(index, 1);
                }

                app.randomPlace = noRepeatList[
                    Math.floor(Math.random() * noRepeatList.length)]
            }
        }]);