'use strict';

var tools = angular.module('tools', [
'ngResource', 
'ngAnimate', 
'ngFileUpload'
])
.controller('suiteController', [
'$rootScope', 
'$scope', 
'$timeout',     
'$q',
'uuid',
'filterFilter',
function (
$rootScope, 
$scope,  
$timeout,   
$q, 
uuid,
filterFilter){

	var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    var mediaBucket = realtimeDatabase.ref().child('images');
    var staffBucket = realtimeDatabase.ref('/appData/appSettings/staff');
    var newStaffIndex = 0;
    $rootScope.staffgridview = true;
    $rootScope.new_staff_member = false;
    $rootScope.setting = "Company Info";

    $rootScope.startMissionEdit = function() {
        $rootScope.edit_mission_dialog_visible = true;
    };
    $rootScope.endMissionEdit = function() {
        $rootScope.edit_mission_dialog_visible = false;
    };
    $rootScope.startParallaxOneEdit = function() {
        $rootScope.edit_parallax_one_dialog_visible = true;
    };
    $rootScope.endParallaxOneEdit = function() {
        $rootScope.edit_parallax_one_dialog_visible = false;
    };
    $rootScope.startFeaturedProductsEdit = function() {
        $rootScope.edit_featured_products_dialog_visible = true;
    };
    $rootScope.endFeaturedProductsEdit = function() {
        $rootScope.edit_featured_products_dialog_visible = false;
    };
    $rootScope.startParallaxTwoEdit = function() {
        $rootScope.edit_parallax_two_dialog_visible = true;
    };
    $rootScope.endParallaxTwoEdit = function() {
        $rootScope.edit_parallax_two_dialog_visible = false;
    };
    $rootScope.startParallaxThreeEdit = function() {
        $rootScope.edit_parallax_three_dialog_visible = true;
    };
    $rootScope.endParallaxThreeEdit = function() {
        $rootScope.edit_parallax_three_dialog_visible = false;
    };
    $rootScope.startServicesPageEdit = function() {
        $rootScope.edit_service_page_dialog_visible = true;
    };
    $rootScope.endServicesPageEdit = function() {
        $rootScope.edit_service_page_dialog_visible = false;
    };
    $rootScope.open_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = true;
    }
    $rootScope.close_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = false;
    }

    $rootScope.switchViewStaff = function() {
        if($rootScope.staffgridview == false){
            $rootScope.staffgridview = true;
        } else {
            $rootScope.staffgridview = false;
        }
    }

    $rootScope.updateStaffMember = function(staff){
        var data = angular.toJson(staff);
        var update = JSON.parse(data);
        var staffUpdate = staffBucket.child(staff.id).set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: staff.name + " updated"
                }
            });
        }, 500);
    }

    $rootScope.removeStaff = function(staff){
        var staffRemove = staffBucket.child(staff.id).remove();
    }

    $rootScope.addStaffTemplate = function(){
        var staffObj = {};
        $rootScope.new_staff_member = true;
        $rootScope.editable_app_settings.staff.unshift(staffObj);
        newStaffIndex = $rootScope.editable_app_settings.staff.indexOf(staffObj);        
    }
    $rootScope.cancelStaff = function(){
        $rootScope.editable_app_settings.staff.splice(0, 1);
        $rootScope.new_staff_member = false;
    }
    $rootScope.addStaffMember = function(newMember){
        var data = angular.toJson(newMember);
        var update = JSON.parse(data);
        var id = uuid.v4();
        var staffAdd = staffBucket.child(id).set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: staff.name + " added"
                }
            });
        }, 500);
    }

    $rootScope.updateStaff = function(staff){
        var staffList = {};
        var newID = 0;
        angular.forEach(staff, function(value, key){
            staffList[newID] = value;
            staffList[newID].id = newID;
            staffList[newID].key = newID;
            newID++;
        });
        var data = angular.toJson(staffList);
        var update = JSON.parse(data);
        var staffUpdate = staffBucket.set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Staff order updated"
                }
            });
        }, 500);
    }

    $rootScope.updateApp = function(element){
        switch(element){
            case "mission":
                var data = {};
                var elementData = {};
                elementData.images = {};
                elementData.title = $rootScope.editable_mission.data.title;
                elementData.subtitle = $rootScope.editable_mission.data.subtitle;
                elementData.text = $rootScope.editable_mission.data.text;
                elementData.images.source = $rootScope.editable_mission.data.images.source;
                data.data = elementData;
                $rootScope.mission.data.title = elementData.title;
                $rootScope.mission.data.subtitle = elementData.subtitle;
                $rootScope.mission.data.text = elementData.text;
                $rootScope.mission.data.images.source = elementData.images.source;
                appDataBucket.child("mission").child("data").update(data.data);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Mission updated."
                        }
                    });
                }, 500);
                break;
            case "parallaxOne":
                var data = angular.toJson($rootScope.editable_parallax_one);
                var update = JSON.parse(data);
                appDataBucket.child("parallaxOne").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Parallax One updated."
                        }
                    });
                }, 500);
                break;
            case "parallaxTwo":
                var data = angular.toJson($rootScope.editable_parallax_two);
                var update = JSON.parse(data);
                appDataBucket.child("parallaxTwo").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Parallax Two updated."
                        }
                    });
                }, 500);
                break;
            case "parallaxThree":
                var data = angular.toJson($rootScope.editable_parallax_three);
                var update = JSON.parse(data);
                appDataBucket.child("parallaxThree").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Parallax Three updated."
                        }
                    });
                }, 500);
                break;
            case "featuredProducts":
                var data = angular.toJson($rootScope.editable_featured_products);
                var update = JSON.parse(data);
                appDataBucket.child("featuredProducts").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Featured Products updated."
                        }
                    });
                }, 500);
                break;
            case "servicesPage":
                var data = angular.toJson($rootScope.editable_services_page);
                var update = JSON.parse(data);
                appDataBucket.child("servicesPage").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Capabilities page updated."
                        }
                    });
                }, 500);
                break;
            case "appConfiguration":
                var data = angular.toJson($rootScope.editable_app_settings);
                var update = JSON.parse(data);
                appDataBucket.child("appSettings/data").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Configurations updated."
                        }
                    });
                }, 500);
                break;
            default:
                return;
        }
    }

}])
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});