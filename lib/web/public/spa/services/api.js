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

    function apiMyVault(){

        var accessToken = oktaSignIn.tokenManager.get("accessToken");

        if (!accessToken) {
            return;
        }

        $http({
            url: ('/myvault/get'),
            method: 'GET',
            headers: {
                Authorization : 'Bearer ' + accessToken.accessToken
            }
        })
        .then(function myvaultsuccess(response) {
            $rootScope.messageStatus = true;
            $rootScope.$broadcast('server-event', {
                data:{
                    message: response.data,
                    timeout: 3000,
                }
            });
        }, function myvaulterror(response){
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                    message: response.statusText,
                    timeout: 3000,
                }
            });
        });
    }
        

	return {
		getMyVault: apiMyVault
	}

}]);