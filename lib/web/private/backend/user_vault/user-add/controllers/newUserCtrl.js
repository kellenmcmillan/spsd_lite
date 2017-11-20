'use strict';

var feedbackDetail = angular.module('feedbackNewUser', [])
.controller('newUserCtrl', ['$rootScope', '$scope', '$http', '$filter', '$location', '$timeout', function ($rootScope, $scope, $http, $filter, $location, $timeout){
	$rootScope.miniAppName = "Feedback - Add A User";
//////////////////////////////////////////////////////////
//use this code whenever I want MDL to load via controller
	angular.element(document).ready( 
		function() {
			componentHandler.upgradeAllRegistered();
		}
	);
//use this code whenever I want MDL to load via controller
//////////////////////////////////////////////////////////
	
    $scope.reset = function(){
    	$scope.user = "";
    	$scope.person = "";
    }

    $scope.person;

    function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function fixStateAbbr(string) {
    	return string = string.toUpperCase();
	}

	function formatDate(date) {
		if(date){
			var rawDate = new Date(date);
			var formattedDate = (rawDate.getMonth() + 1) + '/' + rawDate.getDate() + '/' +  rawDate.getFullYear();
    		return formattedDate;
    	}else{
    		return null;
    	}
	}

	function titleCase(string){
		if(string){
	    	return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}else{
			return null;
		}
	}

	function assignRoleId(role){
		var roleId;
		switch(role){
			case 'Admin':
				roleId = 1;
				break;
			case 'Vendors':
				roleId = 2;
				break;
			case 'Staff':
				roleId = 3;
				break;
			case 'Clients':
				roleId = 4;
				break;
			case 'Candidates':
				roleId = 5;
				break;
		}
		return roleId;
	}

	function stateToAbbr(string){
		string = titleCase(string);
		if(string && string.length > 3){
			switch (string){
				case "Alabama":
					string = 'AL';
					break;
				case "Alaska":
					string = 'AK';
					break;
				case "American Samoa":
					string = 'AS';
					break;
				case "Arkansas":
					string = 'AL';
					break;
				case "Arizona":
					string = 'AZ';
					break;
				case "California":
					string = 'CA';
					break;
				case "Colorado":
					string = 'CO';
					break;
				case "Connecticut":
					string = 'CT';
					break;
				case "Delaware":
					string = 'DE';
					break;
				case "District Of Columbia":
					string = 'DC';
					break;
				case "Federated States Of Micronesia":
					string = 'FSM';
					break;
				case "Micronesia":
					string = 'FSM';
					break;
				case "Florida":
					string = 'FL';
					break;
				case "Georgia":
					string = 'GA';
					break;
				case "Guam":
					string = 'GU';
					break;
				case "Hawaii":
					string = 'HI';
					break;
				case "Idaho":
					string = 'ID';
					break;
				case "Illinois":
					string = 'IL';
					break;
				case "Indiana":
					string = 'IN';
					break;
				case "Iowa":
					string = 'IA';
					break;
				case "Kansas":
					string = 'KY';
					break;
				case "Louisiana":
					string = 'LA';
					break;
				case "Maine":
					string = 'ME';
					break;
				case "Marshall Islands":
					string = 'MH';
					break;
				case "Maryland":
					string = 'MD';
					break;
				case "Massachusetts":
					string = 'MA';
					break;
				case "Michigan":
					string = 'MI';
					break;
				case "Minnesota":
					string = 'MN';
					break;
				case "Mississippi":
					string = 'MS';
					break;
				case "Missouri":
					string = 'MO';
					break;
				case "Montana":
					string = 'MT';
					break;
				case "Nebraska":
					string = 'NE';
					break;
				case "Nevada":
					string = 'NV';
					break;
				case "New Hampshire":
					string = 'NH';
					break;
				case "New Jersey":
					string = 'NJ';
					break;
				case "New Mexico":
					string = 'NM';
					break;
				case "New York":
					string = 'NY';
					break;
				case "North Carolina":
					string = 'NC';
					break;
				case "North Dakota":
					string = 'ND';
					break;
				case "Northern Mariana Islands":
					string = 'MP';
					break;
				case "Ohio":
					string = 'OH';
					break;
				case "Oklahoma":
					string = 'OK';
					break;
				case "Oregon":
					string = 'OR';
					break;
				case "Palau":
					string = 'PW';
					break;
				case "Pennsylvania":
					string = 'PA';
					break;
				case "Puerto Rico":
					string = 'PR';
					break;
				case "Rhode Island":
					string = 'NY';
					break;
				case "South Carolina":
					string = 'SC';
					break;
				case "South Dakota":
					string = 'SD';
					break;
				case "Tennessee":
					string = 'TN';
					break;
				case "Texas":
					string = 'TX';
					break;
				case "Utah":
					string = 'UT';
					break;
				case "Vermont":
					string = 'VT';
					break;
				case "Virgin Islands":
					string = 'VI';
					break;
				case "Virginia":
					string = 'VA';
					break;
				case "Washington":
					string = 'WA';
					break;
				case "West Virginia":
					string = 'WV';
					break;
				case "Wisconsin":
					string = 'WI';
					break;
				case "Wyoming":
					string = 'WY';
					break;
			}
		}else if(string && string.length > 1){
			return fixStateAbbr(string);
		}else{
			return null;
		}
		return string;
	}

	function saveUser(person) {
		//fetch user according to param in URL
		var data = {
			//populate with all fields required for update
			'firstname': titleCase(person.info.firstname),
			'lastname': titleCase(person.info.lastname),
			'birthday': formatDate(person.info.birthday),
			'phone': person.info.phone,
			'email': person.info.email,
			'streetAddress': titleCase(person.info.address.street),
			'cityAddress': titleCase(person.info.address.city),
			'stateAddress': stateToAbbr(person.info.address.state),
			'zipAddress': person.info.address.zip,
			'role': capitalizeFirstLetter(person.role.position),
		    'roleId': assignRoleId(person.role.position),
		    'accessAppPermission': person.security_clearance.permissions.access_app,
		    'consoleAppPermission': person.security_clearance.permissions.console_app,
		    'feedbackAppPermission': person.security_clearance.permissions.feedback_app,
		    'frontDeskAppPermission': person.security_clearance.permissions.front_desk_app,
		    'metricsAppPermission': person.security_clearance.permissions.metrics,
		    'workspaceAppPermission': person.security_clearance.permissions.workspace,
		    'restrictedPermission': person.security_clearance.permissions.restricted
		};
		
		$http({
			url: ("/api/router/person/new"),
			method: 'PUT',
			data: data,
			headers: { 'Content-Type': 'application/json' }
		})
		.then(function success(response) {
			$rootScope.messageStatus = true;
			$timeout(function(){
			   $rootScope.$broadcast('server-event', {
					data:{
						message: response.statusText,
						timeout: 3000,
					}
				});
			}, 500);
			
			$location.path('/feedback');
		}, function errorCallback(response){
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

	$scope.saveUser = saveUser;

}]);



