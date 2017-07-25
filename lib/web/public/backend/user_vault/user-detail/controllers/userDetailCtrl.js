'use strict';

var feedbackDetail = angular.module('feedbackDetail', ['ngRoute'])

.controller('userDetailCtrl', ['$rootScope', '$scope', '$http', '$filter', '$routeParams', '$location', function ($rootScope, $scope, $http, $filter, $routeParams, $location){
	$rootScope.miniAppName = "Feedback - Modify A User";
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
    	$scope.createNote = "";
    }


	function checkFormState(){	
		if($scope.crudUpdateForm.$dirty){
			$scope.CancelFormState = true;
			$scope.confirmation = {
		    	message: "Are You Sure You Want To Leave? You Have Unsaved Changes Which Will Be Discarded.",
		    	confirm: "Leave",
		    	confirmAction: function(){$location.path('/backend'); $scope.CancelFormState = false;},
		    	deny: "Continue Editing",
		    	denyAction: function(){
		    		$scope.CancelFormState = false;
					$rootScope.messageStatus = false;
		    		$rootScope.$broadcast('server-event', {
						data:{
							message: 'You Chose To Continue Editing',
							timeout: 3000,
						}
					});
		    	}
			}
		} else {
			$location.path('/feedback');
		}
	}

    $scope.noteReset = function(){

    	$scope.clicked = "false";
    	$scope.toggle = null;
    }

    $scope.toggle = {item: -1};


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

	function fetchUser() {
		var id = $routeParams.person;
		//fetch user according to param in URL
		$http.get("/api/router/person/" + id)
		.then(function(response) {
			//make a copy of data to manipulate using angular.copy
			$scope.user = response.data;
			$scope.person = angular.copy(response.data);
		});
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

	function initiateUserUpdate(person){	
		$scope.UpdateUserSaveState = true;
		$scope.confirmation = {
	    	message: "Are You Sure You Want To Update This User?",
	    	confirm: "Update",
	    	confirmAction: function(){updateUser(person); $scope.UpdateUserSaveState = false;},
	    	deny: "Cancel",
	    	denyAction: function(){
	    		$scope.UpdateUserSaveState = false;
				$rootScope.messageStatus = false;
	    		$rootScope.$broadcast('server-event', {
					data:{
						message: 'User Update Action Canceled',
						timeout: 3000,
					}
				});
	    	}
		}
	}

	function updateUser(person) {

		var id = $routeParams.person;
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
			'id': id,
			'role': capitalizeFirstLetter(person.role.position),
		    'roleId': assignRoleId(person.role.position),
		    'accessAppPermission': person.security_clearance.permissions.access_app,
		    'consoleAppPermission': person.security_clearance.permissions.console_app,
		    'feedbackAppPermission': person.security_clearance.permissions.feedback_app,
		    'frontDeskAppPermission': person.security_clearance.permissions.front_desk_app,
		    'metricsAppPermission': person.security_clearance.permissions.metrics,
		    'workspaceAppPermission': person.security_clearance.permissions.workspace,
		    'restrictedPermission': person.security_clearance.permissions.restricted
		    //for data collected that will be pushed to database as an array, 
		    //have to format object properties to be arrays for each data entry
		 
		};
		
		$http({
			url: ("/api/router/person/" + id + "/update"),
			method: 'PUT',
			data: data,
			headers: { 'Content-Type': 'application/json' }
		})
		.then(function success(response) {
			$scope.user = response.data;
			$scope.person = angular.copy(response.data);
			var SuperUser = JSON.parse(persistentUser.getData('superUser'));
			$scope.crudUpdateForm.$setPristine();
			if($scope.person._id === SuperUser._id){
				persistentUser.setData('superUser', response.data);
				$rootScope.$emit('SuperUserUpdate', 'Super User Emit!');
			}
			$rootScope.messageStatus = true;
			$rootScope.$broadcast('server-event', {
				data:{
					message: $scope.user.info.firstname + ' ' + $scope.user.info.lastname + ' Saved',
					timeout: 3000,
				}
			});
		}, function errorCallback(response){
			$rootScope.messageStatus = false;
			$rootScope.$broadcast('server-event', {
				data:{
					message: 'Problem Performing This Action',
					timeout: 3000,
				}
			});
		});
	}

	function initiateNoteSave(note){	
		$scope.SaveUserNoteState = true;
		$scope.confirmation = {
	    	message: "Are You Sure You Want To Save This Note?",
	    	confirm: "Save",
	    	confirmAction: function(){saveNote(note); $scope.SaveUserNoteState = false;},
	    	deny: "Cancel",
	    	denyAction: function(){
	    		$scope.SaveUserNoteState = false;
				$rootScope.messageStatus = false;
	    		$rootScope.$broadcast('server-event', {
					data:{
						message: 'Note Save Action Canceled',
						timeout: 3000,
					}
				});
	    	}
		}
	}

	function saveNote(note) {

		var id = $routeParams.person;
		var tagArray = note.tags;
        var trimmedTagArray = tagArray.replace(/(^,)|(,$)/g, "");
        var splitTagArray = trimmedTagArray.split(',');
		//fetch user according to param in URL
		var data = {
			//populate with all fields required for update
			'newNoteTitle': titleCase(note.title),
			'newNoteType': titleCase(note.type),
			'newNoteTags': splitTagArray,
			'newNoteSubject': titleCase(note.subject),
			'newNoteMessage': note.message
		};
		
		$http({
			url: ("/api/router/person/" + id + "/new-note"),
			method: 'PUT',
			data: data,
			headers: { 'Content-Type': 'application/json' }
		})
		.then(function noteSuccess(response) {
			$scope.user = response.data;
			$scope.person = angular.copy(response.data);
			$scope.createNote = "";
			$scope.clicked = false;
			$rootScope.messageStatus = true;
			$rootScope.$broadcast('server-event', {
				data:{
					message: 'Note Saved',
					timeout: 3000,
				}
			});
		}, function noteErrorCallback(response){
			$rootScope.messageStatus = false;
			$rootScope.$broadcast('server-event', {
				data:{
					message: 'Problem Performing This Action',
					timeout: 3000,
				}
			});
		});
	}

	function initiateNoteRemove(note){	
		$scope.RemoveUserNoteState = true;
		$scope.confirmation = {
	    	message: "Are You Sure You Want To Remove This Note?",
	    	confirm: "Remove",
	    	confirmAction: function(){removeNote(note); $scope.RemoveUserNoteState = false;},
	    	deny: "Cancel",
	    	denyAction: function(){
	    		$scope.RemoveUserNoteState = false;
				$rootScope.messageStatus = false;
	    		$rootScope.$broadcast('server-event', {
					data:{
						message: 'Note Remove Action Canceled',
						timeout: 3000,
					}
				});
	    	}
		}
	}

	function removeNote(note) {
		
		var id = $routeParams.person;

		var data = {
			//populate with all fields required for update
			'noteId': note._id	
		};
		
		$http({
			url: ("/api/router/user/" + id + "/remove-note"),
			method: 'DELETE',
			data: data,
			headers: { 'Content-Type': 'application/json' }
		})
		.then(function deleteNoteSuccess(response) {
			$scope.user = response.data;
			$scope.person = angular.copy(response.data);
			$scope.createNote = "";
			$scope.newNote = false;
			$rootScope.messageStatus = true;
			$rootScope.$broadcast('server-event', {
				data:{
					message: 'Note Deleted Successfully',
					timeout: 3000,
				}
			});
		}, function deleteNoteError(response){
			$rootScope.messageStatus = false;
			$rootScope.$broadcast('server-event', {
				data:{
					message: 'Problem Performing This Action',
					timeout: 3000,
				}
			});
		});
	}

	$scope.$on('server-event', function(event, args) {
		//build a directive
		var snackbarContainer = document.querySelector('#lightweight--message');
	    snackbarContainer.MaterialSnackbar.showSnackbar(args.data);
	});

	$scope.updateUser = updateUser;
	$scope.saveNote = saveNote;
	$scope.removeNote = removeNote;
	$scope.initiateUserUpdate = initiateUserUpdate;
	$scope.initiateNoteSave = initiateNoteSave;
	$scope.initiateNoteRemove = initiateNoteRemove;
	$scope.checkFormState = checkFormState;

	fetchUser();

}]);



