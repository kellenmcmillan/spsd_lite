'use strict';

var myvault = angular.module('myvault', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'ngMessages'
])

.controller('myvaultController', [
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
    //State Abbreviate Select Field
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    //State Abbreviate Select Field
    // Delete User
    $scope.deleteUser = function(){
        var user = $rootScope.user;
        var userRef = firebase.database().ref("users").child(user.uid);
        var userObject = $firebaseObject(userRef);
        userObject.$remove().then(function(userRef) {
            console.log("User successfully removed from user database");
            // Delete User
            $scope.auth.$deleteUser().then(function() {
                console.log("User removed from auth database successfully!");
                if($location.path() === "/myvault"){
                    $location.path("/");
                }
            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }, function(error) {
            console.log("Error:", error);
        }); 
    }
    // Delete User
}])
.directive('contentAvailable', ['$timeout', function($timeout){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){
            $('#default-page-loading').fadeOut('slow');
        });
    }
}]);






















/////////////////////////////////
