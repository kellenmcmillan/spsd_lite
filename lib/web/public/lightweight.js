'use strict';

var lightweight = angular.module('lightweight', [
'ngResource', 
'ngAnimate'
])
.controller('lightweightController', [
'$rootScope', 
'$scope',  
'$timeout', 
'$location', 
'$route',
'$mdToast', 
'$q',
'$firebaseObject',
'$firebaseArray',
'$firebaseAuth',
'users_data',
'filterFilter',
'uuid',
function (
$rootScope, 
$scope,  
$timeout,  
$location, 
$route,
$mdToast, 
$q,
$firebaseObject,
$firebaseArray,
$firebaseAuth,
users_data,
filterFilter,
uuid){

    ////////////////////////////////// Firebase Init
    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    ////////////////////////////////// Firebase Init


    ////////////////////////////////// Firebase References
    var imageBucket = firebaseStorage.ref();
    var usersBucket = realtimeDatabase.ref().child('users');
    var appDataBucket = realtimeDatabase.ref().child('data');
    var mediaBucket = realtimeDatabase.ref().child('images');
    var tagsBucket = realtimeDatabase.ref().child('tags');
    var galleriesBucket = realtimeDatabase.ref().child('galleries');
    var tagArray = $firebaseArray(tagsBucket);
    var staffBucket = realtimeDatabase.ref('/data/settings/staff/members');
    var navigationBucket = realtimeDatabase.ref('/data/settings/navigation');
    ////////////////////////////////// Firebase References

    // Variables and scoped variables
    var newStaffIndex = 0;
    $rootScope.staffgridview = true;
    $rootScope.new_staff_member = false;
    $rootScope.setting = "Company Info";
    $rootScope.newPageData = {};
    $rootScope.items_sortable = false;
    // Variables and scoped variables

   
    ////////////////////////////////// Firebase Scoped Variables
    $rootScope.auth = $firebaseAuth();
    ////////////////////////////////// Firebase Scoped Variables
    

    ////////////////////////////////// Firebase Methods
    $rootScope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
            users_data.getMe(user.uid)
            .then(function(result){
                $rootScope.me = result;
                $rootScope.me.id = user.uid;
                if(result.firstname){
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Welcome " + result.firstname + "!"
                            }
                        });
                    }, 500);
                } else {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Welcome " + user.security.email + "!"
                            }
                        });
                    }, 500);
                }
            });
        } else {
            $rootScope.user = null;
            if($location.path() == "/myvault"){
                location.path("/logged-out");
            }
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Welcome To SPSD!"
                    }
                });
            }, 500);
        }
    });
    ////////////////////////////////// Firebase Methods


    



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
    $rootScope.edit = function(configs, index){
        if (Number.isInteger(index) && configs.contentId == 'pages'){
            $rootScope.editor_element = $rootScope[configs.contentId][index];
        } else {
            $rootScope.editor_element = $rootScope[configs.contentId];
        }
        
        $rootScope.edit_mode = true;
    }
    $rootScope.end_edit = function(){
        $rootScope.editor_element = null;
        $rootScope.edit_mode = false;
    }
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




    ///////////////////////////////////////////////////// Crud Pages
    $rootScope.addPage = function(type, data){

        // trim titles to become urls
        var trim_title = function(title){
            var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
            return newURL;
        }
        // trim titles to become urls

        // configure data structure
        var new_page_data = {};
        new_page_data.data = {};
        new_page_data.data.page = {};
        new_page_data.data.page.foreground = {};
        new_page_data.data.page.background = {};
        new_page_data.data.page.contents = [];
        new_page_data.data.page.images = {};
        new_page_data.settings = {};
        // configure data structure

        // mock content
        var paragraphObj = {};
        paragraphObj.data = "It started with a paragraph...";
        paragraphObj.type = "text";

        var imageObj = {};
        imageObj.source = "https://storage.googleapis.com/spsd-189118.appspot.com/missing-image-wide.png";

        switch(type){
            case "info":
                new_page_data.data.title = data.title;
                new_page_data.data.page.foreground.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/info/" + trim_title(data.title);
                new_page_data.settings.page_type = "info";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                $rootScope.pages.push(new_page_data);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Page added."
                        }
                    });
                }, 500);
                break;
            case "announcement":
                new_page_data.data.title = data.title;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/announcement/" + trim_title(data.title);
                new_page_data.settings.page_type = "announcement";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                $rootScope.pages.push(new_page_data);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Page added."
                        }
                    });
                }, 500);
                break;
            // case "highlight":

            //     break;
            // case "blog":

            //     break;
            // case "steps":

            //     break;
            case "spotlight":
                new_page_data.data.title = data.title;
                new_page_data.data.page.background.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/spotlight/" + trim_title(data.title);
                new_page_data.settings.page_type = "spotlight";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                $rootScope.pages.push(new_page_data);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Page added."
                        }
                    });
                }, 500);
                break;
            // case "servicesPage":

            //     break;
            // case "appConfiguration":

            //     break;
            default:
                return;
        }
    }
    $rootScope.deletePage = function(page_index){
        console.log(page_index);
        var settings = $rootScope.pages[page_index].settings;
        if(settings.locked == false && settings.linked == false){
            $rootScope.pages.splice(page_index, 1);
            var data = angular.toJson($rootScope.pages);
            var update = JSON.parse(data);
            appDataBucket.child("pages").set(update);
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success. Page removed."
                    }
                });
            }, 500);
        } else {
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Failed to remove page."
                    }
                });
            }, 500);
        }
    }
    ///////////////////////////////////////////////////// Crud Pages




    
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
        var index_content = element.settings.configs.index_content;
        var save_path;
        if (index_content){
            save_path = "index/" + element.settings.configs.contentId;
        } else {
            save_path = element.settings.configs.contentId;
        }
        var data = angular.toJson($rootScope[element.settings.configs.contentId]);
        var update = JSON.parse(data);
        appDataBucket.child(save_path).set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success. Content updated."
                }
            });
        }, 500);
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
})
////////////////////////////////////// Firebase Factory Functions
.factory('users_data', function($q){
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersBucket.child(id).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            childData.id = id;
            defer.resolve(childData); 
        });
        return defer.promise;
    }
    return {
        getMe: getMe
    }
})
////////////////////////////////////// Firebase Factory Functions
;



