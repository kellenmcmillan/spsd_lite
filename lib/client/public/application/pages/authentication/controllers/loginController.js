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

    // //Sign In
    // $rootScope.progressAnimation = false;
    // $scope.signIn = function(){
    //     $rootScope.progressAnimation = true;
    //     $rootScope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
    //     .then(function(user) {
            
    //         $timeout(function(){
    //            $rootScope.progressAnimation = false;
    //         }, 2000);

    //         if ($location.path() == '/login'){
    //             $window.location.href = "/";
    //         }

    //     }).catch(function(error) {
    //         $rootScope.progressAnimation = false;
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log("Code: " + errorCode + " Message: " + errorMessage);
    //     });
    // };

    // $scope.sign_up = {};
    // $scope.signUp = function(){

    //     $rootScope.progressAnimation = true;

    //     $rootScope.auth.$createUserWithEmailAndPassword($scope.sign_up.email, $scope.sign_up.password)
    //     .then(function(user) {

    //         user.security.roles = 'basic';

    //         // Store user in database
    //         usersBucket.child(user.uid).set(user)
    //         .then(function(){
    //             $rootScope.$broadcast('server-event', {
    //                 data:{
    //                     message: "Resource Added"
    //                 }
    //             });
    //         }).catch(function(error) {
    //             $timeout(function(){
    //                 $rootScope.$broadcast('server-event', {
    //                     data:{
    //                         message: "Error Adding Resource"
    //                     }
    //                 });
    //             }, 500);
    //         });

    //         // save event
            
    //         // Redirect user to homepage
    //         $timeout(function(){
    //            $rootScope.progressAnimation = false;
    //         }, 2000);

    //         if ($location.path() == '/login'){
    //             $window.location.href = "/";
    //         }

    //     }).catch(function(error) {
    //         $rootScope.progressAnimation = false;
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log("Code: " + errorCode + " Message: " + errorMessage);
    //     });
    // };

}]);