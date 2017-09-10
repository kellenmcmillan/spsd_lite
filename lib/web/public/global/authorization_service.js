'use strict';

var authorization_service = angular.module('authorization_service', ['ngResource', 'ngRoute']);

authorization_service.factory('auth', function ($resource, $q, $rootScope, $location) {
    
    return {
        // We would cache the permission for the session,
        //to avoid roundtrip to server
        //for subsequent requests

        permissionModel: {
            permission: {},
            isPermissionLoaded: false
        },
        permissionCheck: function (roleCollection) {

            // we will return a promise .
            var deferred = $q.defer();

            //this is just to keep a pointer to parent scope from within promise scope.
            var parentPointer = this;

            //Checking if permission object(list of roles for logged in user) 
            //is already filled from service
            if (this.permissionModel.isPermissionLoaded) {
                //Check if the current user has required role to access the route
                this.getPermission(this.permissionModel, roleCollection, deferred);
            } else {
                //if permission is not obtained yet, we will get it from  server.
                // '/api/router/authorization' is the path of server web service.
                $resource('/api/router/authorization').get().$promise
                .then(function (response) {
                    //when server service responds then we will fill the permission object
                    parentPointer.permissionModel.permission = response.role.role_id;
                    console.log('this is what the app sees during permission checks ' + parentPointer.permissionModel.permission);

                    //Indicator is set to true that permission object is filled and 
                    //can be re-used for subsequent route request for the session of the user
                    parentPointer.permissionModel.isPermissionLoaded = true;

                    //Check if the current user has required role to access the route
                    parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
                }, function errorCallback(response){
                    var routeForUnauthorizedAccess = '/unauthorized';
                    console.log('unauthorized');
                    //If user does not have required access, 
                    //we will route the user to unauthorized access page
                    $location.path(routeForUnauthorizedAccess);
                    //As there could be some delay when location change event happens, 
                    //we will keep a watch on $locationChangeSuccess event
                    // and would resolve promise when this event occurs.
                    $rootScope.$on('$locationChangeSuccess', function (next, current) {
                        deferred.resolve();
                    });
                });
            }
            return deferred.promise;
        },

        //Method to check if the current user has required role to access the route
        //'permissionModel' has permission information obtained from server for current user
        //'roleCollection' is the list of roles which are authorized to access route
        //'deferred' is the object through which we shall resolve promise
        getPermission: function (permissionModel, roleCollection, deferred) {
            var ifPermissionPassed = false;
            console.log('got this far');

            angular.forEach(roleCollection, function (role) {
                switch (role) {
                    case 1:
                        if (permissionModel.permission == 1) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 2:
                        if (permissionModel.permission == 2) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 3:
                        if (permissionModel.permission == 3) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 4:
                        if (permissionModel.permission == 4) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 5:
                        if (permissionModel.permission == 5) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 6:
                        if (permissionModel.permission == 6) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 7:
                        if (permissionModel.permission == 7) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 8:
                        if (permissionModel.permission == 8) {
                            ifPermissionPassed = true;
                        }
                        break;
                    case 9:
                        if (permissionModel.permission == 9) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 10:
                        if (permissionModel.permission == 10) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 11:
                        if (permissionModel.permission == 11) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 12:
                        if (permissionModel.permission == 12) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 13:
                        if (permissionModel.permission == 13) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 14:
                        if (permissionModel.permission == 14) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 15:
                        if (permissionModel.permission == 15) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 16:
                        if (permissionModel.permission == 16) {
                            ifPermissionPassed = false;
                        }
                        break;
                    case 17:
                        if (permissionModel.permission == 17) {
                            ifPermissionPassed = false;
                        }
                        break;
                    default:
                        ifPermissionPassed = false;
                }
            });
            if (!ifPermissionPassed) {
                var routeForUnauthorizedAccess = '/unauthorized';
                console.log('unauthorized');
                //If user does not have required access, 
                //we will route the user to unauthorized access page
                $location.path(routeForUnauthorizedAccess);
                //As there could be some delay when location change event happens, 
                //we will keep a watch on $locationChangeSuccess event
                // and would resolve promise when this event occurs.
                $rootScope.$on('$locationChangeSuccess', function (next, current) {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }
    };
});