'use strict';

var tags = angular.module('tags', ['firebase']);

tags.factory('tag_data', ['$http', function($http){

	// Storage Init
	var realtimeDatabase = firebase.database();
    var tagBucket = realtimeDatabase.ref().child('tags');
    // Storage Init

    var taglist = [];
    tagBucket.on('value')
    .then(function(snapshot) {
        console.log("value received");
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var childDataValue = childData.tag;
            console.log('child found ' + childDataValue);
            taglist.push(childDataValue);
        });
        console.log(taglist);
    });

    return {
        get: function () {
            return taglist;
        }
    }
}]);