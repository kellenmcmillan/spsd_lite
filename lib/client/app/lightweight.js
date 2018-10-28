'use strict';

var lightweight = angular.module('lightweight', [
'ngResource', 
'ngAnimate', 
'ngFileUpload',
'ngSanitize'
])
.service("lightweight_firebase", [
"$rootScope",
"$scope",
"$q",
"$timeout",
"$firebaseObject",
"$firebaseArray",
"$firebaseAuth",
"uuid",
"$http",
function(
$rootScope,
$scope,
$q,
$timeout,
$firebaseObject,
$firebaseArray,
$firebaseAuth,
uuid,
$http){


    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    $rootScope.auth = $firebaseAuth();


    this.get_images = function(){
        var defer = $q.defer();
        var imagelist = [];
        realtimeDatabase.ref().child('media/images').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                imagelist.push(childDataValue);
            });
            if(snapshot.length > 0){
                $rootScope.imagelist = imagelist;
                $rootScope.pageSize = 12;
                $rootScope.currentPage = 0;
                $rootScope.numberOfPages = Math.ceil(imagelist.length/$rootScope.pageSize);
            }
        });
    }

    this.put_images = function(arg){
        angular.forEach(arg, function(file) {
            var metadata = {};
            metadata.name = file.name;
            return new Promise(function (resolve, reject) {
                var task = firebaseStorage.ref().child('media/images').child(file.name).put(file, metadata);
                task.on('state_changed',
                    function progress(snapshot){
                        $scope.file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
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

                        realtimeDatabase.ref().child('media/images').child(fileObj.uploadID).set(fileObj);
                        realtimeDatabase.ref().child('media/images')
                        .once("value")
                        .then(function(snapshot){
                            $rootScope.imagelist = snapshot.val();
                        });
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

    this.modify_images = function(arg){

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

    this.delete_images = function(arg){

        var image_source;
        var imagelist = [];
        
        image_source = arg.source.split('https://storage.googleapis.com/spsd-189118.appspot.com/media/images/').pop();
        
        firebaseStorage.ref().child('media/images').child('/' + image_source).delete().then(function() {
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
                        message: "Error Removing Image From Storage"
                    }
                });
            }, 500);
        });
    
        realtimeDatabase.ref().child('media/images').child(arg.id).remove().then(function(){
            realtimeDatabase.ref().child('media/images').once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    var childDataValue = childData;
                    childDataValue.id = childKey;
                    imagelist.push(childDataValue);
                });
                $rootScope.imagelist = imagelist; 
            });
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
                        message: "Error Removing Image From Database"
                    }
                });
            }, 500);
        });

        

    }
    this.get_videos = function(arg){
        return result;
    }
    this.put_videos = function(arg){
        return result;
    }
    this.put_files = function(arg){
        return result;
    }
    this.put_iframe = function(arg, argIframe){
        argIframe.id = uuid.v4();
        argIframe.link = "/resources/" + argIframe.id;
        // Write cloud function to handle each user in the id and send notification and emails
        realtimeDatabase.ref().child('users').child(arg.id).child("files/" + argIframe.id).set(argIframe)
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
                        message: "Error Adding Resource"
                    }
                });
            }, 500);
        });
    }
    this.put_my_files = function(arg, argErr){
        $scope.myFilesUpload = arg;
        $scope.myErrFiles = argErr;
        angular.forEach(arg, function(file) {
            var metadata = {};
            metadata.name = file.name;
            return new Promise(function (resolve, reject) {
                var task = firebaseStorage.ref().child('media/files').child($rootScope.me.id + "/files/" + file.name).put(file, metadata);
                task.on('state_changed',
                    function progress(snapshot){
                        $scope.file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
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
                        realtimeDatabase.ref().child('users').child($rootScope.me.id + "/files/" + fileObj.id).set(fileObj);
                        realtimeDatabase.ref().child('users').child($rootScope.me.id).child("files")
                        .once("value")
                        .then(function(snapshot){
                            $rootScope.me.files = snapshot.val();
                            $rootScope.$apply();
                        });
                    }
                );
            });
        });
    }
    this.delete_my_files = function(arg, argFile){
        realtimeDatabase.ref().child('users').child(arg.id).child("files/" + argFile.id).remove();
        usersBucket.child(arg.id).child("files")
        .once("value")
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
        });
    }
    this.share_files = function(arg){
        return result;
    }
    this.share_social = function(arg){
        return result;
    }
    this.get_users = function(){
        var defer = $q.defer();
        var usersList = [];
        realtimeDatabase.ref().child('users')
        .once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                childData.id = childKey;
                usersList.push(childData);
            });
            if(userslist.length > 0){
                $rootScope.userslist = userslist;
                $rootScope.usersPageSize = 20;
                $rootScope.currentUserPage = 0;
                $rootScope.numberOfUserPages = Math.ceil(userslist.length/$rootScope.usersPageSize);
        } 
        });
    }
    this.get_user = function(arg){
        return result;
    }
    this.put_user = function(arg){
        
        var usersList = [];

        var data = {
            address : {
                city : arg.address.city,
                state : arg.address.state,
                street : arg.address.street,
                zipcode : arg.address.zipcode
            },
            birthday : arg.birthday,
            firstname : arg.firstname,
            lastname : arg.lastname,
            phone : arg.phone,
            email : arg.email,
            security : {
                roles : arg.security.roles
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
                        message: "User Added."
                    }
                });
            }, 500);
            realtimeDatabase.ref().child('users').once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    childData.id = childKey;
                    usersList.push(childData);
                });
                $rootScope.usersList = userslist;
                $rootScope.messageStatus = true;
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Your Users Have Been Updated"
                        }
                    });
                }, 1000);
            });
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Registration Failed ' + response.statusText
                }
            });
        });
    }
    this.modify_user = function(arg){
        var data = angular.toJson(arg);
        var update = JSON.parse(data);
        realtimeDatabase.ref().child('users').child(arg.id).update(update);
        realtimeDatabase.ref().child('users').child(arg.id).once("value")
        .then(function(snapshot) {
            $rootScope.userslist[arg.id] = snapshot.val();
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "User Updated."
                    }
                });
            }, 500);
        });
    }
    this.delete_user = function(arg){

        var usersList = [];
        
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
            realtimeDatabase.ref().child('users').once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    childData.id = childKey;
                    usersList.push(childData);
                });
                $rootScope.messageStatus = true;
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success! User Deleted"
                        }
                    });
                }, 500);
            });
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Failed To Delete User. ' + response.message
                }
            });
        });

        
    }
    this.get_self = function(arg){
        var defer = $q.defer();
        var user = {};
        realtimeDatabase.ref().child('users').child(arg).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            childData.id = arg;
            defer.resolve(childData); 
        });
        return defer.promise;
    }
    this.modify_self = function(arg){
        return result;
    }
    this.reset_password = function(arg){
        
        var data = {
            password : arg.resetPassword,
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
    this.get_roles = function(){
        var rolelist = [];
        realtimeDatabase.ref().child('roles').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                childDataValue.id = childKey;
                childDataValue.role = childData;
                rolelist.push(childDataValue);
            });
            $rootScope.rolelist = rolelist; 
        });
    }
    this.get_data = function(arg){
        return result;
    }
    this.modify_data = function(arg){
        var index_content = arg.settings.configs.index_content;
        var save_path;
        if (index_content){
            save_path = "index/" + arg.settings.configs.contentId;
        } else {
            save_path = arg.settings.configs.contentId;
        }
        var data = angular.toJson($rootScope[arg.settings.configs.contentId]);
        var update = JSON.parse(data);
        appDataBucket.child(save_path).set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Content updated."
                }
            });
        }, 500);
    }
    this.put_data = function(arg){
        return result;
    }
    this.get_tags = function(){
        var defer = $q.defer();
        var taglist = [];
        realtimeDatabase.ref().child('tags').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                taglist.push(childData);
            });
            defer.resolve(taglist); 
        });
        return defer.promise;
    }
    this.modify_tags = function(arg){

        var tagsBucket = realtimeDatabase.ref().child('tags');
        var tagArray = $firebaseArray(tagsBucket);
        angular.forEach(arg, function(tag) {
            return new Promise(function (resolve, reject) {
                //Upload tag
                var tagObj = {}
                tagObj.tag = tag;
                tagArray.$add(tagObj);
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
    this.get_galleries = function(arg){
        var galleries = [];
        realtimeDatabase.ref().child('galleries').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.key = childKey;
                galleries.push(childDataValue);
            });
            $rootScope.galleries = galleries;
        });
    }
    this.modify_galleries = function(arg){

        var galleriesList = {};
        var newID = 0;
        angular.forEach(arg, function(value, key){
            galleriesList[newID] = value;
            galleriesList[newID].id = newID;
            galleriesList[newID].key = newID;
            newID++;
        });
        var data = angular.toJson(galleriesList);
        var update = JSON.parse(data);        
        realtimeDatabase.ref().child('galleries').set(update);
        realtimeDatabase.ref().child('galleries').once("value")
        .then(function(snapshot){
            $rootScope.galleries = snapshot.val();
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Gallery Order Updated"
                    }
                });
            }, 500);
        });

    }
    this.get_gallery = function(arg){
        return result;
    }
    this.put_gallery = function(arg){
        // trim titles to become urls
        var trim_title = function(title){
            var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
            return newURL;
        }
        // trim titles to become urls        
        var newGallery = {};
        newGallery.name = arg.name;
        newGallery.description = arg.description;
        newGallery.url = trim_title(arg.name);
        newGallery.featured = arg.featured;
        newGallery.transition = (arg.transition ? arg.transition : 0);
        newGallery.tag = arg.name;
        newGallery.id = uuid.v4();
        // tags
        var tagObj = {}
        tagObj.tag = arg.name;
        var tagsBucket = realtimeDatabase.ref().child('tags');
        $firebaseArray(tagsBucket).$add(tagObj);
        $rootScope.taglist.push(tagObj);
        // tags
        $rootScope.galleries.splice(newGalleryIndex, 1);
        newGalleryIndex = null;
        realtimeDatabase.ref().child('galleries').child(newGallery.id).set(newGallery);
        realtimeDatabase.ref().child('galleries').once("value")
        .then(function(snapshot){
            $rootScope.galleries = snapshot.val();
            $rootScope.new_gallery = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "New Gallery Added"
                    }
                });
            }, 500);
        });
    }
    this.modify_gallery = function(arg){
        var updatedGallery = {};
        updatedGallery.description = arg.description;
        updatedGallery.featured = arg.featured;
        updatedGallery.transition = (arg.transition ? arg.transition : 0);
        updatedGallery.id = arg.id
        realtimeDatabase.ref().child('galleries').child(arg.id).update(updatedGallery);
        realtimeDatabase.ref().child('galleries').child(arg.id).once("value")
        .then(function(snapshot){
            $rootScope.galleries[arg.id] = snapshot.val();
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Gallery Updated"
                    }
                });
            }, 500);
        });
    }
    this.get_projects = function(arg){
        return result;
    }
    this.put_projects = function(arg){
        return result;
    }
    this.get_project = function(arg){
        return result;
    }
    this.put_project = function(arg){
        return result;
    }
    this.modify_project = function(arg){
        return result;
    }
    this.get_settings = function(arg){
        return result;
    }
    this.modify_settings = function(arg){
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
    this.modify_navigation = function(){
        var data = angular.toJson($rootScope.settings.navigation);
        var update = JSON.parse(data);
        var navUpdate = realtimeDatabase.ref('/data/settings/navigation').set(update);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Navigation updated."
                }
            });
        }, 500);
    }
    this.put_staff = function(arg){
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
        realtimeDatabase.ref('/data/settings/staff/members').set(update);
        realtimeDatabase.ref('/data/settings/staff/members').once('value')
        .then(function(snapshot) {
            $rootScope.settings.staff.members = snapshot.val();
        });
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: arg.name + " added"
                }
            });
        }, 500);
    }
    this.modify_staff = function(arg){
        var data = angular.toJson(arg);
        var update = JSON.parse(data);
        realtimeDatabase.ref('/data/settings/staff/members').child(arg.id).set(update);
        realtimeDatabase.ref('/data/settings/staff/members').child(arg.id).once('value')
        .then(function(snapshot) {
            $rootScope.settings.staff.members[arg.id] = snapshot.val();
        });
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: arg.name + " updated"
                }
            });
        }, 500);
    }
    this.delete_staff = function(arg, argStaff){
        argStaff.splice(arg, 1);
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
        realtimeDatabase.ref('/data/settings/staff/members').set(update);
        realtimeDatabase.ref('/data/settings/staff/members').once('value')
        .then(function(snapshot) {
            $rootScope.settings.staff.members = snapshot.val();
        });
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: arg.name + " Removed"
                }
            });
        }, 500);
    }
    this.put_page = function(arg, argData){
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

        switch(arg){
            case "info":
                new_page_data.data.title = argData.title;
                new_page_data.data.page.foreground.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/info/" + trim_title(argData.title);
                new_page_data.settings.page_type = "info";
                new_page_data.settings.name = argData.title;
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
                realtimeDatabase.ref().child('data').child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Page added."
                        }
                    });
                }, 500);
                break;
            case "announcement":
                new_page_data.data.title = argData.title;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/announcement/" + trim_title(argData.title);
                new_page_data.settings.page_type = "announcement";
                new_page_data.settings.name = argData.title;
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
                realtimeDatabase.ref().child('data').child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Page added."
                        }
                    });
                }, 500);
                break;
            case "spotlight":
                new_page_data.data.title = argData.title;
                new_page_data.data.page.background.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/spotlight/" + trim_title(argData.title);
                new_page_data.settings.page_type = "spotlight";
                new_page_data.settings.name = argData.title;
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
                realtimeDatabase.ref().child('data').child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Page added."
                        }
                    });
                }, 500);
                break;
            case "blog":
                new_page_data.data.title = argData.title;
                new_page_data.data.subtitle = argData.subtitle;
                new_page_data.data.headline = argData.headline;
                new_page_data.data.author = $rootScope.me.firstname + " " + $rootScope.me.lastname;
                new_page_data.data.date = new Date();
                new_page_data.data.page.background.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/blog/" + trim_title(argData.title);
                new_page_data.settings.page_type = "blog";
                new_page_data.settings.name = argData.title;
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
                realtimeDatabase.ref().child('data').child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Blog post added."
                        }
                    });
                }, 500);
                break;
            case "project":
                new_page_data.data.title = argData.title;
                var tagObj = {}
                tagObj.tag = data.title;
                var task = tagArray.$add(tagObj);
                $rootScope.taglist.push(tagObj);
                new_page_data.data.tag = argData.tag;
                new_page_data.data.description = argData.description;
                new_page_data.data.page.foreground.images.source = imageObj.source;
                new_page_data.data.page.contents.push(paragraphObj);
                new_page_data.settings.url = "/projects/" + trim_title(argData.title);
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
                realtimeDatabase.ref().child('data').child("pages").set(update);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Project Added"
                        }
                    });
                }, 500);
                break;
            default:
                return;
        }
    }
    this.delete_page = function(arg){
        var settings = $rootScope.pages[arg].settings;
        if(settings.locked == false){
            $rootScope.pages.splice(arg, 1);
            var data = angular.toJson($rootScope.pages);
            var update = JSON.parse(data);
            realtimeDatabase.ref().child('data').child("pages").set(update);
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Page Removed"
                    }
                });
            }, 500);
        } else {
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Failed To Remove Page"
                    }
                });
            }, 500);
        }
    }

    this.get_tasks = function(){
        var tasklist = [];
        var this_month;
        var next_month;
        realtimeDatabase.ref().child('data/settings/tasks').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                tasklist.push(childDataValue);
            });
            $rootScope.tasklist = tasklist; 
        });
    }
    
    this.put_task = function(arg){

        var this_month;
        var next_month;

        // functions that help compute next runtime
        function decodeTime(c){return isNaN(c)?calcMilliseconds(c):calcTime(c)}
        function calcMilliseconds(e){var a;switch(e){case"6:30AM":a=234e5;break;case"7:00AM":a=252e5;break;case"7:30AM":a=27e6;break;case"8:00AM":a=288e5;break;case"8:30AM":a=306e5;break;case"9:00AM":a=324e5;break;case"9:30AM":a=342e5;break;case"10:00AM":a=36e6;break;case"10:30AM":a=378e5;break;case"11:00AM":a=396e5;break;case"11:30AM":a=414e5;break;case"12:00PM":a=432e5;break;case"12:30PM":a=45e6;break;case"1:00PM":a=468e5;break;case"1:30PM":a=486e5;break;case"2:00PM":a=504e5;break;case"2:30PM":a=522e5;break;case"3:00PM":a=54e6;break;case"3:30PM":a=558e5;break;case"4:00PM":a=576e5;break;case"4:30PM":a=594e5;break;case"5:00PM":a=612e5;break;case"5:30PM":a=63e6;break;case"6:00PM":a=648e5;break;case"6:30PM":a=666e5;break;case"7:00PM":a=684e5;break;case"7:30PM":a=702e5;break;case"8:00PM":a=72e6;break;default:a="No Matches"}return a}
        function calcTime(e){var a;switch(e){case 234e5:a="6:30AM";break;case 252e5:a="7:00AM";break;case 27e6:a="7:30AM";break;case 288e5:a="8:00AM";break;case 306e5:a="8:30AM";break;case 324e5:a="9:00AM";break;case 342e5:a="9:30AM";break;case 36e6:a="10:00AM";break;case 378e5:a="10:30AM";break;case 396e5:a="11:00AM";break;case 414e5:a="11:30AM";break;case 432e5:a="12:00PM";break;case 45e6:a="12:30PM";break;case 468e5:a="1:00PM";break;case 486e5:a="1:30PM";break;case 504e5:a="2:00PM";break;case 522e5:a="2:30PM";break;case 54e6:a="3:00PM";break;case 558e5:a="3:30PM";break;case 576e5:a="4:00PM";break;case 594e5:a="4:30PM";break;case 612e5:a="5:00PM";break;case 63e6:a="5:30PM";break;case 648e5:a="6:00PM";break;case 666e5:a="6:30PM";break;case 684e5:a="7:00PM";break;case 702e5:a="7:30PM";break;case 72e6:a="8:00PM";break;default:a="No Matches"}return a}
        function quantifyFrequency(e){var a=0;switch(e){case"daily":a=864e5;break;case"weekly":a=6048e5;break;case"bi-weekly":a=12096e5;break;case"monthly":a=2628288e3}return a};
        function getDayOfWeek(e,t,n){return new Date(n,t,e).getDay()}
        function compileMonth(e,n){var t={},a=e-1,r=new Date(n,e,0).getDate(),o=new Date(n,a,1);return t.date=o,t.year=n,t.number_of_days=r,t.month_number=a,t}
        function compileMonthAlg(e){for(var a=0,n=[],r=1;r<=e.number_of_days;r++){var t={};t.day=getDayOfWeek(r,e.month_number,e.year),t.date=new Date(e.year,e.month_number,r),t.milliseconds=Date.parse(t.date),t.day_number=r,t.week=a,n.push(t),t.day>5&&a++}return n}
        function checkIfNextYear(e){return e>12};
        function runtimeAlg(){var t,e=new Date,o=(Date.now(),e.getDay(),e.getDate(),e.getMonth()),n=e.getFullYear(),h=o+1,a=h+1,i=n+1,l=checkIfNextYear(a),c=compileMonth(h,n);t=!0===l?compileMonth(1,i):compileMonth(a,n),this_month=compileMonthAlg(c),next_month=compileMonthAlg(t)};
        // functions that help compute next runtime


        $rootScope.taskAddObj = {};
                
        //////////////////============== task conditional configuration

        ////////////////// Trigger type One Time
        if (arg.task_type == "onetime"){

        }
        ////////////////// Trigger type One Time

        ////////////////// Trigger type Manual
        if (arg.task_type == "manual"){

        }
        ////////////////// Trigger type Manual

        ////////////////// Trigger type Reoccuring
        // Properties being set
        // task.next_runtime
        if (arg.task_type == "reoccuring"){

            runtimeAlg();

            if("monthly"==arg.frequency){e:for(var i=0;i<this_month.length;i++){var this_day=this_month[i];if(this_day.week===arg.run_week&&this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds;if(proposedDate<currentDateTime){setTaskNextMonth();break e}arg.next_runtime=clock_time+this_day.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500);break e}setTaskNextMonth();break e}function setTaskNextMonth(){e:for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.week===arg.run_week&&t.day===arg.run_day){var a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;var r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}}}} 
            else if("bi-weekly"==arg.frequency||"weekly"==arg.frequency){for(var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number-1,i=working_day_number;i<this_month.length;i++){var this_day=this_month[i];if(this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds,isNextMonthCheck=i+1;if(isNextMonthCheck==this_month.length)setTaskNextMonth();else{arg.next_runtime=clock_time+this_day.milliseconds+quantifyFrequency(arg.frequency);var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}break}}function setTaskNextMonth(){for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.day===arg.run_day){var a=decodeTime(task.run_clock_time);arg.next_runtime=a+t.milliseconds+quantifyFrequency(arg.frequency);var n=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+n}})},1500);break}}}} 
            else if("daily"==arg.frequency){var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number,tomorrow_obj=this_month[working_day_number],clock_time=decodeTime(arg.run_clock_time);arg.next_runtime=clock_time+tomorrow_obj.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}
            else if (arg.frequency == 'annually'){
                
            }

        }
        ////////////////// Trigger type Reoccuring

        ////////////////// Trigger type 4
        if (arg.scheduled){

        }
        ////////////////// Trigger type 4

        //////////////////============== task conditional configuration

        //created on and by
        arg.created_on = Date.now();
        arg.created_by = $rootScope.me.id;

        //task create & read (promise) operation
        arg.id = uuid.v4();
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).set(arg);
        realtimeDatabase.ref('/data/settings/tasks')
        .once("value")
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
    }
    this.modify_task = function(arg){

        var this_month;
        var next_month;

        // functions that help compute next runtime
        function decodeTime(c){return isNaN(c)?calcMilliseconds(c):calcTime(c)}
        function calcMilliseconds(e){var a;switch(e){case"6:30AM":a=234e5;break;case"7:00AM":a=252e5;break;case"7:30AM":a=27e6;break;case"8:00AM":a=288e5;break;case"8:30AM":a=306e5;break;case"9:00AM":a=324e5;break;case"9:30AM":a=342e5;break;case"10:00AM":a=36e6;break;case"10:30AM":a=378e5;break;case"11:00AM":a=396e5;break;case"11:30AM":a=414e5;break;case"12:00PM":a=432e5;break;case"12:30PM":a=45e6;break;case"1:00PM":a=468e5;break;case"1:30PM":a=486e5;break;case"2:00PM":a=504e5;break;case"2:30PM":a=522e5;break;case"3:00PM":a=54e6;break;case"3:30PM":a=558e5;break;case"4:00PM":a=576e5;break;case"4:30PM":a=594e5;break;case"5:00PM":a=612e5;break;case"5:30PM":a=63e6;break;case"6:00PM":a=648e5;break;case"6:30PM":a=666e5;break;case"7:00PM":a=684e5;break;case"7:30PM":a=702e5;break;case"8:00PM":a=72e6;break;default:a="No Matches"}return a}
        function calcTime(e){var a;switch(e){case 234e5:a="6:30AM";break;case 252e5:a="7:00AM";break;case 27e6:a="7:30AM";break;case 288e5:a="8:00AM";break;case 306e5:a="8:30AM";break;case 324e5:a="9:00AM";break;case 342e5:a="9:30AM";break;case 36e6:a="10:00AM";break;case 378e5:a="10:30AM";break;case 396e5:a="11:00AM";break;case 414e5:a="11:30AM";break;case 432e5:a="12:00PM";break;case 45e6:a="12:30PM";break;case 468e5:a="1:00PM";break;case 486e5:a="1:30PM";break;case 504e5:a="2:00PM";break;case 522e5:a="2:30PM";break;case 54e6:a="3:00PM";break;case 558e5:a="3:30PM";break;case 576e5:a="4:00PM";break;case 594e5:a="4:30PM";break;case 612e5:a="5:00PM";break;case 63e6:a="5:30PM";break;case 648e5:a="6:00PM";break;case 666e5:a="6:30PM";break;case 684e5:a="7:00PM";break;case 702e5:a="7:30PM";break;case 72e6:a="8:00PM";break;default:a="No Matches"}return a}
        function quantifyFrequency(e){var a=0;switch(e){case"daily":a=864e5;break;case"weekly":a=6048e5;break;case"bi-weekly":a=12096e5;break;case"monthly":a=2628288e3}return a};
        function getDayOfWeek(e,t,n){return new Date(n,t,e).getDay()}
        function compileMonth(e,n){var t={},a=e-1,r=new Date(n,e,0).getDate(),o=new Date(n,a,1);return t.date=o,t.year=n,t.number_of_days=r,t.month_number=a,t}
        function compileMonthAlg(e){for(var a=0,n=[],r=1;r<=e.number_of_days;r++){var t={};t.day=getDayOfWeek(r,e.month_number,e.year),t.date=new Date(e.year,e.month_number,r),t.milliseconds=Date.parse(t.date),t.day_number=r,t.week=a,n.push(t),t.day>5&&a++}return n}
        function checkIfNextYear(e){return e>12};
        function runtimeAlg(){var t,e=new Date,o=(Date.now(),e.getDay(),e.getDate(),e.getMonth()),n=e.getFullYear(),h=o+1,a=h+1,i=n+1,l=checkIfNextYear(a),c=compileMonth(h,n);t=!0===l?compileMonth(1,i):compileMonth(a,n),this_month=compileMonthAlg(c),next_month=compileMonthAlg(t)};
        // functions that help compute next runtime


        $rootScope.taskAddObj = {};
                
        //////////////////============== task conditional configuration

        ////////////////// Trigger type One Time
        if (arg.task_type == "onetime"){

        }
        ////////////////// Trigger type One Time

        ////////////////// Trigger type Manual
        if (arg.task_type == "manual"){

        }
        ////////////////// Trigger type Manual

        ////////////////// Trigger type Reoccuring
        // Properties being set
        // task.next_runtime
        if (arg.task_type == "reoccuring"){

            runtimeAlg();

            if("monthly"==arg.frequency){e:for(var i=0;i<this_month.length;i++){var this_day=this_month[i];if(this_day.week===arg.run_week&&this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds;if(proposedDate<currentDateTime){setTaskNextMonth();break e}arg.next_runtime=clock_time+this_day.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500);break e}setTaskNextMonth();break e}function setTaskNextMonth(){e:for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.week===arg.run_week&&t.day===arg.run_day){var a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;var r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}}}} 
            else if("bi-weekly"==arg.frequency||"weekly"==arg.frequency){for(var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number-1,i=working_day_number;i<this_month.length;i++){var this_day=this_month[i];if(this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds,isNextMonthCheck=i+1;if(isNextMonthCheck==this_month.length)setTaskNextMonth();else{arg.next_runtime=clock_time+this_day.milliseconds+quantifyFrequency(arg.frequency);var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}break}}function setTaskNextMonth(){for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.day===arg.run_day){var a=decodeTime(task.run_clock_time);arg.next_runtime=a+t.milliseconds+quantifyFrequency(arg.frequency);var n=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+n}})},1500);break}}}} 
            else if("daily"==arg.frequency){var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number,tomorrow_obj=this_month[working_day_number],clock_time=decodeTime(arg.run_clock_time);arg.next_runtime=clock_time+tomorrow_obj.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}
            else if (arg.frequency == 'annually'){
                
            }

        }
        ////////////////// Trigger type Reoccuring

        ////////////////// Trigger type 4
        if (arg.scheduled){

        }
        ////////////////// Trigger type 4

        //////////////////============== task conditional configuration

        //modified on and by
        arg.modified_on = Date.now();
        arg.modified_by = $rootScope.me.id;

        //task modify & read (promise) operation
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).update(arg);
        realtimeDatabase.ref('/data/settings/tasks')
        .once("value")
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
    }
    this.run_task = function(arg){
        return result;
    }
    this.delete_task = function(arg){
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).remove();
        realtimeDatabase.ref('/data/settings/tasks')
        .once("value")
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
    }
    this.get_chatter = function(arg){
        return result;
    }
    this.archive = function(arg){
        return result;
    }
}])
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
'lightweight_firebase',
// 'users_data',
// 'role_data',
// 'tag_data',
// 'image_data',
// 'video_data',
// 'gallery_data',
// 'task_data',
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
lightweight_firebase,
// users_data,
// role_data,
// tag_data,
// image_data,
// video_data,
// gallery_data,
// task_data,
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
    $rootScope.openUserVault = function() {
        $rootScope.user_vault_visible = true;
    }
    $rootScope.closeUserVault = function() {
        $rootScope.user_vault_visible = false;
    }
    $rootScope.selectUser = function(user){
        $rootScope.selectedUser = user;
        $rootScope.user_vault_detail_visible = true;
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





    ///////////////////////////////////////////////////// User Vault
    ///////////////////////////////////////////////////// User Vault
    ///////////////////////////////////////////////////// User Vault

    lightweight_firebase.get_users();
    lightweight_firebase.get_roles();

    // users_data.getUsers().then(function(result){
    //     if(result.length > 0){
    //         $rootScope.userslist = result;
    //         userslist = result;
    //         // for paginate
    //         $rootScope.usersPageSize = 20;
    //         $rootScope.currentUserPage = 0;
    //         $rootScope.numberOfUserPages = Math.ceil(result.length/$rootScope.usersPageSize);
    //     }
    // });

    // role_data.getRoles().then(function(result){
    //     if(result.length > 0){
    //         $rootScope.rolelist = result;     
    //     }
    // });


    // Check if user is authorized to view tools
    $rootScope.isAuthorized = function(app, roles){
        var result;
        switch(app){
            case "AppLab":
                // if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support"){
                //     result = true;
                // } else {
                //     result = false;
                // }
                roles === "Lightweight Internet Coordinator" ? result = true : roles === "Lightweight Support" ? result = true : result = false;
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

    

    // // Create User Op

    $rootScope.addUser = function(user){
        lightweight_firebase.put_user(user);
    }

    // // Create User Op

    // // Modify User Op

    $rootScope.updateUser = function(user){
        lightweight_firebase.modify_user(user);
    }

    // // Modify User Op

    // // Delete User Op

    $rootScope.deleteUser = function(user){
        lightweight_firebase.delete_user(user);
    }

    // // Delete User Op

    $rootScope.passReset = function(new_pass){
        lightweight_firebase.reset_password(new_pass)
    }
        
    ///////////////////////////////////////////////////// User Vault
    ///////////////////////////////////////////////////// User Vault
    ///////////////////////////////////////////////////// User Vault



    ///////////////////////////////////////////////////// Media Vault
    ///////////////////////////////////////////////////// Media Vault
    ///////////////////////////////////////////////////// Media Vault

    

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

    ///////////////////////////////////////////////////// Create Media Op

    // Upload Files After Preview (Currently Images Only)
    $rootScope.sendFiles = function(files){        
        lightweight_firebase.put_images(files);
    }

    ///////////////////////////////////////////////////// Create Media Op

    ///////////////////////////////////////////////////// Modify Media Op

    $rootScope.updateMedia = function(image){
        lightweight_firebase.modify_images(image);
    }
    
    ///////////////////////////////////////////////////// Modify Media Op


    


    ///////////////////////////////////////////////////// Delete Media Op
    $rootScope.deleteMedia = function(image){
        lightweight_firebase.delete_images(image);
    }
    
    ///////////////////////////////////////////////////// Delete Media Op


    ///////////////////////////////////////////////////// Modify Tags

    $scope.tags = [];
    $rootScope.updateTags = function(tags){        
        lightweight_firebase.modify_tags(tags);
    }

    ///////////////////////////////////////////////////// Modify Tags

    ///////////////////////////////////////////////////// Galleries View Toggle

    $rootScope.switchViewGalleries = function() {
        if($rootScope.galleriesgridview == false){
            $rootScope.galleriesgridview = true;
        } else {
            $rootScope.galleriesgridview = false;
        }
    }

    ///////////////////////////////////////////////////// Galleries View Toggle

    ///////////////////////////////////////////////////// Create Gallery Object In View
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
    ///////////////////////////////////////////////////// Create Gallery Object In View

    // ///////////////////////////////////////////////////// Create Gallery Op
    $rootScope.addGallery = function(gallery){
        lightweight_firebase.put_gallery(gallery);
    }
    // ///////////////////////////////////////////////////// Create Gallery Op

    // ///////////////////////////////////////////////////// Modify Gallery Op
    $rootScope.updateGallery = function(gallery){
        lightweight_firebase.modify_gallery(gallery);
    }
    // ///////////////////////////////////////////////////// Modify Gallery Op

    // ///////////////////////////////////////////////////// Modify Gallery Order Op
    $rootScope.updateGalleries = function(galleries){
        lightweight_firebase.modify_galleries(galleries);
    }
    // ///////////////////////////////////////////////////// Modify Gallery Order Op

    ///////////////////////////////////////////////////// Media Vault
    ///////////////////////////////////////////////////// Media Vault
    ///////////////////////////////////////////////////// Media Vault









    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner

    // task.name
    // task.title
    // task.body
    // task.link
    // task.user_action_trigger
    // task.type reoccuring, manual, one-time?
    // task.delivery_medium
    // task.deliver_to_role
    // task.deliver_to
    // task.deliver_report_to
    // task.deliver_report_to_role
    // task.specified_run_date
    // task.frequency
    // task.run_day
    // task.run_week
    // task.run_clock_time
    // task.in_app_dialog_style
    // task.media_source
    

    lightweight_firebase.get_tasks();

    

    $rootScope.task = {};

    $rootScope.times = [
        "Closed", "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    $rootScope.timesSans = [
        "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    // Conditions

    $rootScope.app_triggers = [
        "Internal User Shares A File",
        "External User Shares A File"
    ];

    // Conditions    

    $rootScope.createTask = function(task){
        lightweight_firebase.put_task(task);
    };

    $rootScope.updateTask = function(task){
        lightweight_firebase.modify_task(task);
    };

    $rootScope.deleteTask = function(task){
        lightweight_firebase.delete_task(task);
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

    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    














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

    $rootScope.addStaffMember = function(new_staff){
        lightweight_firebase.put_staff(new_staff)
    }

    $rootScope.updateStaffMember = function(staff){
        lightweight_firebase.modify_staff(staff);
    }

    $rootScope.updateStaff = function(staff_reorder){
        lightweight_firebase.put_staff(staff_reorder)
    }

    $rootScope.removeStaff = function(staff_member, staff){
        lightweight_firebase.delete_staff(staff_member, staff);
    }

    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff









    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages

    $rootScope.addPage = function(type, data){
        lightweight_firebase.put_page(type, data);
    }

    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages

    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages

    $rootScope.deletePage = function(page_index){
        lightweight_firebase.delete_page(page_index);
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
        lightweight_firebase.modify_navigation();
    }
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation





    ///////////////////////////////////////////////////// Crud Settings
    $rootScope.updateSettings = function(){
        lightweight_firebase.modify_navigation();
    }
    ///////////////////////////////////////////////////// Crud Settings





    ///////////////////////////////////////////////////// Update App
    $rootScope.updateApp = function(element){
        lightweight_firebase.modify_data(element);
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
                        message: "Message Sent."
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
        lightweight_firebase.put_iframe(user, iframe);       
    }

    // Upload Files On Select
    $rootScope.uploadMyFiles = function(files, errFiles){
        lightweight_firebase.put_my_files(files, errFiles);
    }
    // Upload Files On Select



    $rootScope.deleteMyFile = function(me, file){
        lightweight_firebase.delete_my_files(me, file);
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
});




