angular.module('whichLunchApp.services', ['ngResource'])
    .factory('LunchPlaces', function($resource, $http){
        return {
            destroy: function(id, etag) {
                console.log('Deleting place: '+ id);
                return $http.delete('/api/places/'+id, {headers:{'If-Match': etag}});
            },
            add: function(name) {
                console.log('Adding place: '+ name);
                return $http.post('/api/places', {'name':name})
            },
            list: function(etag) {
                console.log('Listing all places');
                if(etag) {
                    return $http.get('/api/places', {headers:{'If-None-Match': etag}})
                } else {
                    return $http.get('/api/places')
                }
            }
        }
    });