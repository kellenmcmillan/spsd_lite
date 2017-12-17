'use strict';

var authentication = angular.module('authentication', ['ngResource'])

.controller('authentication_controller', ['$rootScope', '$scope', '$http', '$timeout', '$location', function ($rootScope, $scope, $http, $timeout, $location) {

    $scope.login_screen_state = 0;

    $scope.login_screen_titles = ["Sign In or Sign Up", "Sign In", "Sign Up", "Sign Up", "Recover Password", "Recover Password"];
    
    $scope.login_screens = [
        {
            "screen": [
                {
                    "button_text": "Sign In",
                    "action": function(){ return $scope.login_screen_state = 1; }
                },
                {
                    "button_text": "Sign Up",
                    "action": function(){ return $scope.login_screen_state = 2; }
                }
            ]
        },
        {
            "screen": [
                {
                    "button_text": "Cancel",
                    "action": function(){ return $scope.login_screen_state = 0; }
                },
                {
                    "button_text": "Sign In",
                    "action": function(){ return $scope.signin(); }
                }
            ]
        },
        {
            "screen": [
                {
                    "button_text": "Cancel",
                    "action": function(){ return $scope.login_screen_state = 0; }
                },
                {
                    "button_text": "Next",
                    "action": function(){ return $scope.login_screen_state = 3; }
                }
            ]
        },
        {
            "screen": [
                {
                    "button_text": "Back",
                    "action": function(){ return $scope.login_screen_state = 2; }
                },
                {
                    "button_text": "Sign Up",
                    "action": function(){ return $scope.signup(); }
                }
            ]
        }
    ];

    function signup() {
        
        $http({
            url: ("/api/router/signup"),
            method: 'PUT',
            data: $scope.signupData,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function success(response) {
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Sign Up Successful. You May Now Login.",
                        timeout: 3000,
                    }
                });
            }, 500);
        }, function errorCallback(response){
            $rootScope.messageStatus = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: 'Problem Performing This Action',
                        timeout: 3000,
                    }
                });
            }, 500);
        });
    }

    function logout() {
        
        $http({
            url: ("/api/router/signout"),
            method: 'POST'
        })
        .then(function success(response) {
            $rootScope.user = null;
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Successfully Signed Out",
                        timeout: 3000,
                    }
                });
               $location.url("/");
            }, 500);
        }, function errorCallback(response){
            $rootScope.messageStatus = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: 'Problem Performing This Action',
                        timeout: 3000,
                    }
                });
            }, 500);
        });
    }

    function signin() {
        
        $http({
            url: ("/api/router/signin"),
            method: 'POST',
            data: $scope.signinData,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function success(response) {
            // Authenticated
            if (response.status == 200) {
                $rootScope.user = response;
            // Not Authenticated
            } else {
              $rootScope.user = null;
            }
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Welcome " + response.data.personal_info.firstname,
                        timeout: 3000,
                    }
                });
            }, 500);
        }, function errorCallback(response){
            $rootScope.messageStatus = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: 'Problem Performing This Action',
                        timeout: 3000,
                    }
                });
            }, 500);
        });
    }

    function checkLogin() {
        
        $http({
            url: ("/api/router/signedin"),
            method: 'GET'
        })
        .then(function success(response) {
            // Authenticated
            if (response.status == 200) {
                $rootScope.user = response;
            // Not Authenticated
            } else {
              $rootScope.user = null;
            }
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Welcome Back " + response.data.personal_info.firstname,
                        timeout: 3000,
                    }
                });
            }, 500);
        }, function errorCallback(response){
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: 'Welcome',
                        timeout: 3000,
                    }
                });
            }, 500);
        });
    }


    $scope.signup = signup;
    $scope.signin = signin;
    $scope.logout = logout;

    function init() {
        $scope.signinData = {};
        $scope.signupData = {};
        checkLogin(); 
    }

    init();

}]);
