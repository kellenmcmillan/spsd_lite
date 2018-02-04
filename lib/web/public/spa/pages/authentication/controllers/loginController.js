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
    ////////////////////////////////// Firebase Reference

    //Sign In
    $scope.signIn = function(){
        $rootScope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user) {
            if ($location.path() == '/login'){
                $window.location.href = "/";
            }
        }).catch(function(error) {
            // Cancel Dialog
        });
    };

}]);