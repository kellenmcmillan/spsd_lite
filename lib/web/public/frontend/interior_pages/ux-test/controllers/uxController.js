'use strict';

var uxTest = angular.module('uxTest', ['ngResource', 'ngAnimate', 'ngSanitize', 'ngMessages'])

.controller('uxController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', '$mdDialog', '$mdMenu', '$timeout', "$http", function ($rootScope, $scope, $compile, $window, $routeParams, $mdDialog, $mdMenu, $timeout, $http){
    
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
    	group1 : '',
        group2 : ''
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

  	$scope.galleries = [
    	{id: 1, title: "Example Gallery", selected: false}
  	];

  	var image_gallery = [
    	{ name: 'wayneFerguson6-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson6-thumb.jpg', newMessage: true },
    	{ name: 'wayneFerguson4-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson4-thumb.jpg', newMessage: false },
    	{ name: 'wayneFerguson2-thumb.jpg', img: 'https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson2-thumb.jpg', newMessage: false }
  	];

    $scope.radio_select15 = [
        { name: 'Conditional', value: true}
    ];


    //Reorder Gallery List
  	$scope.image_gallery = angular.copy(image_gallery);
    $scope.moveTo = -1;
  	$scope.image_move = function(from,to){
        $scope.moveTo = -1;
        $timeout(function(){
      		if(to < 0){
    			return $scope.image_gallery;
      		} else if(to >= $scope.image_gallery.length){
    			return $scope.image_gallery;
      		} else {
      			$scope.image_gallery.splice(to,0,$scope.image_gallery.splice(from,1)[0]);
                $scope.moveTo = to;
    			// return $scope.image_gallery;
      		}
    	}, 250);
    }
    //Reorder Gallery List

    // List Item Editor
    var items = 2;
    var random = 0;
    $scope.list_items = [];
    if($scope.list_items.length == 0){
        random = new Date().getMilliseconds();
        $scope.list_items.push("'List Item '" + random);
    }
    $scope.list_length = $scope.list_items.length;
    $scope.add_item = function(){
        for (var i = $scope.list_items.length; i < items; i++) {
            random = new Date().getMilliseconds();
            $scope.list_items.push("'List Item '" + random);
            $scope.list_length = $scope.list_items.length;
        }
        items++;
    }
    $scope.remove_item = function(item_index){
        $scope.list_items.splice(item_index, 1);
        items--;
        $scope.list_length = $scope.list_items.length;
    }
    // List Item Editor

    //Property Selection With Preview
    $scope.dropdown_21_1 = [
        {name: "White", value: '#fafafa'},
        {name: "Light Gray", value: '#e0e0e0'},
        {name: "Medium Gray", value: '#bdbdbd'}
    ];

    $scope.color = "rgba(0,0,0,0.38)";

    $scope.preview_image = {name: "Default", src: "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/design/preview-image.png"};

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

    // Image Uploader
    $scope.uploadFile = function(){
        $http({
            method: 'POST',
            url: '/api/upload/media',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                upload: $scope.file
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        })
        .success(function (data) {
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: data.status,
                        timeout: 3000,
                    }
                });
            }, 500);
        })
        .error(function (data, status) {
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
    // Image Uploader

   
}])
.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});
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



/////////////////////////////////
