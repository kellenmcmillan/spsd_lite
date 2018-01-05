'use strict';

var myvault = angular.module('applab', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'ngMessages'
])

.controller('appLabController', [
'$rootScope', 
'$scope',  
'$window',  
'$mdDialog', 
'$mdMenu', 
'$timeout', 
'$http',
'$firebaseAuth',
'$firebaseObject',
'$location', 
function (
$rootScope, 
$scope, 
$window, 
$mdDialog, 
$mdMenu, 
$timeout, 
$http,
$firebaseAuth,
$firebaseObject,
$location)
{
    // Sign Up Dialog
    $scope.showPrimaryContainer = function(ev) {
        $mdDialog.show({
            controller: signupController,
            templateUrl: 'spa/home/dialogs/primary-standard-container-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            scope: $scope.$new()
        });
    };
    // Sign Up Dialog

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);






















/////////////////////////////////
