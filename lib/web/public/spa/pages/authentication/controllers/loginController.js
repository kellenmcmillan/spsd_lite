'use strict';

var login = angular.module('login', [
'ngResource', 
'ngAnimate'
])
.controller('loginController', [
'$rootScope', 
'$scope',  
'$timeout', 
'$window', 
'$location',   
'$route', 
'$q',  
'$firebaseAuth',
'$firebaseObject',
'users_data',
function (
$rootScope, 
$scope,  
$timeout, 
$window,  
$location,   
$route, 
$q, 
$firebaseAuth,
$firebaseObject,
users_data){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();

    ////////////////////////////////// Firebase Reference
    var usersBucket = realtimeDatabase.ref().child('users');
    var appDataBucket = realtimeDatabase.ref().child('appData');
    ////////////////////////////////// Firebase Reference

    //Sign In
    $scope.signIn = function(){
        $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user) {
            // Close Dialog
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "You are now logged in."
                    }
                });
            }, 500);
        }).catch(function(error) {
            // Cancel Dialog
        });
    };

}]);