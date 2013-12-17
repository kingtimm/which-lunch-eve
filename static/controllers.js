angular.module('whichLunchApp.controllers', []).
    controller('LunchCtrl', ['$scope', 'LunchPlaces', '$location', '$http',
        function($scope, LunchPlaces, $location) {
            $scope.data = {};
            $scope.newPlaceText = '';
            var items = [];

            var listPlaces = function(etag) {
                LunchPlaces.list(etag).
                    success(function(data, status, headers, config){
                        items = angular.fromJson(data._items);
                        $scope.data.places = items;
                        console.log('Total Places: ' + items.length);

                        $scope.randomPlace = items[Math.floor(Math.random() * items.length)];

                        $location.path('/');
                        console.log('Listing Response ' + status);
                    }).error(function(data, status, headers, config){
                        console.log('Listing Response ' + status);
                    })
            };

            listPlaces();

            $scope.addPlace = function() {
                LunchPlaces.add($scope.newPlaceText).
                    success(function(data, status, headers, config) {

                        listPlaces();
                    });
                $scope.newPlaceText = '';
            };

            $scope.removePlace = function(place) {
                // eve requires etag to be passed in for deletion (versioning)
                LunchPlaces.destroy(place._id, place.etag).
                    success(function(data, status, headers, config) {
                        // eve caches the list of items unless an "If-None-Match" header is passed w/ etag
                        listPlaces(place.etag);
                    });
                $scope.newPlaceText = '';

            };

            $scope.tryAgain = function() {
                var noRepeatList = items.slice();
                var index = noRepeatList.indexOf($scope.randomPlace);
                if (index > -1) {
                    noRepeatList.splice(index, 1);
                }

                $scope.randomPlace = noRepeatList[Math.floor(Math.random() * noRepeatList.length)]
            }
        }]);