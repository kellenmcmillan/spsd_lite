'use strict';

var userVault = angular.module('userVault', [
'ngResource', 
'ngAnimate', 
'ngFileUpload'
])
.controller('usersController', [
'$rootScope', 
'$scope', 
'$timeout',  
'users_data',
'role_data',
'$http',
'filterFilter',
function (
$rootScope, 
$scope,  
$timeout,
users_data,
role_data,
$http,
filterFilter){

    ////////////////////////////////// Firebase Reference
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    ////////////////////////////////// Firebase Reference

    // Scoped Variables
    $rootScope.rolelist = [];
    var userslist = [];
    // Scoped Variables

    ////////////////////////////////// Firebase Extract
    users_data.getUsers().then(function(result){
        if(result.length > 0){
            $rootScope.userslist = result;
            userslist = result;
            // for paginate
            $rootScope.usersPageSize = 20;
            $rootScope.currentUserPage = 0;
            $rootScope.numberOfUserPages = Math.ceil(result.length/$rootScope.usersPageSize);
        }
    });

	role_data.getRoles().then(function(result){
	    if(result.length > 0){
	        $rootScope.rolelist = result;     
	    }
	});
    ////////////////////////////////// Firebase Extract

    ////////////////////////////////// Controls
    $rootScope.openUserVault = function() {
        $rootScope.user_vault_visible = true;
    };
    $rootScope.closeUserVault = function() {
        $rootScope.user_vault_visible = false;
    };
    $rootScope.openAddUser = function() {
        $rootScope.user_vault_add_user_visible = true;
    };
    $rootScope.closeAddUser = function() {
        $rootScope.user_vault_add_user_visible = false;
    };
    $rootScope.closeUserVaultDetail = function(){
    	$rootScope.selectedUser = null;
    	$rootScope.user_vault_detail_visible = false;
    }
    ////////////////////////////////// Controls

    ////////////////////////////////// Data Manipulation

    ///////////////// Search Users
    $rootScope.queryUser = function(query){
        $rootScope.currentPage = 0;
        $rootScope.userslist = filterFilter($rootScope.userslist,query);
        $rootScope.numberOfUserPages = Math.ceil($rootScope.userslist.length/$rootScope.pageSize);
    }
    $rootScope.clearQueryUser = function(){
        $rootScope.currentPage = 0;
        $rootScope.queryUserFilter = undefined;
        $rootScope.userslist = userslist;
        $rootScope.numberOfUserPages = Math.ceil($rootScope.userslist.length/$rootScope.pageSize);
    }
    ///////////////// Search Users

    ///////////////// Open User Detail
    $rootScope.selectUser = function(user){
    	$timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: user.email + " Selected!"
                }
            });
        }, 500);
    	$rootScope.selectedUser = user;
    	$rootScope.user_vault_detail_visible = true;
    }
    /////////////////  Open User Detail

    ////////////////////////////////// Data Manipulation

    ////////////////////////////////// Firebase Methods
    
    ///////////////// Update User
    $rootScope.updateUser = function(user){
        var check_data = function(field){
            if (!field){
                field = "BLANK";
            }
            return field;
        }
        var data = {
            address : {
                city : check_data(user.address.city),
                state : check_data(user.address.state),
                street : check_data(user.address.street),
                zipcode : check_data(user.address.zipcode)
            },
            birthday : check_data(user.birthday),
            firstname : check_data(user.firstname),
            lastname : check_data(user.lastname),
            phone : check_data(user.phone),
            email : check_data(user.email),
            security : {
                roles : check_data(user.security.roles)
            }
        }
        usersBucket.child(user.id).update(data);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success! User Updated."
                }
            });
        }, 500);
    }
    ///////////////// Update User

    ///////////////// Add User
    $rootScope.addUser = function(user){
        var data = {
            address : {
                city : user.address.city,
                state : user.address.state,
                street : user.address.street,
                zipcode : user.address.zipcode
            },
            birthday : user.birthday,
            firstname : user.firstname,
            lastname : user.lastname,
            phone : user.phone,
            email : user.email,
            security : {
                roles : user.security.roles
            }
        };
        console.log(JSON.stringify(user));
        // Send to firebase functions
        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/addUser"),
            method: 'POST',
            data: data
        })
        // handle success
        .then(function success (response) {
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! User Added."
                    }
                });
            }, 500);
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                message: 'Registration Failed'
                }
            });
        });

    }
    ///////////////// Add User

    ////////////////////////////////// Firebase Methods

}])
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start; //parse to int
            return input.slice(start);
        }
    }
})
.factory('role_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var roleBucket = realtimeDatabase.ref().child('roles');
    // Storage Init
    var getRoles = function(){
        var defer = $q.defer();
        var rolelist = [];
        roleBucket.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                childDataValue.id = childKey;
                childDataValue.role = childData;
                rolelist.push(childDataValue);
            });
            defer.resolve(rolelist); 
        });
        return defer.promise;
    }
    return {
        getRoles: getRoles
    }
})
.factory('users_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    // Storage Init
    var getUsers = function(){
        var defer = $q.defer();
        var usersList = [];
        usersBucket.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var data = {
                    address : {
                        city : childData.address.city,
                        state : childData.address.state,
                        street : childData.address.street,
                        zipcode : childData.address.zipcode
                    },
                    birthday : childData.birthday,
                    firstname : childData.firstname,
                    lastname : childData.lastname,
                    phone : childData.phone,
                    email : childData.email,
                    security : {
                        roles : childData.security.roles
                    },
                    id : childKey
                }
                usersList.push(data);
            });
            defer.resolve(usersList); 
        });
        return defer.promise;
    }
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersBucket.child(id).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            var data = {
                address : {
                    city : childData.address.city,
                    state : childData.address.state,
                    street : childData.address.street,
                    zipcode : childData.address.zipcode
                },
                birthday : childData.birthday,
                firstname : childData.firstname,
                lastname : childData.lastname,
                phone : childData.phone,
                email : childData.email,
                security : {
                    roles : childData.security.roles
                },
                id : id
            }
            defer.resolve(data); 
        });
        return defer.promise;
    }

    return {
        getUsers: getUsers,
        getMe: getMe
    }
});