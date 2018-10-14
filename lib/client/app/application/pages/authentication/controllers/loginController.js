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
    $rootScope.progressAnimation = false;
    $scope.signIn = function(){
        $rootScope.progressAnimation = true;
        $rootScope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user) {
            
            $timeout(function(){
               $rootScope.progressAnimation = false;
            }, 2000);

            if ($location.path() == '/login'){
                $window.location.href = "/";
            }

        }).catch(function(error) {
             $rootScope.progressAnimation = false;
        });
    };

}]);