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
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');

    // Update Me
    // newUser["personal_info"]["email"] = $scope.newUser.email;
    $scope.updateMe = function(user){
        var data = {
            address : {
                city : (user.city ? user.city : undefined),
                state : (user.state ? user.state : undefined),
                street : (user.street ? user.street : undefined),
                zipcode : (user.zipcode ? user.zipcode : undefined)
            },
            birthday : (user.birthday ? user.birthday : undefined),
            firstname : (user.firstname ? user.firstname : undefined),
            lastname : (user.lastname ? user.lastname : undefined),
            phone : (user.phone ? user.phone : undefined),
            security : {
                email : (user.email ? user.email : undefined),
                locked_out : (user.locked_out ? user.locked_out : false),
                roles : {
                    management : (user.role == 'management' ? true : false)
                },
                security_question_1 : (user.security_question_1 ? user.security_question_1 : undefined)
            }
        }
        usersBucket.child(user.id).update(data);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success! User Updated."
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
