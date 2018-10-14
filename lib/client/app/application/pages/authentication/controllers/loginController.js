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
'$http',
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
users_data,
$http){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();

    ////////////////////////////////// Firebase Reference
    var usersBucket = realtimeDatabase.ref().child('users');
    ////////////////////////////////// Firebase Reference

    //Sign In
    $rootScope.progressAnimation = false;

    function signInVerified(){
        
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


    $rootScope.signIn = function(){
        $rootScope.progressAnimation = true;
        var data = {
            recaptcha : $scope.login_recaptcha
        };

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/checkRecaptcha"),
            method: 'POST',
            data: data
        })
        .then(function success (response) {
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Recaptcha Verified"
                    }
                });
            }, 500);
            signInVerified();
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Failed To Delete User. ' + response.message
                }
            });
        });
    }

}]);