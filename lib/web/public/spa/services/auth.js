'use strict';

var auth = angular.module('auth', []);

auth.service('auth', ['$timeout', '$location', function($timeout, $location){

    function login() {

    }
    
    function handleParseHash() {

    }

    function logout() {
      	localStorage.removeItem('access_token');
      	localStorage.removeItem('id_token');
      	localStorage.removeItem('expires_at');
    }

    function setUser(authResult) {
    	// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      	localStorage.setItem('access_token', authResult.accessToken);
      	localStorage.setItem('id_token', authResult.idToken);
      	localStorage.setItem('expires_at', expiresAt);
    }


    function isAuthenticated() {

    }




    function setUserProfile(profile) {

    }

    function getCachedProfile() {

    }

    function getProfile(){

    }

    return {
		login: login,
      	handleParseHash: handleParseHash,
      	logout: logout,
      	isAuthenticated: isAuthenticated,
      	getProfile: getProfile
    }

}]);