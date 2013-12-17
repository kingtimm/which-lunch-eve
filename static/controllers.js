angular.module('whichLunchApp.controllers', []).
    controller('LunchCtrl', ['$scope', 'LunchPlaces', '$location', '$http',
        function($scope, LunchPlaces, $location) {
            // Instantiate an object to store your scope data in (Best Practices)
            $scope.data = {};
            $scope.newPlaceText = '';
            var items = [];

            var listPlaces = function(etag) {
//                response = LunchPlaces.list(function(response) {
//                    // Assign the response INSIDE the callback
//                    $scope.data.places = response;
//
//                    $scope.randomPlace = response[Math.floor(Math.random() * response.length)];
//                });

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
                LunchPlaces.destroy(place._id, place.etag).
                    success(function(data, status, headers, config) {
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

        }])
        .controller('MyCtrl2', [function() {
        }]);