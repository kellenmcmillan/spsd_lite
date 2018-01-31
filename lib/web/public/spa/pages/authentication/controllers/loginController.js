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



//////////////////////////////////////////// authentication handler
    // Log in Dialog
    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            controller: loginController,
            templateUrl: 'spa/partials/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    // Log in Dialog
    // Sign Up Dialog
    $scope.showSignUpDialog = function(ev) {
        $mdDialog.show({
            controller: signupController,
            templateUrl: 'spa/partials/signup.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    // Sign Up Dialog

    function loginController($scope, $mdDialog, $firebaseAuth, $firebaseObject) {
        //Sign In
        $scope.signIn = function(){
            $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(user) {
                // Close Dialog
                $mdDialog.hide();
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "You are now logged in."
                        }
                    });
                }, 500);
            }).catch(function(error) {
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
    }
    function signupController($scope, $mdDialog, $firebaseAuth, $firebaseArray) {
        //Create New User In Authentication Database
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;
            //Create New User In Authentication Database Using Email + Password Combination
            $scope.auth.$createUserWithEmailAndPassword(
                $scope.newUser.email, 
                $scope.newUser.password
            )
            .then(function(user) {
                // Add Successfully Signed Up User To User Profile Database
                storeUserInDatabase(user);
                // Close Dialog
                $mdDialog.hide();
            }).catch(function(error) {
                //Log Signup Error
                console.error("Error: ", error);
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
        //Create New User In Authentication Database
        // Add Successfully Signed Up User To Database
        var storeUserInDatabase = function(user){
            var newUser = {};
            newUser.email = $scope.newUser.email;
            var storeUser = usersBucket.child(user.uid).set(newUser);
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! You are now logged in."
                    }
                });
            }, 500);
        }
        // Add Successfully Signed Up User To Database
    }