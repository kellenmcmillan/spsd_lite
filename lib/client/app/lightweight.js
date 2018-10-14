'use strict';

var lightweight = angular.module('lightweight', [
'ngResource', 
'ngAnimate', 
'ngFileUpload',
'ngSanitize'
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
'role_data',
'tag_data',
'image_data',
'video_data',
'gallery_data',
'task_data',
'filterFilter',
'uuid',
'$http',
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
role_data,
tag_data,
image_data,
video_data,
gallery_data,
task_data,
filterFilter,
uuid,
$http){

    ////////////////////////////////// Firebase Init
    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    $rootScope.auth = $firebaseAuth();
    ////////////////////////////////// Firebase Init

    ////////////////////////////////// Firebase References

    ////////////////////////////////// Images
    var imageStorage = firebaseStorage.ref().child('media/images');
    var imageDatabase = realtimeDatabase.ref().child('media/images');
    ////////////////////////////////// Images

    ////////////////////////////////// Videos
    var videoStorage = firebaseStorage.ref().child('media/video');
    var videoDatabase = realtimeDatabase.ref().child('media/video');
    ////////////////////////////////// Videos

    ////////////////////////////////// Files
    var fileStorage = firebaseStorage.ref().child('media/files');
    var fileDatabase = realtimeDatabase.ref().child('media/files');
    ////////////////////////////////// Files

    ////////////////////////////////// Users
    var usersBucket = realtimeDatabase.ref().child('users');
    ////////////////////////////////// Users

    ////////////////////////////////// App Data
    var appDataBucket = realtimeDatabase.ref().child('data');
    ////////////////////////////////// App Data

    ////////////////////////////////// Navigation Items
    var navigationBucket = realtimeDatabase.ref('/data/settings/navigation');
    ////////////////////////////////// Navigation Items

    ////////////////////////////////// Navigation Items
    var settingsBucket = realtimeDatabase.ref('/data/settings/data');
    ////////////////////////////////// Navigation Items

    ////////////////////////////////// Media Tags
    var tagsBucket = realtimeDatabase.ref().child('tags');
    var tagArray = $firebaseArray(tagsBucket);
    ////////////////////////////////// Media Tags

    ////////////////////////////////// Galleries
    var galleriesBucket = realtimeDatabase.ref().child('galleries');
    ////////////////////////////////// Galleries

    ////////////////////////////////// Staff
    var staffBucket = realtimeDatabase.ref('/data/settings/staff/members');
    ////////////////////////////////// Staff

    ////////////////////////////////// Tasks
    var taskBucket = realtimeDatabase.ref('/data/settings/tasks');
    ////////////////////////////////// Tasks

    ////////////////////////////////// Firebase References






    






    ////////////////////////////////// Variables and scoped variables
    
    var newStaffIndex = 0;
    var newGalleryIndex = 0;
    var imagelist = [];
    var img_obj = null;
    var videolist = [];
    var vid_obj = null;
    var userslist = [];

    $rootScope.rolelist = [];
    $rootScope.imagelist = [];
    $rootScope.editMedia = false;
    $rootScope.galleriesgridview = true;
    $rootScope.staffgridview = true;
    $rootScope.new_staff_member = false;
    $rootScope.setting = "Company Info";
    $rootScope.newPageData = {};
    // $rootScope.project_types = [array of types];
    
    ////////////////////////////////// Variables and scoped variables








    ///////////////////////////////////////////////////// View Controls
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
    $rootScope.openMediaVault = function(element) {
        $rootScope.elementToUpdate = element;
        $rootScope.media_vault_visible = true;
    }
    $rootScope.closeMediaVault = function() {
        $rootScope.elementToUpdate = null;
        $rootScope.media_vault_visible = false;
    }
    $rootScope.openUserVault = function() {
        $rootScope.user_vault_visible = true;
    }
    $rootScope.closeUserVault = function() {
        $rootScope.user_vault_visible = false;
    }
    $rootScope.openMyVault = function() {
        $rootScope.my_vault_detail_visible = true;
    }
    $rootScope.closeMyVault = function() {
        $rootScope.my_vault_detail_visible = false;
    }
    $rootScope.openAddUser = function() {
        $rootScope.user_vault_add_user_visible = true;
    }
    $rootScope.closeAddUser = function() {
        $rootScope.user_vault_add_user_visible = false;
    }
    $rootScope.closeUserVaultDetail = function(){
        $rootScope.selectedUser = null;
        $rootScope.user_vault_detail_visible = false;
    }
    $rootScope.openPasswordReset = function(me){
        $rootScope.reset_password_visible = true;
        $rootScope.accountEmailPasswordReset = me.email;
    }
    $rootScope.closePasswordReset = function(){
        $rootScope.reset_password_visible = false;
    }
    $rootScope.openShare = function(file){
        $rootScope.my_vault_share_visible = true;
        $rootScope.file = file;
    }
    $rootScope.openIframeUpload = function(){
        $rootScope.my_vault_iframe_upload_visible = true;
    }
    $rootScope.closeIframeUpload = function(){
        $rootScope.my_vault_iframe_upload_visible = false;
    }
    $rootScope.closeShare = function(){
        $rootScope.my_vault_share_visible = false;
        $rootScope.file = null;
    }
    $rootScope.openTaskRunner = function(){
        $rootScope.task_runner_visible = true;
    }
    $rootScope.closeTaskRunner = function(){
        $rootScope.task_runner_visible = false;
    }
    $rootScope.openCreateTask = function(){
        $rootScope.task_runner_task_add_visible = true;
        $rootScope.taskAddObj = {};
    }
    $rootScope.closeCreateTask = function(){
        $rootScope.task_runner_task_add_visible = false;
        $rootScope.taskAddObj = {};
    }
    $rootScope.openUpdateTask = function(task){
        $rootScope.task_runner_task_modify_visible = true;
        $rootScope.taskUpdateObj = task;
    }
    $rootScope.closeUpdateTask = function(){
        $rootScope.task_runner_task_modify_visible = false;
        $rootScope.taskUpdateObj = {};
    }
    $rootScope.sidebarOpen = true;
    $rootScope.toggleSidebar = function(){
        if($rootScope.sidebarOpen){
            $rootScope.sidebarOpen = false;
        } else {
            $rootScope.sidebarOpen = true;
        }
    }
    $rootScope.closeAllApps = function(){
        $rootScope.close_edit_configuration();
        $rootScope.closeMediaVault();
        $rootScope.closeUserVault();
        $rootScope.closeMyVault();
        $rootScope.closeAddUser();
        $rootScope.closeUserVaultDetail();
        $rootScope.closePasswordReset();
        $rootScope.closeIframeUpload();
        $rootScope.closeShare();
        $rootScope.closeTaskRunner();
        $rootScope.closeCreateTask();
        $rootScope.closeUpdateTask();
    }
    ///////////////////////////////////////////////////// View Controls





    ///////////////////////////////////////////////////// User Management
    ///////////////////////////////////////////////////// User Management
    ///////////////////////////////////////////////////// User Management

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


    // Check if user is authorized to view tools
    $rootScope.isAuthorized = function(app, roles){
        var result;
        switch(app){
            case "AppLab":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "MediaVault":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "UserVault":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "TaskRunner":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "Settings":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            default:
                return;
        }
        return result;
    }
    // Check if user is authorized to view tools

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

    $rootScope.updateUser = function(user){
        
        usersBucket.child(user.id).update(user);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success! User Updated."
                }
            });
        }, 500);
    }

    $rootScope.deleteUser = function(user){
        
        var data = {
            sender : $rootScope.me.token,
            user: user
        };

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/deleteUser"),
            method: 'POST',
            data: data
        })
        .then(function success (response) {
            $rootScope.messageStatus = true;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! User Deleted."
                    }
                });
            }, 500);
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Failed To Delete User. ' + response.message
                }
            });
        });
    }

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
            },
            sender : $rootScope.me.token
        };

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/addUser"),
            method: 'POST',
            data: data
        })
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
                 message: 'Registration Failed ' + response.statusText
                }
            });
        });
    }    

    $rootScope.passReset = function(resetUser){
        var data = {
            password : resetUser.resetPassword,
            uid: $rootScope.me.id
        };
        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/updatePassword"),
            method: 'POST',
            data: data
        })
        .then(function success (response) {
            $rootScope.auth.$signOut();
            $timeout(function(){
                $location.path("/login");
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! Password Updated."
                    }
                });
            }, 500);
        }, function failure (response) {
            $rootScope.$broadcast('server-event', {
                data:{
                message: 'Password Reset Failed'
                }
            });
        });

    }
        
    ///////////////////////////////////////////////////// User Management
    ///////////////////////////////////////////////////// User Management
    ///////////////////////////////////////////////////// User Management




    ///////////////////////////////////////////////////// App Editing
    ///////////////////////////////////////////////////// App Editing
    ///////////////////////////////////////////////////// App Editing

    $rootScope.edit = function(configs, page){
        if (page && configs.contentId == 'pages'){

            var param = page.settings.url;
            var page_selected_url = JSON.stringify(param);
            console.log("page selected url " + page_selected_url);
            var continue_looping = true;

            var load_page = function(){
                for(let i = 0, l = $rootScope.pages.length; i < l && continue_looping == true; i++) {
                    var raw_url = $rootScope.pages[i].settings.url;
                    var url = JSON.stringify(raw_url);
                    console.log("Looping pages url's " + url);
                    if(url == page_selected_url){
                        console.log("page found");
                        continue_looping = false;
                        $rootScope.editor_element = $rootScope.pages[i];
                    }
                }
            }

            load_page();

        } else {

            $rootScope.editor_element = $rootScope[configs.contentId];

        }
        
        $rootScope.edit_mode = true;
    }

    ///////////////////////////////////////////////////// App Editing
    ///////////////////////////////////////////////////// App Editing
    ///////////////////////////////////////////////////// App Editing









    ///////////////////////////////////////////////////// Media Vault File Picker
    $rootScope.mediavault_filepicker = function(img_obj){
        $rootScope.$broadcast('mediavault', {
            data:{
                img_obj: img_obj
            }
        });
    }
    $rootScope.$on('mediavault', function(event, args) {
        $rootScope.media_vault_visible = true;
        img_obj = args.data.img_obj;
        $rootScope.elementToUpdate = true;
    });
    $rootScope.selectMedia = function(selected){
        img_obj.source = selected;
        $rootScope.elementToUpdate = false;
        $timeout(function(){
            $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image selected."
                }
            });
        }, 500);
    }
    ///////////////////////////////////////////////////// Media Vault File Picker






    















    ///////////////////////////////////////////////////// Compile Images and Paginate
    image_data.getImages().then(function(result){
        if(result.length > 0){
            $rootScope.imagelist = result;
            imagelist = result;
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
        }
    });
    ///////////////////////////////////////////////////// Compile Images and Paginate



    ///////////////////////////////////////////////////// Media Vault Query
    $rootScope.queryMedia = function(query){
        $rootScope.currentPage = 0;
        $rootScope.imagelist = filterFilter($rootScope.imagelist,query);
        $rootScope.numberOfPages = Math.ceil($rootScope.imagelist.length/$rootScope.pageSize);
    }
    $rootScope.clearQueryMedia = function(){
        $rootScope.currentPage = 0;
        $rootScope.queryFilter = undefined;
        $rootScope.imagelist = imagelist;
        $rootScope.numberOfPages = Math.ceil($rootScope.imagelist.length/$rootScope.pageSize);
    }
    ///////////////////////////////////////////////////// Media Vault Query



    ///////////////////////////////////////////////////// Update Media
    $rootScope.updateMedia = function(image){
        $rootScope.updatedMedia = {};
        if(image.metadata.cover == null){
            image.metadata.cover = false;
        }
        if(image.metadata.tags == null){
            image.metadata.tags = null;
        }
        if(image.metadata.name == null){
            image.metadata.name = null;
        }
        if(image.metadata.description == null){
            image.metadata.description = null;
        }
        var tags = image.metadata.tags;
        var cover = image.metadata.cover;
        var name = image.metadata.name;
        var description = image.metadata.description;
        var newMetadata = {
            tags: tags,
            cover: cover,
            name: name,
            description: description
        };
        imageDatabase.child(image.id).child("metadata").update(newMetadata);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image Updated"
                }
            });
        }, 500);
    }
    
    ///////////////////////////////////////////////////// Update Media


    


    ///////////////////////////////////////////////////// Remove Media
    $rootScope.deleteMedia = function(image, index){
        var image_source;
        var idx = index;
        $rootScope.imagelist.splice(idx, 1);
        image_source = image.source.split('https://storage.googleapis.com/spsd-189118.appspot.com/media/images/').pop();
        imageStorage.child('/' + image_source).delete().then(function() {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Image Removed From Storage"
                    }
                });
            }, 500);
        }).catch(function(error) {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Error Removing Image From Storage " + error
                    }
                });
            }, 500);
        });
    
        imageDatabase.child(image.id).remove().then(function(){
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Image Removed From Database"
                    }
                });
            }, 500);
        }).catch(function(error) {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Error Removing Image From Database " + error
                    }
                });
            }, 500);
        });
    }
    
    ///////////////////////////////////////////////////// Remove Media













    ///////////////////////////////////////////////////// Manage Tags
    ///////////////////////////////////////////////////// Manage Tags
    ///////////////////////////////////////////////////// Manage Tags

    $scope.tags = [];
    $rootScope.updateTags = function(tags){        
        angular.forEach(tags, function(tag) {
            return new Promise(function (resolve, reject) {
                //Upload tag
                var tagObj = {}
                tagObj.tag = tag;
                var task = tagArray.$add(tagObj);
                $rootScope.taglist.push(tagObj);
            });
        });
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Tags Added"
                }
            });
        }, 500);
        $scope.tags = [];
    }

    ///////////////////////////////////////////////////// Manage Tags
    ///////////////////////////////////////////////////// Manage Tags
    ///////////////////////////////////////////////////// Manage Tags












    ///////////////////////////////////////////////////// Manage Galleries
    ///////////////////////////////////////////////////// Manage Galleries
    ///////////////////////////////////////////////////// Manage Galleries



    ///////////////////////////////////////////////////// Galleries View Toggle
    $rootScope.switchViewGalleries = function() {
        if($rootScope.galleriesgridview == false){
            $rootScope.galleriesgridview = true;
        } else {
            $rootScope.galleriesgridview = false;
        }
    }
    ///////////////////////////////////////////////////// Galleries View Toggle


    ///////////////////////////////////////////////////// Add a new Gallery
    $rootScope.addGalleryTemplate = function(){
        var galleryObj = {};
        galleryObj.featured = false;
        $rootScope.new_gallery = true;
        $rootScope.galleries.unshift(galleryObj);
        newGalleryIndex = $rootScope.galleries.indexOf(galleryObj);        
    }
    $rootScope.cancelGallery = function(){
        $rootScope.galleries.splice(0, 1);
        $rootScope.new_gallery = false;
    }
    ///////////////////////////////////////////////////// Add a new Gallery

    $rootScope.updateGallery = function(gallery){
        var updatedGallery = {};
        updatedGallery.description = gallery.description;
        updatedGallery.featured = gallery.featured;
        updatedGallery.transition = gallery.transition;
        updatedGallery.id = gallery.id
        var storeGallery = galleriesBucket.child(updatedGallery.id).update(updatedGallery);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Project updated"
                }
            });
        }, 500);
    }


    $rootScope.updateGalleries = function(galleries){
        var galleriesList = {};
        var newID = 0;
        angular.forEach(galleries, function(value, key){
            galleriesList[newID] = value;
            galleriesList[newID].id = newID;
            galleriesList[newID].key = newID;
            newID++;
        });
        var data = angular.toJson(galleriesList);
        var update = JSON.parse(data);        
        var galleryUpdate = galleriesBucket.set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Project order updated"
                }
            });
        }, 500);
    }


    $rootScope.addGallery = function(gallery){
        // trim titles to become urls
        var trim_title = function(title){
            var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
            return newURL;
        }
        // trim titles to become urls        
        var newGallery = {};
        newGallery.name = gallery.name;
        newGallery.description = gallery.description;
        newGallery.url = trim_title(gallery.name);
        newGallery.featured = gallery.featured;
        newGallery.transition = (gallery.transition ? gallery.transition : 0);
        newGallery.tag = gallery.name;
        newGallery.id = uuid.v4();
        var tagObj = {}
        tagObj.tag = gallery.name;
        var task = tagArray.$add(tagObj);
        $rootScope.taglist.push(tagObj);
        $rootScope.galleries.splice(newGalleryIndex, 1);
        newGalleryIndex = null;
        var storeGallery = galleriesBucket.child(newGallery.id).set(newGallery);
        var galleryRef = galleriesBucket.child(newGallery.id);
        var galleryList = $rootScope.galleries;
        var galleryLength = galleryList.length;
        galleryRef.once("value")
        .then(function(snapshot){
            var gallerySnapshot = snapshot.val();
            $rootScope.galleries.unshift(gallerySnapshot);
            $rootScope.new_gallery = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "New project added"
                    }
                });
            }, 500);
        });
    }

    ///////////////////////////////////////////////////// Manage Galleries
    ///////////////////////////////////////////////////// Manage Galleries
    ///////////////////////////////////////////////////// Manage Galleries





















    ///////////////////////////////////////////////////// FILE UPLOADING
    ///////////////////////////////////////////////////// FILE UPLOADING
    ///////////////////////////////////////////////////// FILE UPLOADING

    // Upload Files After Preview (Currently Images Only)
    $rootScope.sendFiles = function(files){        
        angular.forEach(files, function(file) {
            var metadata = {};
            metadata.name = file.name;
            return new Promise(function (resolve, reject) {
                var task = imageStorage.child(file.name).put(file, metadata);
                task.on('state_changed',
                    function progress(snapshot){
                        file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    },
                    function error(err){
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "An upload failed."
                                }
                            });
                        }, 500);
                    },
                    function complete(){
                        var fileObj = {};
                        fileObj.metadata = {};
                        var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/images/"
                        fileObj.source = appended_cloud_source + task.snapshot.metadata.name;
                        if(file.tags) {fileObj.metadata.tags = file.tags};
                        fileObj.uploadID = uuid.v4();

                        var storeMedia = imageDatabase.child(fileObj.uploadID).set(fileObj);
                        file.metadata = {};
                        file.source = fileObj.source;
                        file.filename = file.name;
                        if(file.metadata.tags = file.tags){
                            file.metadata.tags = file.tags
                        } else {
                            file.metadata.tags = "no tag";
                        }
                        file.id = fileObj.uploadID;
                        $rootScope.imagelist.unshift(file);
                    }
                );
            });
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Successfully Uploaded"
                    }
                });
            }, 500);
        });

    }


    ///////////////////////////////////////////////////// FILE UPLOADING
    ///////////////////////////////////////////////////// FILE UPLOADING
    ///////////////////////////////////////////////////// FILE UPLOADING











    ///////////////////////////////////////////////////// Manage Tasks
    ///////////////////////////////////////////////////// Manage Tasks
    ///////////////////////////////////////////////////// Manage Tasks



    ///////////////////////////////////////////////////// task.name
    ///////////////////////////////////////////////////// task.title
    ///////////////////////////////////////////////////// task.body
    ///////////////////////////////////////////////////// task.link
    ///////////////////////////////////////////////////// task.user_action_trigger
    ///////////////////////////////////////////////////// task.type reoccuring, manual, one-time?
    ///////////////////////////////////////////////////// task.delivery_medium
    ///////////////////////////////////////////////////// task.deliver_to_role
    ///////////////////////////////////////////////////// task.deliver_to
    ///////////////////////////////////////////////////// task.deliver_report_to
    ///////////////////////////////////////////////////// task.deliver_report_to_role
    ///////////////////////////////////////////////////// task.specified_run_date
    ///////////////////////////////////////////////////// task.frequency
    ///////////////////////////////////////////////////// task.run_day
    ///////////////////////////////////////////////////// task.run_week
    ///////////////////////////////////////////////////// task.run_clock_time
    ///////////////////////////////////////////////////// task.in_app_dialog_style
    ///////////////////////////////////////////////////// task.media_source

    task_data.getTasks().then(function(result){
        if(result.length > 0){
            $rootScope.tasklist = result;     
        }
    });

    var this_month;
    var next_month;

    $rootScope.task = {};

    $rootScope.times = [
        "Closed", "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    $rootScope.timesSans = [
        "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    //create function that encodes and decodes time from readable to milliseconds
    function decodeTime(unit){
        var val;
        console.log(isNaN(unit));
        isNaN(unit) ? val = calcMilliseconds(unit) : val = calcTime(unit);
        console.log("decode time function running");
        return val;
    }

    function calcMilliseconds(unit){
        var result;
        console.log(unit);
        switch(unit) {
            case "6:30AM":
                result = 13 * 1800000;
                break; 
            case "7:00AM":
                result = 14 * 1800000;
                break; 
            case "7:30AM":
                result = 15 * 1800000;
                break; 
            case "8:00AM":
                result = 16 * 1800000;
                break; 
            case "8:30AM":
                result = 17 * 1800000;
                break; 
            case "9:00AM":
                result = 18 * 1800000;
                break; 
            case "9:30AM":
                result = 19 * 1800000;
                break; 
            case "10:00AM":
                result = 20 * 1800000;
                break; 
            case "10:30AM":
                result = 21 * 1800000;
                break; 
            case "11:00AM":
                result = 22 * 1800000;
                break; 
            case "11:30AM":
                result = 23 * 1800000;
                break; 
            case "12:00PM":
                result = 24 * 1800000;
                break; 
            case "12:30PM":
                result = 25 * 1800000;
                break; 
            case "1:00PM":
                result = 26 * 1800000;
                break; 
            case "1:30PM":
                result = 27 * 1800000;
                break; 
            case "2:00PM":
                result = 28 * 1800000;
                break; 
            case "2:30PM":
                result = 29 * 1800000;
                break; 
            case "3:00PM":
                result = 30 * 1800000;
                break; 
            case "3:30PM":
                result = 31 * 1800000;
                break; 
            case "4:00PM":
                result = 32 * 1800000;
                break;
            case "4:30PM":
                result = 33 * 1800000;
                break;
            case "5:00PM":
                result = 34 * 1800000;
                break; 
            case "5:30PM":
                result = 35 * 1800000;
                break; 
            case "6:00PM":
                result = 36 * 1800000;
                break; 
            case "6:30PM":
                result = 37 * 1800000;
                break; 
            case "7:00PM":
                result = 38 * 1800000;
                break; 
            case "7:30PM":
                result = 39 * 1800000;
                break; 
            case "8:00PM":
                result = 40 * 1800000;
                break;
            default:
                result = "No Matches";
                break;
        }

        return result;
    }
    function calcTime(unit){
        var result;
        switch(unit) {
            case 13 * 1800000:
                result = "6:30AM";
                break; 
            case 14 * 1800000:
                result = "7:00AM";
                break; 
            case 15 * 1800000:
                result = "7:30AM";
                break; 
            case 16 * 1800000:
                result = "8:00AM";
                break; 
            case 17 * 1800000:
                result = "8:30AM";
                break; 
            case 18 * 1800000:
                result = "9:00AM";
                break; 
            case 19 * 1800000:
                result = "9:30AM";
                break; 
            case 20 * 1800000:
                result = "10:00AM";
                break; 
            case 21 * 1800000:
                result = "10:30AM";
                break; 
            case 22 * 1800000:
                result = "11:00AM";
                break; 
            case 23 * 1800000:
                result = "11:30AM";
                break; 
            case 24 * 1800000:
                result = "12:00PM";
                break; 
            case 25 * 1800000:
                result = "12:30PM";
                break; 
            case 26 * 1800000:
                result = "1:00PM";
                break; 
            case 27 * 1800000:
                result = "1:30PM";
                break; 
            case 28 * 1800000:
                result = "2:00PM";
                break; 
            case 29 * 1800000:
                result = "2:30PM";
                break; 
            case 30 * 1800000:
                result = "3:00PM";
                break; 
            case 31 * 1800000:
                result = "3:30PM";
                break; 
            case 32 * 1800000:
                result = "4:00PM";
                break;
            case 33 * 1800000:
                result = "4:30PM";
                break;
            case 34 * 1800000:
                result = "5:00PM";
                break; 
            case 35 * 1800000:
                result = "5:30PM";
                break; 
            case 36 * 1800000:
                result = "6:00PM";
                break; 
            case 37 * 1800000:
                result = "6:30PM";
                break; 
            case 38 * 1800000:
                result = "7:00PM";
                break; 
            case 39 * 1800000:
                result = "7:30PM";
                break; 
            case 40 * 1800000:
                result = "8:00PM";
                break;
            default:
                result = "No Matches";
                break;
        }

        return result;
    }


    // Conditions

    $rootScope.app_triggers = [
        "Internal User Shares A File",
        "External User Shares A File"
    ];

    // Conditions



    var quantifyFrequency = function(frequency){
        var quantity = 0;
        switch(frequency){
            case "daily": 
                quantity = 86400000;
                break;
            case "weekly": 
                quantity = 604800000;
                break;
            case "bi-weekly": 
                quantity = 1209600000;
                break;
            case "monthly": 
                quantity = 2628288000;
                break;
            default:
                break;
        }
        return quantity;
    }
        
    // build month object
    function compileMonth (month, year) {
        var month_var = {};
        var workingMonth = month - 1;
        var numOfDays = new Date(year, month, 0).getDate();
        var this_date = new Date(year, workingMonth, 1);
        month_var.date = this_date;
        month_var.year = year;
        month_var.number_of_days = numOfDays;
        month_var.month_number = workingMonth;
        // console.log("Month Compile " + JSON.stringify(month_var));
        return month_var;
    }
    // build month object


    // get day number of week
    function getDayOfWeek(day, month, year){
        var working_date = new Date(year, month, day);
        var result = working_date.getDay();
        return result;
    }
    // get day number of week


    // compile function
    function compileMonthAlg(monthObj){

        var wk_idx = 0;
        var compiled_month = [];

        

        for (var i = 1; i <= monthObj.number_of_days; i++) {

            var compiled_day = {};
            compiled_day.day = getDayOfWeek(i, monthObj.month_number, monthObj.year);
            compiled_day.date = new Date(monthObj.year, monthObj.month_number, i);
            compiled_day.milliseconds = Date.parse(compiled_day.date);
            compiled_day.day_number = i;
            compiled_day.week = wk_idx;
            compiled_month.push(compiled_day);            

            if (compiled_day.day > 5){
                wk_idx++;
            }

        }

        // console.log("Month Compile Alg " + JSON.stringify(compiled_month));
        return compiled_month;

    }

    var checkIfNextYear = function(month){
        if (month > 12){
            return true;
        } else {
            return false;
        }
    }

    var initDate = function(){
        // initial scheduling setup
        var date_var1 = new Date();
        var now_milliseconds = Date.now();
        var today_number = date_var1.getDay();
        var today_day_number = date_var1.getDate();
        var today_month = date_var1.getMonth();
        var this_year = date_var1.getFullYear();
        var today_month_plus_one = today_month + 1;
        var next_month_plus_one = today_month_plus_one + 1;
        var next_year = this_year + 1;
        var number_of_days_in_a_week = 7;
        var nextMonthIsNewYear = checkIfNextYear(next_month_plus_one);
        // initial scheduling setup

        ///////////// This month
        var thisMonth = compileMonth(today_month_plus_one, this_year);
        ///////////// This month

        ///////////// Next Month
        var nextMonth;
        if (nextMonthIsNewYear === true) {
           nextMonth = compileMonth(1, next_year); 
        } else {
           nextMonth = compileMonth(next_month_plus_one, this_year); 
        }
        ///////////// Next Month

        this_month = compileMonthAlg(thisMonth);
        next_month = compileMonthAlg(nextMonth);
    }
    

    $rootScope.createTask = function(task){

        $rootScope.taskAddObj = {};
        // $scope.createTaskForm.$setPristine();
        // $scope.createTaskForm.$setUntouched();
                
        //////////////////============== task conditional configuration

        ////////////////// Trigger type One Time
        if (task.task_type == "onetime"){

        }
        ////////////////// Trigger type One Time

        ////////////////// Trigger type Manual
        if (task.task_type == "manual"){

        }
        ////////////////// Trigger type Manual

        ////////////////// Trigger type Reoccuring
        // Properties being set
        // task.next_runtime
        if (task.task_type == "reoccuring"){

            initDate();

            if (task.frequency == "monthly"){

                ThisMonthLoop:
                for (var i = 0; i < this_month.length; i++) {
                    
                    var this_day = this_month[i];
                    
                    if(this_day.week === task.run_week && this_day.day === task.run_day){
                        
                        var clock_time = decodeTime(task.run_clock_time);
                        var currentDate = new Date();
                        var currentDateTime = currentDate.getTime();
                        var proposedDate = clock_time + this_day.milliseconds;
                        
                        if (proposedDate < currentDateTime){

                            setTaskNextMonth();

                            break ThisMonthLoop;

                        } else {

                            task.next_runtime = clock_time + this_day.milliseconds;
                            var next_date = new Date(task.next_runtime);
                            var display_date = next_date.toLocaleString();

                            $timeout(function(){
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Next Run Time " + display_date
                                    }
                                });
                            }, 1500);

                            break ThisMonthLoop;

                        }

                    } else {

                        setTaskNextMonth();

                        break ThisMonthLoop;

                    }
                }

                function setTaskNextMonth(){

                    NextMonthLoop:
                    for (var i = 0; i < next_month.length; i++) {
                        var this_day = next_month[i];
                        if(this_day.week === task.run_week && this_day.day === task.run_day){
                            var clock_time = decodeTime(task.run_clock_time);
                            task.next_runtime = clock_time + this_day.milliseconds;
                            var next_date = new Date(task.next_runtime);
                            var display_date = next_date.toLocaleString();
                            $timeout(function(){
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Next Run Time " + display_date
                                    }
                                });
                            }, 1500);

                            break NextMonthLoop;

                        }
                    }
                }
                
            } else if (task.frequency == 'bi-weekly' || task.frequency == 'weekly'){
                var tempDate = new Date();
                var today_day_number = tempDate.getDate();
                var working_day_number = today_day_number - 1;

                for (var i = working_day_number; i < this_month.length; i++) {
                    var this_day = this_month[i];

                    if(this_day.day === task.run_day){
                        var clock_time = decodeTime(task.run_clock_time);
                        var currentDate = new Date();
                        var currentDateTime = currentDate.getTime();
                        var proposedDate = clock_time + this_day.milliseconds;
                        var isNextMonthCheck = i + 1;
                        
                        if (isNextMonthCheck == this_month.length){
                            setTaskNextMonth();
                        } else {
                            task.next_runtime = clock_time + this_day.milliseconds + quantifyFrequency(task.frequency);
                            console.log(task.next_runtime);
                            var next_date = new Date(task.next_runtime);
                            var display_date = next_date.toLocaleString();
                            $timeout(function(){
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Next Run Time " + display_date
                                    }
                                });
                            }, 1500);  
                        }

                        break; 
                    }
                }
                function setTaskNextMonth(){
                    for (var i = 0; i < next_month.length; i++) {
                        var this_day = next_month[i];
                        if(this_day.day === task.run_day){
                            var clock_time = decodeTime(task.run_clock_time);
                            task.next_runtime = clock_time + this_day.milliseconds + quantifyFrequency(task.frequency);
                            var next_date = new Date(task.next_runtime);
                            var display_date = next_date.toLocaleString();
                            $timeout(function(){
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Next Run Time " + display_date
                                    }
                                });
                            }, 1500);
                            break;
                        }
                    }
                }

            } else if (task.frequency == 'daily'){

                var tempDate = new Date();
                var today_day_number = tempDate.getDate();
                var working_day_number = today_day_number;
                var tomorrow_obj = this_month[working_day_number];
                var clock_time = decodeTime(task.run_clock_time);
                task.next_runtime = clock_time + tomorrow_obj.milliseconds;
                var next_date = new Date(task.next_runtime);
                var display_date = next_date.toLocaleString();
                $timeout(function(){
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Next Run Time " + display_date
                        }
                    });
                }, 1500);

            } else if (task.frequency == 'annually'){
                
            }

        }
        ////////////////// Trigger type Reoccuring

        ////////////////// Trigger type 4
        if (task.scheduled){

        }
        ////////////////// Trigger type 4

         //////////////////============== task conditional configuration

        
        
        
        //created on and by
        task.created_on = Date.now();
        task.created_by = $rootScope.me.id;

        //task create & read (promise) operation
        task.id = uuid.v4();
        var createTaskOperation = taskBucket.child(task.id).set(task);
        var modifiedTasklist = realtimeDatabase.ref('/data/settings/tasks');
        modifiedTasklist.once("value")
        .then(function(snapshot){
            var taskSnapshot = snapshot.val();
            $rootScope.tasklist = taskSnapshot;
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Task created"
                    }
                });
            }, 500);
        });
    };

    $rootScope.updateTask = function(task){
        
        var theDate = new Date();
        var theDate2 = new Date();
        var theDate3 = new Date();
        var theDateMilliseconds = Date.now();
        var today = theDate.getDay();

        
        
        //modified on and by
        task.modified_on = Date.now();
        task.modified_by = $rootScope.me.id;

        //task modify & read (promise) operation
        var updateTaskOperation = taskBucket.child(task.id).update(task);
        var modifiedTasklist = realtimeDatabase.ref('/data/settings/tasks');
        modifiedTasklist.once("value")
        .then(function(snapshot){
            var taskSnapshot = snapshot.val();
            $rootScope.tasklist = taskSnapshot;
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Task Updated"
                    }
                });
            }, 500);
        });

    };

    $rootScope.deleteTask = function(task){
        var deleteTaskOperation = taskBucket.child(task.id).remove();
        var modifiedTasklist = realtimeDatabase.ref('/data/settings/tasks');
        modifiedTasklist.once("value")
        .then(function(snapshot){
            var taskSnapshot = snapshot.val();
            $rootScope.tasklist = taskSnapshot;
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Task deleted"
                    }
                });
            }, 500);
        });
    };

    $rootScope.clearForm = function(form){
        $rootScope.taskUpdateObj = {};
        $rootScope.indexForm = {};
        $rootScope.spotlightForm = {};
        $rootScope.projectForm = {};
        $rootScope.blogForm = {};
        form.$setPristine();
        form.$setUntouched();
    }

    ///////////////////////////////////////////////////// Manage Tasks
    ///////////////////////////////////////////////////// Manage Tasks
    ///////////////////////////////////////////////////// Manage Tasks
    














    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff

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
        $rootScope.settings.staff.members.unshift(staffObj);
        newStaffIndex = $rootScope.settings.staff.members.indexOf(staffObj);        
    }

    $rootScope.cancelStaff = function(){
        $rootScope.settings.staff.members.splice(0, 1);
        $rootScope.new_staff_member = false;
    }

    $rootScope.addStaffMember = function(newMember){
        var staffList = {};
        var newID = 0;
        angular.forEach($rootScope.settings.staff.members, function(value, key){
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

    $rootScope.removeStaff = function(staff_member, staff){
        staff.splice(staff_member, 1);
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
                    message: "Staff Member Deleted."
                }
            });
        }, 500);
    }

    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff









    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
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
        new_page_data.data.page.foreground.images = {};
        new_page_data.data.page.background = {};
        new_page_data.data.page.background.images = {};
        new_page_data.data.page.contents = [];
        new_page_data.settings = {};
        new_page_data.settings.configs = {};
        // configure data structure

        // mock content
        var paragraphObj = {};
        paragraphObj.data = "It started with a paragraph...";
        paragraphObj.type = "text";

        var imageObj = {};
        imageObj.source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/images/missing-image-wide.png";

        switch(type){
            case "info":
                new_page_data.data.title = data.title;
                new_page_data.data.page.foreground.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/info/" + trim_title(data.title);
                new_page_data.settings.page_type = "info";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                new_page_data.settings.configs.add_content = true;
                new_page_data.settings.configs.contentId = "pages";
                new_page_data.settings.configs.has_title_subtitle = false;
                new_page_data.settings.configs.index_content = false;
                new_page_data.settings.configs.multiview = false;
                new_page_data.settings.configs.mulitview_label = "column";
                new_page_data.settings.configs.primary_image = true;
                new_page_data.settings.configs.reorder_content = true;
                new_page_data.settings.configs.title_view = false;
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
                new_page_data.settings.configs.add_content = true;
                new_page_data.settings.configs.contentId = "pages";
                new_page_data.settings.configs.has_title_subtitle = false;
                new_page_data.settings.configs.index_content = false;
                new_page_data.settings.configs.multiview = false;
                new_page_data.settings.configs.mulitview_label = "column";
                new_page_data.settings.configs.primary_image = false;
                new_page_data.settings.configs.reorder_content = true;
                new_page_data.settings.configs.title_view = false;
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
            case "spotlight":
                new_page_data.data.title = data.title;
                new_page_data.data.page.background.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/spotlight/" + trim_title(data.title);
                new_page_data.settings.page_type = "spotlight";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                new_page_data.settings.configs.add_content = true;
                new_page_data.settings.configs.contentId = "pages";
                new_page_data.settings.configs.has_title_subtitle = false;
                new_page_data.settings.configs.index_content = false;
                new_page_data.settings.configs.multiview = false;
                new_page_data.settings.configs.mulitview_label = "column";
                new_page_data.settings.configs.primary_image = true;
                new_page_data.settings.configs.reorder_content = true;
                new_page_data.settings.configs.title_view = false;
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
            case "blog":
                new_page_data.data.title = data.title;
                new_page_data.data.subtitle = data.subtitle;
                new_page_data.data.headline = data.headline;
                new_page_data.data.author = $rootScope.me.firstname + " " + $rootScope.me.lastname;
                new_page_data.data.date = new Date();
                new_page_data.data.page.background.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/blog/" + trim_title(data.title);
                new_page_data.settings.page_type = "blog";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                new_page_data.settings.configs.add_content = true;
                new_page_data.settings.configs.contentId = "pages";
                new_page_data.settings.configs.has_title_subtitle = true;
                new_page_data.settings.configs.index_content = false;
                new_page_data.settings.configs.multiview = false;
                new_page_data.settings.configs.mulitview_label = "Section";
                new_page_data.settings.configs.primary_image = false;
                new_page_data.settings.configs.reorder_content = true;
                new_page_data.settings.configs.title_view = false;
                $rootScope.pages.push(new_page_data);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Blog post added."
                        }
                    });
                }, 500);
                break;
            case "project":
                new_page_data.data.title = data.title;
                var tagObj = {}
                tagObj.tag = data.title;
                var task = tagArray.$add(tagObj);
                $rootScope.taglist.push(tagObj);
                new_page_data.data.tag = data.tag;
                new_page_data.data.description = data.description;
                new_page_data.data.page.foreground.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/projects/" + trim_title(data.title);
                new_page_data.settings.page_type = "project";
                new_page_data.settings.name = data.title;
                new_page_data.settings.locked = false;
                new_page_data.settings.configs.add_content = true;
                new_page_data.settings.configs.contentId = "pages";
                new_page_data.settings.configs.has_title_subtitle = false;
                new_page_data.settings.configs.index_content = false;
                new_page_data.settings.configs.multiview = false;
                new_page_data.settings.configs.mulitview_label = "Section";
                new_page_data.settings.configs.primary_image = true;
                new_page_data.settings.configs.reorder_content = true;
                new_page_data.settings.configs.title_view = false;
                $rootScope.pages.push(new_page_data);
                var data = angular.toJson($rootScope.pages);
                var update = JSON.parse(data);
                appDataBucket.child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success. Project added."
                        }
                    });
                }, 500);
                break;
            default:
                return;
        }
    }
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages












    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    $rootScope.deletePage = function(page_index){
        console.log(page_index);
        var settings = $rootScope.pages[page_index].settings;
        if(settings.locked == false){
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
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages








    
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation
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
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation





    ///////////////////////////////////////////////////// Crud Settings
    $rootScope.updateSettings = function(){
        var data = angular.toJson($rootScope.settings.data);
        var update = JSON.parse(data);
        var settingsUpdate = settingsBucket.set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Settings updated."
                }
            });
        }, 500);
    }
    ///////////////////////////////////////////////////// Crud Settings





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








    ///////////////////////////////////////////////////// Send Lead
    $rootScope.sendLead = function(lead, source){
        var data = {
            recaptcha : lead.recaptcha,
            name : lead.name,
            email : lead.email,
            message : lead.message,
            source : source
        };
        $rootScope.progressAnimation = true;

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/lead"),
            method: 'POST',
            data: data
        })
        .then(function success (response) {
            $rootScope.messageStatus = true;
            $rootScope.progressAnimation = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! Message Sent."
                    }
                });
            }, 500);
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.progressAnimation = false;
            $rootScope.$broadcast('server-event', {
                data:{
                message: 'Message Sending Failed.'
                }
            });
        });
    }
    ///////////////////////////////////////////////////// Send Lead



    ///////////////////////////////////////////////////// My Vault
    $rootScope.uploadIframeResource = function(user, iframe){

        iframe.id = uuid.v4();
        iframe.link = "/resources/" + iframe.id;
        // Write cloud function to handle each user in the id and send notification and emails
        usersBucket.child(user.id).child("files/" + iframe.id).set(iframe)
        .then(function(){
            $rootScope.$broadcast('server-event', {
                data:{
                    message: "Resource Added"
                }
            });
        }).catch(function(error) {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Error Adding Resource " + error
                    }
                });
            }, 500);
        });
        
    }

    // Upload Files On Select
    $rootScope.uploadMyFiles = function(files, errFiles){
        $scope.myFilesUpload = files;
        $scope.myErrFiles = errFiles;
        angular.forEach(files, function(file) {
            var metadata = {};
            metadata.name = file.name;
            return new Promise(function (resolve, reject) {
                var task = fileStorage.child($rootScope.me.id + "/files/" + file.name).put(file, metadata);
                task.on('state_changed',
                    function progress(snapshot){
                        file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    },
                    function error(err){
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Your upload failed."
                                }
                            });
                        }, 500);
                    },
                    function complete(){
                        var fileObj = {};
                        fileObj.metadata = {};
                        var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/files/" + $rootScope.me.id + "/files/"
                        fileObj.source = appended_cloud_source + task.snapshot.metadata.name;
                        fileObj.id = uuid.v4();
                        file.link = fileObj.source;
                        fileObj.name = task.snapshot.metadata.name;
                        fileObj.modified = new Date();
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "File(s) Added"
                            }
                        });
                        var storeMyUploadedFile = usersBucket.child($rootScope.me.id + "/files/" + fileObj.id).set(fileObj);
                        var modifiedfilelist = usersBucket.child($rootScope.me.id).child("files");
                        modifiedfilelist.once("value")
                        .then(function(snapshot){
                            var taskSnapshot = snapshot.val();
                            $rootScope.me.files = taskSnapshot;
                            $rootScope.$apply();
                        });
                    }
                );
            });
        });
        
    }
    // Upload Files On Select



    $rootScope.deleteMyFile = function(me, file){
        usersBucket.child(me.id).child("files/" + file.id).remove();
        var modifiedfilelist = usersBucket.child(me.id).child("files");
        modifiedfilelist.once("value")
        .then(function(snapshot){
            var taskSnapshot = snapshot.val();
            $rootScope.me.files = taskSnapshot;

            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "File deleted"
                    }
                });
            }, 500);
            $rootScope.$apply();
        });
    };
    ///////////////////////////////////////////////////// My Vault


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
                childData.id = childKey;
                usersList.push(childData);
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
            childData.id = id;
            defer.resolve(childData); 
        });
        return defer.promise;
    }

    return {
        getUsers: getUsers,
        getMe: getMe
    }
})
.factory('role_data', function($q){
    var realtimeDatabase = firebase.database();
    var roleBucket = realtimeDatabase.ref().child('roles');
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
.factory('tag_data', function($q){
    var realtimeDatabase = firebase.database();
    var tagBucket = realtimeDatabase.ref().child('tags');
    var getTags = function(){
        var defer = $q.defer();
        var taglist = [];
        tagBucket.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                taglist.push(childDataValue);
            });
            defer.resolve(taglist); 
        });
        return defer.promise;
    }
    return {
        getTags: getTags
    }
})
.factory('image_data', function($q){
    var realtimeDatabase = firebase.database();
    var imageDatabase = realtimeDatabase.ref().child('media/images');
    var getImages = function(){
        var defer = $q.defer();
        var imagelist = [];
        imageDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                imagelist.push(childDataValue);
            });
            defer.resolve(imagelist); 
        });
        return defer.promise;
    }
    return {
        getImages: getImages
    }
})
.factory('task_data', function($q){
    var realtimeDatabase = firebase.database();
    var taskDatabase = realtimeDatabase.ref().child('data/settings/tasks');
    var getTasks = function(){
        var defer = $q.defer();
        var tasklist = [];
        taskDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                tasklist.push(childDataValue);
            });
            defer.resolve(tasklist); 
        });
        return defer.promise;
    }
    return {
        getTasks: getTasks
    }
})
.factory('video_data', function($q){
    var realtimeDatabase = firebase.database();
    var videoDatabase = realtimeDatabase.ref().child('media/video');
    var getVideos = function(){
        var defer = $q.defer();
        var videolist = [];
        videoDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                videolist.push(childDataValue);
            });
            defer.resolve(videolist); 
        });
        return defer.promise;
    }
    return {
        getVideos: getVideos
    }
})
.factory('gallery_data', function($q){
    var realtimeDatabase = firebase.database();
    var galleryBucket = realtimeDatabase.ref().child('galleries');
    var getGalleries = function(){
        var defer = $q.defer();
        var galleries = [];
        galleryBucket.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.key = childKey;
                galleries.push(childDataValue);
            });
            defer.resolve(galleries); 
        });
        return defer.promise;
    }
    return {
        getGalleries: getGalleries
    }
});
////////////////////////////////////// Firebase Factory Functions




