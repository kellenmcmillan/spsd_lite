'use strict';

var login = angular.module('login', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('loginController', ['$rootScope', '$scope', '$compile', '$window', '$http', '$timeout', function ($rootScope, $scope, $compile, $window, $http, $timeout){

    $rootScope.login_activated = false;
    $rootScope.login_state = 'Log In';
    $rootScope.login_button_text = 'Log In';

    // login dialog toggle
    $rootScope.toggle_log_in = function(){
        if ($rootScope.login_activated == false){
            $rootScope.login_activated = true;
        } else {
            $rootScope.login_activated = false;
        }
    }
    // login dialog toggle

    // login state handler
    $rootScope.login_state_change = function(state){
        console.log('login state change detect');
        if (state === 'Log In' && $rootScope.user == null){
            $rootScope.login_state = 'Log In';
            $rootScope.login_button_text = 'Log In';
            console.log('State Log In');
        } else if (state === 'Sign Up' && $rootScope.user == null) {
            $rootScope.login_state = 'Sign Up';
            $rootScope.login_button_text = 'Sign Up';
            console.log('State Sign Up');
        } else if (state === 'Signed In' || $rootScope.user !== null) {
            $rootScope.login_state = 'Signed In';
            $rootScope.login_button_text = 'Log Out';
            console.log('State Log Out');
        } else {
            $rootScope.login_button_text = null;
        }
    }
    // login state handler

    // login state handler
    $rootScope.login_action = function(action){
        if (action == 'Log In'){
            signin();
        } else if (action == 'Sign Up') {
            signup();
        } else if (action == 'Signed In') {
            logout();
        } else {
            return null;
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
            $rootScope.login_state = 'Log In';
            $rootScope.login_state_change('Log In');
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
                $rootScope.login_state = 'Signed In';
                $rootScope.login_state_change('Signed In');
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


