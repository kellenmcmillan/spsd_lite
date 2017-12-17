'use strict';

var login = angular.module('login', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('loginController', ['$rootScope', '$scope', '$compile', '$window', '$http', '$timeout', function ($rootScope, $scope, $compile, $window, $http, $timeout){

    init();
    $scope.login_attempt_active = false;
    $scope.registered = true;
    $scope.registration_section = 0;
    $scope.registration_completed = false;
    $scope.adminError = false;
    $scope.beginRegistration = function () {
        $scope.registered = false; 
        $scope.registration_section = 1;
    }
    $scope.nextRegistrationStep = function () {
        $scope.registration_section = 2;
    }
    $scope.previousRegistrationStep = function () {
        $scope.registration_section--;
        if ($scope.registration_section <= 0){
            $scope.registration_section = 0;
            $scope.registered = true;
        }
    }

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


