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

    var usersBucket = realtimeDatabase.ref().child('users');

    //State Abbreviate Select Field
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    //State Abbreviate Select Field

    // Update Me
    // newUser["personal_info"]["email"] = $scope.newUser.email;
    $scope.updateMe = function(user){
        var childDataValue = {};
        childDataValue.personal_info = {};
        childDataValue.personal_info.address = {};
        childDataValue.role = {};
        if(user.personal_info.firstname){
            childDataValue.firstname = user.personal_info.firstname;
        }
        if(user.personal_info.lastname){
            childDataValue.lastname = user.personal_info.lastname;
        }
        if(user.personal_info.birthday){
            childDataValue.birthday = user.personal_info.birthday;
        }
        if(user.personal_info.email){
            childDataValue.email = user.personal_info.email;
        }
        if(user.personal_info.phone){
            childDataValue.phone = user.personal_info.phone;
        }
        if(user.personal_info.address.street){
            childDataValue.personal_info.address.street = user.personal_info.street;
            childDataValue.personal_info.address.city = user.personal_info.address.city;
            childDataValue.personal_info.address.state = user.personal_info.address.state;
            childDataValue.personal_info.address.zipcode = user.personal_info.address.zipcode;
        }
        if(user.role.alias){
            childDataValue.role.alias = user.role.alias;
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
