'use strict';

var api = angular.module('api', []);

api.factory('API', ['$timeout', '$location', '$http', function($timeout, $location, $https){

    var oktaSignIn = new OktaSignIn({
        baseUrl: "https://dev-684984.oktapreview.com",
        clientId: "0oadaebmmwTBs2YQb0h7",
        authParams: {
            issuer: "https://dev-684984.oktapreview.com/oauth2/default",
            responseType: ['token', 'id_token'],
            display: 'page'
        }
    });

	return {

		getMyVault: function(){

            var accessToken = oktaSignIn.tokenManager.get("accessToken");

            if (!accessToken) {
                return;
            }

            $http({
                url: ('/api/router/myvault/get'),
                method: 'GET',
                headers: {
                    Authorization : 'Bearer ' + accessToken.accessToken
                }
            });
        }
	}

}]);