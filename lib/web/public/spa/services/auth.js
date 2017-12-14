'use strict';

var auth = angular.module('auth', []);

auth.service('auth', ['angularAuth0', '$timeout', '$location', function(angularAuth0, $timeout, $location){
    
    function login() {
      	angularAuth0.authorize();
    }
    
    function handleAuthentication() {
		angularAuth0.parseHash(function(err, authResult) {
			if (authResult && authResult.accessToken && authResult.idToken) {
				setSession(authResult);
				$location.path('/myvault');
			} else if (err) {
				$timeout(function() {
				$location.path('/login');
			});
			console.log(err);
			alert('Error: ' + err.error + '. Check the console for further details.');
			}
		});
    }

    function setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
    }
    
    function logout() {
		// Remove tokens and expiry time from localStorage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		$location.path('/');
    }
    
    function isAuthenticated() {
		// Check whether the current time is past the 
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
    }

    return {
		login: login,
		handleAuthentication: handleAuthentication,
		logout: logout,
		isAuthenticated: isAuthenticated
    }

}]);