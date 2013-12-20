angular.module('whichLunchApp.services', [])
    .factory('LunchPlaces', function($http){

        var base_url = '/api/places/';

        return {
            destroy: function(id, etag) {
                console.log('Deleting place: '+ id);
                return $http.delete(base_url+id, {headers:{'If-Match': etag}});
            },
            add: function(name) {
                console.log('Adding place: '+ name);
                return $http.post(base_url, {'name':name})
            },
            list: function(etag) {
                console.log('Listing all places');
                return $http.get(base_url, {headers:{'If-None-Match': etag}})
            },
            update: function(place) {
                console.log('Updating place: '+ place.name);
                return $http.put(base_url+place._id, {name:place.name}, {headers:{'If-Match':place.etag}})
            }
        }
    }).factory('Alerts', function($rootScope) {

        var showDuration = 3000;

        var bootstrapAlertTypeMap = {
            success: 'alert alert-success',
            info: 'alert alert-info',
            warning: 'alert alert-warning',
            danger: 'alert alert-danger'
        };

        $rootScope.alerts = [];
        var alertObjects = [];

        return {
            add: function(type, msg) {

                type = bootstrapAlertTypeMap[type];
                var alertObject = {'type': type, 'msg': msg};
                $rootScope.alerts.push(alertObject);

                setTimeout(function(){
                    $rootScope.alerts.splice(
                        $rootScope.alerts.indexOf(alertObject), 1);
                        $rootScope.$apply();
                },showDuration)
            }
        }
    });