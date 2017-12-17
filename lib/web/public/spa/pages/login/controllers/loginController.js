'use strict';

var login = angular.module('login', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('loginController', ['$rootScope', '$scope', '$compile', '$window', '$http', '$timeout', function ($rootScope, $scope, $compile, $window, $http, $timeout){

    $rootScope.login_activated = false;
    $rootScope.login_state = login;
    $rootScope.login_button;

    // login button states 
    var buttonState = [
        {
            text: 'Log In',
            action: signin()
        },
        {
            text: 'Sign Up',
            action: signup()
        },
        {
            text: 'Log Out',
            action: logout()
        }
    ];
    // login button states

    // login dialog toggle
    $scope.toggle_log_in = function(){
        if ($rootScope.login_activated = false){
            $rootScope.login_activated = true;
        } else {
            $rootScope.login_activated = false;
        }
    }
    // login dialog toggle

    // login state handler
    $scope.login_state_change = function(){
        if ($rootScope.login_state = login){
            $rootScope.login_button = buttonState[0];
        } else if ($rootScope.login_state = signup) {
            $rootScope.login_button = buttonState[1];
        } else if ($rootScope.login_state = signedIn) {
            $rootScope.login_button = buttonState[2];
        } else {
            $rootScope.login_button = null;
        }
    }
    // login state handler

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

    $scope.signup = signup;
    $scope.signin = signin;
    $scope.logout = logout;

    function init() {
        $scope.signinData = {};
        $scope.signupData = {};
    }

    init();

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}]).directive('contentAvailable', ['$location', function($location){
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


