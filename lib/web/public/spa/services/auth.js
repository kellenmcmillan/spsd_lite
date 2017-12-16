'use strict';

var auth = angular.module('auth', ['angular-jwt']);

auth.service('auth', ['angularAuth0', '$timeout', '$location', 'authManager', 'jwtHelper', function(angularAuth0, $timeout, $location, authManager, jwtHelper){
    
    var userProfile;
    var logged_in_user = {};

    function login() {
      	angularAuth0.authorize();
    }
    
    function handleParseHash() {
      	angularAuth0.parseHash(
	        { _idTokenVerification: false },
	        function(err, authResult) {
		        if (err) {
		          	console.log(err);
		        }
		        if (authResult && authResult.idToken) {
		          	setUser(authResult);
		          	$location.path('/').replace();
		        }
	      	}
      	);
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
      	var profile = jwtHelper.decodeToken(authResult.idToken);
      	localStorage.setItem('profile', JSON.stringify(profile));
    }

// "sub": "google-oauth2|100975831197898293009",
// "given_name": "Kellen",
// "family_name": "McMillan",
// "nickname": "make_it",
// "name": "Kellen McMillan",
// "picture": "https://lh4.googleusercontent.com/-I_z971iDP6E/AAAAAAAAAAI/AAAAAAAAAI4/gj47ZIXQcO8/photo.jpg",
// "gender": "male",
// "locale": "en",
// "updated_at": "2017-12-16T03:43:24.393Z"

    function isAuthenticated() {
      return authManager.isAuthenticated();
    }




    function setUserProfile(profile) {
      	userProfile = profile;
    }

    function getCachedProfile() {
      	return userProfile;
    }

    function getProfile(){
    	return logged_in_user;
    }

  //   function setSession(authResult) {
		// let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		// localStorage.setItem('access_token', authResult.accessToken);
		// localStorage.setItem('id_token', authResult.idToken);
		// localStorage.setItem('expires_at', expiresAt);
  //   }
    
  //   function logout() {
		// localStorage.removeItem('access_token');
		// localStorage.removeItem('id_token');
		// localStorage.removeItem('expires_at');
		// $location.path('/');
  //   }
    
  //   function isAuthenticated() {
		// Check whether the current time is past the 
		// access token's expiry time
		// let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		// return new Date().getTime() < expiresAt;
  //   }

    return {
		login: login,
      	handleParseHash: handleParseHash,
      	logout: logout,
      	isAuthenticated: isAuthenticated,
      	getProfile: getProfile
    }

}]);