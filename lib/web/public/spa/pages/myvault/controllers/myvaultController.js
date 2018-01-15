'use strict';

var myvault = angular.module('myvault', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
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
'users_data', 
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
$location,
users_data)
{   
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');

    //State Abbreviate Select Field
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    //State Abbreviate Select Field

    // Update Me
    // newUser["personal_info"]["email"] = $scope.newUser.email;
    $scope.updateMe = function(user){
        var childDataValue = {};
        childDataValue = {};
        childDataValue.address = {};
        childDataValue.role = {};
        if(user.firstname){
            childDataValue.firstname = user.firstname;
        }
        if(user.lastname){
            childDataValue.lastname = user.lastname;
        }
        if(user.birthday){
            childDataValue.birthday = user.birthday;
        }
        if(user.email){
            childDataValue.email = user.email;
        }
        if(user.phone){
            childDataValue.phone = user.phone;
        }
        if(user.street){
            childDataValue.street = user.street;
            childDataValue.city = user.city;
            childDataValue.state = user.state;
            childDataValue.zipcode = user.zipcode;
        }
        if(user.role){
            childDataValue.role = user.role;
        }
        usersBucket.child(user.id).update(childDataValue);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success! You updated your account."
                }
            });
        }, 500);
    }
    // Update Me

    // Delete User
    $scope.deleteUser = function(){
        var user = $rootScope.user;
        var userRef = firebase.database().ref("users").child(user.uid);
        var userObject = $firebaseObject(userRef);
        userObject.$remove().then(function(userRef) {
            console.log("User successfully removed from user database");
            // Delete User
            $scope.auth.$deleteUser().then(function() {
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Account removed!"
                        }
                    });
                }, 500);
                $location.path("/");
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
