// 'use strict';

// var login = angular.module('login', [
// 'ngResource', 
// 'ngAnimate'
// ])
// .controller('loginController', [
// '$rootScope', 
// '$scope',  
// '$timeout', 
// '$window', 
// '$location',   
// '$route', 
// '$q',  
// '$firebaseAuth',
// '$firebaseObject',
// 'users_data',
// function (
// $rootScope, 
// $scope,  
// $timeout, 
// $window,  
// $location,   
// $route, 
// $q, 
// $firebaseAuth,
// $firebaseObject,
// users_data){

//     var realtimeDatabase = firebase.database();
//     var firebaseStorage = firebase.storage();

//     ////////////////////////////////// Firebase Reference
//     var usersBucket = realtimeDatabase.ref().child('users');
//     ////////////////////////////////// Firebase Reference

//     //Sign In
//     $rootScope.progressAnimation = false;
//     $scope.signIn = function(){
//         $rootScope.progressAnimation = true;
//         $rootScope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
//         .then(function(user) {
            
//             $timeout(function(){
//                $rootScope.progressAnimation = false;
//             }, 2000);

//             if ($location.path() == '/login'){
//                 $window.location.href = "/";
//             }

//         }).catch(function(error) {
//              $rootScope.progressAnimation = false;
//         });
//     };

// }]);

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
'$http', 
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
$http, 
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

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/checkRecaptcha"),
            method: 'POST',
            recaptcha: $scope.login_recaptcha;
        })
        .then(function success (response) {
            $rootScope.messageStatus = true;
            // $rootScope.progressAnimation = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Recaptcha Verified"
                    }
                });
            }, 500);
            login();
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.progressAnimation = false;
            $rootScope.$broadcast('server-event', {
                data:{
                message: 'Recaptcha Verification Failed.'
                }
            });
        });

    };

    var login = function(){
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
    }

}]);