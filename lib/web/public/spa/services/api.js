'use strict';

var api = angular.module('api', []);

api.factory('API', ['$timeout', '$location', '$http', function($timeout, $location, $https){

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