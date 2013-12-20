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
                if(etag) {
                    return $http.get(base_url, {headers:{'If-None-Match': etag}})
                } else {
                    return $http.get(base_url)
                }
            }
        }
    });