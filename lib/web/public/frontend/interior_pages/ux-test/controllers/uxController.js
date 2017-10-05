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

    $scope.data = {
    	group1 : ''
    };

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

    $scope.toppings = [
    	{ name: 'Pepperoni', wanted: true },
    	{ name: 'Sausage', wanted: false },
    	{ name: 'Black Olives', wanted: true },
    	{ name: 'Green Peppers', wanted: false }
  	];

	$scope.settings = [
	    { name: 'Conditional', extraScreen: 'Wi-fi menu', icon: 'network_wifi', enabled: true },
	    { name: 'Conditional', extraScreen: 'Bluetooth menu', icon: 'bluetooth', enabled: false },
	];

  	$scope.messages = [
    	{id: 1, title: "Message A", selected: false},
    	{id: 2, title: "Message B", selected: true},
    	{id: 3, title: "Message C", selected: true},
  	];

  	var image_gallery = [
    	{ name: 'wayneFerguson6-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson6-thumb.jpg', newMessage: true },
    	{ name: 'wayneFerguson4-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson4-thumb.jpg', newMessage: false },
    	{ name: 'wayneFerguson2-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson2-thumb.jpg', newMessage: false }
  	];

  	$scope.image_gallery = angular.copy(image_gallery);

  	Array.prototype.move = function(from,to){
		this.splice(to,0,this.splice(from,1)[0]);
		return this;
	};

  	$scope.reorder_gallery = function (old_index, new_index) {
  		console.log("fired");
		$scope.image_gallery.move(old_index, new_index);
	};

	$scope.goToPerson = function(person, event) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Navigating')
			.textContent('Inspect ' + person)
			.ariaLabel('Person inspect demo')
			.ok('Neat!')
			.targetEvent(event)
		);
	};

	$scope.navigateTo = function(to, event) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Navigating')
			.textContent('Imagine being taken to ' + to)
			.ariaLabel('Navigation demo')
			.ok('Neat!')
			.targetEvent(event)
		);
	};

	$scope.doPrimaryAction = function(event) {
		$mdDialog.show(
		$mdDialog.alert()
			.title('Primary Action')
			.textContent('Primary actions can be used for one click actions')
			.ariaLabel('Primary click demo')
			.ok('Awesome!')
			.targetEvent(event)
		);
	};

	$scope.doSecondaryAction = function(event) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Secondary Action')
			.textContent('Secondary actions can be used for one click actions')
			.ariaLabel('Secondary click demo')
			.ok('Neat!')
			.targetEvent(event)
		);
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
    .primaryPalette('green')
    .dark();

});


