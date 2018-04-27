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
    var appDataBucket = realtimeDatabase.ref().child('data');
    var staffBucket = realtimeDatabase.ref('/data/settings/staff/members');
    var navigationBucket = realtimeDatabase.ref('/data/settings/navigation');
    var newStaffIndex = 0;
    $rootScope.staffgridview = true;
    $rootScope.new_staff_member = false;
    $rootScope.setting = "Company Info";
    $rootScope.infoPage_setting = "title";
    $rootScope.newPageData = {};



    ///////////////////////////////////////////////////// Media Vault File Picker
    $rootScope.mediavault_filepicker = function(img_obj){
        $rootScope.$broadcast('mediavault', {
            data:{
                img_obj: img_obj
            }
        });
    }
    ///////////////////////////////////////////////////// Media Vault File Picker



    ///////////////////////////////////////////////////// Views
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
    $rootScope.startInfoPageEdit = function() {
        $rootScope.edit_info_pages_dialog_visible = true;
    };
    $rootScope.endInfoPageEdit = function() {
        $rootScope.edit_info_pages_dialog_visible = false;
    };
    $rootScope.open_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = true;
    }
    $rootScope.close_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = false;
    }
    ///////////////////////////////////////////////////// Views






    ///////////////////////////////////////////////////// Manage Staff Page
    $rootScope.switchViewStaff = function() {
        if($rootScope.staffgridview == false){
            $rootScope.staffgridview = true;
        } else {
            $rootScope.staffgridview = false;
        }
    }

    $rootScope.createStaff = function(){
        var staffObj = {};
        $rootScope.new_staff_member = true;
        $rootScope.editable_app_settings.staff.members.unshift(staffObj);
        newStaffIndex = $rootScope.editable_app_settings.staff.members.indexOf(staffObj);        
    }

    $rootScope.cancelStaff = function(){
        $rootScope.editable_app_settings.staff.members.splice(0, 1);
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

    $rootScope.updateStaffMember = function(staff){
        var data = angular.toJson(staff);
        var update = JSON.parse(data);
        var staffUpdate = staffBucket.child(staff.id).set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: staff.name + " updated."
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
                    message: "Staff order updated."
                }
            });
        }, 500);
    }

    $rootScope.removeStaff = function(staff){
        var staffRemove = staffBucket.child(staff.id).remove();
    }
    ///////////////////////////////////////////////////// Manage Page




    ///////////////////////////////////////////////////// Add Page
    $rootScope.addPage = function(type, data){

        // trim titles to become urls
        var trim_title = function(title){
            var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
            return newURL;
        }
        // trim titles to become urls

        // configure data structure
        var page_sample_data = {};
        page_sample_data.data = {};
        page_sample_data.data.page = {};
        page_sample_data.data.page.contents = [];
        page_sample_data.data.page.images = {};
        page_sample_data.settings = {};
        // configure data structure

        // mock content
        var paragraphObj = {};
        paragraphObj.data = "It started with a paragraph...";
        paragraphObj.type = "text";

        var imageObj = {};
        imageObj.source = "https://storage.googleapis.com/spsd-189118.appspot.com/missing-image-wide.png";

        switch(type){
            case "info":
                page_sample_data.data.title = data.title;
                page_sample_data.data.page.images.source = imageObj.source;
                page_sample_data.data.page.contents.push(paragraphObj);
                page_sample_data.settings.url = "/info/" + trim_title(data.title);
                page_sample_data.settings.page_type = "info";
                page_sample_data.settings.locked = false;
                $rootScope.pages.unshift(page_sample_data);
                $rootScope.app_pages.unshift(page_sample_data.settings);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. " + data.title + " added."
                        }
                    });
                }, 500);
                break;
            // case "announcement":

            //     break;
            // case "highlight":

            //     break;
            // case "blog":

            //     break;
            // case "steps":

            //     break;
            // case "spotlight":

            //     break;
            // case "servicesPage":

            //     break;
            // case "appConfiguration":

            //     break;
            default:
                return;
        }
    }
    ///////////////////////////////////////////////////// Add Page




    
    ///////////////////////////////////////////////////// Crud Navigation
    $rootScope.parentNav = function(item){
        $rootScope.parentNavName = item.navigation.parent.name;
        $rootScope.child_nav_items = item.navigation.child.data;
    }

    $rootScope.addChildNavItem = function(){
        var childNavObj = {};
        childNavObj.enabled = true;
        $rootScope.child_nav_items.push(childNavObj);       
    }

    $rootScope.updateNavigation = function(){
        var data = angular.toJson($rootScope.settings.navigation);
        var update = JSON.parse(data);
        var navUpdate = navigationBucket.set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Navigation updated."
                }
            });
        }, 500);
    }
    ///////////////////////////////////////////////////// Crud Navigation




    ///////////////////////////////////////////////////// Update App
    $rootScope.updateApp = function(element){
        switch(element){
            case "mission":
                var data = angular.toJson($rootScope.editable_mission);
                var update = JSON.parse(data);
                appDataBucket.child("mission").set(update);
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
            case "infoPage":
                var data = angular.toJson($rootScope.editable_pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Page updated."
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
                appDataBucket.child("settings").set(update);
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
    ///////////////////////////////////////////////////// Update App

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