'use strict';

var uxTest = angular.module('uxTest', ['ngResource', 'ngAnimate', 'ngSanitize', 'ngMessages'])

.controller('uxController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', '$mdDialog', '$mdMenu', function ($rootScope, $scope, $compile, $window, $routeParams, $mdDialog, $mdMenu){


    $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '',
        company: 'Google',
        address: '1600 Amphitheatre Pkwy',
        city: 'Mountain View',
        state: 'CA',
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode: '94043'
    };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
    });

    $scope.dropdown_10_1 = [
        "Option 1",
        "Option 2",
        "Option 3"
    ];

    $scope.dropdown_10_2 = [
        "Option 1",
        "Option 2",
        "Option 3"
    ];

    $scope.slider = {
        nine: 0
    };

    var originatorEv;

    $scope.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

    $scope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };

    $scope.checkVoicemail = function() {
      // $scope never happens.
    };

   
}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){

            $('#default-page-loading').fadeOut('slow');

        });
    }
}])
.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

});


