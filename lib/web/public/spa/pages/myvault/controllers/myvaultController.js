'use strict';

angular.module('main')

.controller('myvaultController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
'$mdDialog', 
'$mdMenu', 
'$timeout', 
'$http', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams, 
$mdDialog, 
$mdMenu, 
$timeout, 
$http)
{

    
        console.log('trying to get profile');

        // auth.getProfile(function(err, profile) {
        //     console.log('got to the get profile function ' + profile);
        //     $scope.profile = profile;
        // });
        var profile;
        profile = localStorage.getItem('profile');
        console.log("profile = " + profile);
        // localStorage.getItem('id_token', authResult.idToken);
        // localStorage.getItem('expires_at', expiresAt);
        // var token = jwtHelper.decodeToken(authResult.accessToken);
        $scope.profile = profile;
        $scope.firstname = profile.given_name || profile.first_name;
        $scope.lastname = profile.family_name || profile.last_name;
        

}])
.directive('contentAvailable', ['$location', '$timeout', function($location, $timeout){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){
            $timeout(function(){
                $('#default-page-loading').fadeOut('slow');
            }, 4000);
        });
    }
}])
.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground green

    $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('green')
    .dark();

});



/////////////////////////////////
