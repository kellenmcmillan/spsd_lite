'use strict';

var userVaultList = angular.module('userVaultList', ['ngResource', 'userFilter', 'usersListService'])

.controller('usersListCtrl', ['$rootScope', '$scope', 'Users', '$http', '$location', function ($rootScope, $scope, Users, $http, $location){
    $rootScope.pageTitle = "User Vault";
    $rootScope.is_stretched = false;
//////////////////////////////////////////////////////////
//use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
//use this code whenever I want MDL to load via controller
//////////////////////////////////////////////////////////

    Users.query()
    .$promise.then(function(Users) {
        $scope.users = Users;
    });
    // $scope.SuperUser = JSON.parse(persistentUser.getData('superUser'));
    $scope.selectedFilter = [];
    $scope.filterBtns = [
        {name: 'candidates', id: 5},
        {name: 'clients', id: 4},
        {name: 'staff', id: 3},
        {name: 'vendors', id: 2},
        {name: 'admin', id: 1}
    ];

    $scope.setSelectedFilter = function () {
        var id = this.filterBtn.id;
        if (_.contains($scope.selectedFilter, id)) {
            $scope.selectedFilter = _.without($scope.selectedFilter, id);
        } else {
            $scope.selectedFilter.push(id);
        }
        return false;
    };
    
    $scope.toggle = {item: -1};

    function initiateUserDelete(person){    
        $scope.DeleteUserState = true;
        $scope.confirmation = {
            message: "Are You Sure You Want To Delete This User?",
            confirm: "Delete",
            confirmAction: function(){deleteUser(person); $scope.DeleteUserState = false;},
            deny: "Cancel",
            denyAction: function(){
                $scope.DeleteUserState = false;
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: 'User Delete Action Canceled',
                        timeout: 3000,
                    }
                });
            }
        }
    }

    function deleteUser(user) {

        var id = user._id;

        if(id === $scope.SuperUser._id){

            persistentUser.setData('superUser', null);
            $rootScope.$emit('SuperUserUpdate', 'Super User Emit!');
            var LoggedOutUser = true;

        }
        
        $http({
            url: ("/api/router/user/" + id + "/delete"),
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function deleteUserSuccess(response) {
            
            $scope.users = response.data;
            $scope.toggle = {item: -1};
            $rootScope.messageStatus = true;
            $rootScope.$broadcast('server-event', {
                data:{
                    message: 'User Deleted Successfully',
                    timeout: 3000,
                }
            });
            if(LoggedOutUser){

                $location.path('/login');

            }
        }, function deleteUserError(response){
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

    $rootScope.feedbackTableView = true;
    $scope.deleteUser = deleteUser;
    $scope.initiateUserDelete = initiateUserDelete;
    $scope.$on('destroy', function() {
        //build a directive
        $scope.users = [];
    });
}])
.directive('backendMenu', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      var header_height = 84;
      var app_title_height = 48;
      var top_offset = header_height + app_title_height;
      var w = $window.innerHeight;
       element.css('height', (w - top_offset) + 'px');
       // element.css('width', Math.floor(($window.innerWidth/7)) - 4.5 + 'px');
       //possible use if else to adjust to css media queries
       angular.element($window).bind('resize', function(){
        //possible use if else to adjust to css media queries
         element.css('height', $window.innerHeight + 'px');
         // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
         // manuall $digest required as resize event
         // is outside of angular
         scope.$digest();
       });
     }

}]);
