'use strict';

var lightweight = angular.module('lightweight', [
'ngResource', 
'ngAnimate'
])
.controller('lightweightController', [
'$rootScope', 
'$scope',  
'$timeout', 
'$location', 
'$route', 
'$q',
'$firebaseAuth',
'getUser',
function (
$rootScope, 
$scope,  
$timeout,  
$location, 
$route, 
$q,
$firebaseAuth,
getUser){

    ////////////////////////////////// Firebase Init
    var realtimeDatabase = firebase.database();
    ////////////////////////////////// Firebase Init


    ////////////////////////////////// Firebase References
    var usersBucket = realtimeDatabase.ref().child('users');
    ////////////////////////////////// Firebase References

   
    ////////////////////////////////// Firebase Scoped Variables
    $rootScope.auth = $firebaseAuth();
    ////////////////////////////////// Firebase Scoped Variables
    

    ////////////////////////////////// Firebase Methods
    $rootScope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
            getUser.me(user.uid)
            .then(function(result){
                $rootScope.me = result;
                if(result.firstname){
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Welcome " + result.firstname + "!"
                            }
                        });
                    }, 500);
                } else {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Welcome " + user.security.email + "!"
                            }
                        });
                    }, 500);
                }
            });
        } else {
            $rootScope.user = null;
            if($location.path() == "/myvault"){
                location.path("/logged-out");
            }
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Welcome To SPSD!"
                    }
                });
            }, 500);
        }
    });
    ////////////////////////////////// Firebase Methods


    ////////////////////////////////// Regular Scoped Methods

    ////////////////////////////////// Regular Scoped Methods
}])

////////////////////////////////////// Firebase Factory Functions
.factory('getUser', function($q){
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    var me = function(id){
        var defer = $q.defer();
        var user = {};
        usersBucket.child(id).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            var data = {
                address : {
                    city : (childData.address.city ? childData.address.city : undefined),
                    state : (childData.address.state ? childData.address.state : undefined),
                    street : (childData.address.street ? childData.address.street : undefined),
                    zipcode : (childData.address.zipcode ? childData.address.zipcode : undefined)
                },
                birthday : (childData.birthday ? childData.birthday : undefined),
                firstname : (childData.firstname ? childData.firstname : undefined),
                lastname : (childData.lastname ? childData.lastname : undefined),
                phone : (childData.phone ? childData.phone : undefined),
                security : {
                    email : (childData.security.email ? childData.security.email : undefined),
                    locked_out : (childData.security.locked_out ? childData.security.locked_out : false),
                    roles : security.roles,
                    security_question_1 : (childData.security.security_question_1 ? childData.security.security_question_1 : undefined)
                },
                id : id
            }
            defer.resolve(data); 
        });
        return defer.promise;
    }
    return {
        me: me
    }
})
////////////////////////////////////// Firebase Factory Functions
;



