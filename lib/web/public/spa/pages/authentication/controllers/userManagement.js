'use strict';

var userManagement = angular.module('userManagement', [
'ngResource', 
'ngAnimate'
])
.controller('userManagementController', [
'$rootScope', 
'$scope',  
'$timeout', 
'$window', 
'$location',   
'$route', 
'$q',  
'$firebaseAuth',
'$firebaseObject',
'$routeParams',
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
$routeParams,
users_data){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();

    ////////////////////////////////// Firebase Reference
    var usersBucket = realtimeDatabase.ref().child('users');
    var appDataBucket = realtimeDatabase.ref().child('appData');
    ////////////////////////////////// Firebase Reference

    var mode = $routeParams.mode;
    var actionCode = $routeParams.oob;
    var auth = $firebaseAuth();

    function handleResetPassword(auth, actionCode) {
        var accountEmail;
        // Verify the password reset code is valid.
        $rootScope.auth.verifyPasswordResetCode(actionCode).then(function(email) {
            $rootScope.accountEmailPasswordReset = email;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.
            $resetPasswordScreen = true;

            // Save the new password.
            $rootScope.auth.confirmPasswordReset(actionCode, $rootScope.resetPassword).then(function(resp) {
                // Password reset has been confirmed and new password updated.
                $timeout(function(){
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Password Updated!"
                        }
                    });
                }, 500);
                $location.path("/login");
            }).catch(function(error) {
                // Error occurred during confirmation. The code might have expired or the
                // password is too weak.
            });
        }).catch(function(error) {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
        });
    }

    switch (mode) {
        case 'resetPassword':
        // Display reset password handler and UI.
        handleResetPassword(auth, actionCode, continueUrl);
        break;
        case 'recoverEmail':
        // Display email recovery handler and UI.
        handleRecoverEmail(auth, actionCode);
        break;
        case 'verifyEmail':
        // Display email verification handler and UI.
        handleVerifyEmail(auth, actionCode, continueUrl);
        break;
        default:
        // Error: invalid mode.
    }

    //Sign In
    $scope.signIn = function(){
        $rootScope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user) {
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