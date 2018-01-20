var tools = angular.module('tools', [
'ngResource', 
'ngAnimate', 
'ngFileUpload'
])
.controller('suiteController', [
'$rootScope', 
'$scope', 
'$compile', 
'$timeout', 
'$window', 
'$interval', 
'$location', 
'$sce', 
'$anchorScroll', 
'$route', 
'$q', 
'$http', 
'frontend',
'$mdDialog',
'$mdToast',
'$firebaseAuth',
'$firebaseObject',
'$firebaseArray',
'uuid',
'fromAppDatabase',
'users_data',
'tag_data',
'role_data',
'image_data',
'gallery_data',
'filterFilter',
function (
$rootScope, 
$scope, 
$compile, 
$timeout, 
$window, 
$interval, 
$location, 
$sce, 
$anchorScroll, 
$route, 
$q, 
$http, 
frontend,
$mdDialog,
$mdToast,
$firebaseAuth,
$firebaseObject,
$firebaseArray,
uuid,
fromAppDatabase,
users_data,
tag_data,
role_data,
image_data,
gallery_data,
filterFilter){

	var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();

    ////////////////////////////////// Firebase Reference
    var imageBucket = firebaseStorage.ref();
    var usersBucket = realtimeDatabase.ref().child('users');
    var appDataBucket = realtimeDatabase.ref().child('appData');
    var mediaBucket = realtimeDatabase.ref().child('images');
    var tagsBucket = realtimeDatabase.ref().child('tags');
    var galleriesBucket = realtimeDatabase.ref().child('galleries');
    var tagArray = $firebaseArray(tagsBucket);
    ////////////////////////////////// Firebase Reference

    // Scoped Variables
    $rootScope.tags = [];
    $rootScope.taglist = [];
    $rootScope.galleries = [];
    $rootScope.rolelist = [];
    var userslist = [];
    var imagelist = [];
    var newGalleryIndex = 0;
    // Scoped Variables

    ////////////////////////////////// Firebase Extract
    
    users_data.getUsers().then(function(result){
        if(result.length > 0){
        	console.log("users list = " + JSON.stringify(result));
            $rootScope.userslist = result;
            userslist = result;
            // for paginate
            $rootScope.usersPageSize = 20;
            $rootScope.currentUserPage = 0;
            $rootScope.numberOfUserPages = Math.ceil(result.length/$rootScope.usersPageSize);
        }
    });

    image_data.getImages().then(function(result){
        if(result.length > 0){
            $rootScope.imagelist = result;
            imagelist = result;
            // for paginate
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
        }
    });

    tag_data.getTags().then(function(result){
	    if(result.length > 0){
	        $rootScope.taglist = result;     
	    }
	});

	role_data.getRoles().then(function(result){
	    if(result.length > 0){
	        $rootScope.rolelist = result;     
	    }
	});

	gallery_data.getGalleries().then(function(result){
	    if(result.length > 0){
	        $rootScope.galleries = result;
	        console.log(JSON.stringify(result));
	        console.log(result.length);
	        // for paginate
	        $rootScope.gallerySize = 20;
	        $rootScope.currentGalleryPage = 0;
	        $rootScope.numberOfGalleryPages = Math.ceil(result.length/$rootScope.gallerySize);
	    }
	});
    ////////////////////////////////// Firebase Extract

    ////////////////////////////////// Controls
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
    $rootScope.openMediaVault = function(element) {
        $rootScope.elementToUpdate = element;
        $rootScope.media_vault_visible = true;
    };
    $rootScope.closeMediaVault = function() {
        $rootScope.media_vault_visible = false;
    };
    $rootScope.openUserVault = function() {
        $rootScope.user_vault_visible = true;
    };
    $rootScope.closeUserVault = function() {
        $rootScope.user_vault_visible = false;
    };
    $rootScope.closeUserVaultDetail = function(){
    	$rootScope.selectedUser = null;
    	$rootScope.user_vault_detail_visible = false;
    }
    var resetMediaVault = function(){
        return null;
    }
    $rootScope.editMedia = false;
    ////////////////////////////////// Controls

    ////////////////////////////////// Data Manipulation

    ///////////////// Search Users
    $rootScope.queryUser = function(query){
        console.log("query equals = " + query);
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

    ///////////////// Search Media
    $rootScope.queryMedia = function(query){
        console.log("query equals = " + query);
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
    ///////////////// Search Media

    ///////////////// Media Vault File Picker
    $rootScope.selectMedia = function(selected){
    	$timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image Selected!"
                }
            });
        }, 500);
        switch($rootScope.elementToUpdate){
            case "mission":
                $rootScope.mission.data.images.source = selected;
                break;
            case "parallaxOne":
                $rootScope.parallaxOne.background.images.source = selected;
            case "featuredProducts0":
                $rootScope.editable_featured_products.data.list[0].images.source = selected;
            case "featuredProducts1":
                $rootScope.editable_featured_products.data.list[1].images.source = selected;
            case "featuredProducts2":
                $rootScope.editable_featured_products.data.list[2].images.source = selected;
            default:
                return;
        }
        
    }
    ///////////////// Media Vault File Picker

    ///////////////// Initiate Gallery Creation
    $rootScope.addGalleryTemplate = function(){
        var galleryObj = {};
        galleryObj.featured = false;
        $rootScope.new_gallery = true;
        $rootScope.galleries.unshift(galleryObj);
        newGalleryIndex = $rootScope.galleries.indexOf(galleryObj);
        console.log(newGalleryIndex);
    }
    ///////////////// Initiate Gallery Creation

    ///////////////// Remove Gallery Template
    $rootScope.deleteGallery = function(){
        $rootScope.galleries.splice(0, 1);
        $rootScope.new_gallery = false;
    }
    ///////////////// Remove Gallery Template

    ////////////////////////////////// Data Manipulation

    ////////////////////////////////// Firebase Methods
    
    ///////////////// Update User
    $rootScope.updateUser = function(user){
        var childDataValue = {};
        if(user.firstname){
            childDataValue.firstname = user.firstname;
        }
        if(user.lastname){
            childDataValue.lastname = user.lastname;
        }
        if(user.birthday){
            childDataValue.birthday = user.birthday;
        }
        if(user.email){
            childDataValue.email = user.email;
        }
        if(user.phone){
            childDataValue.phone = user.phone;
        }
        if(user.street){
            childDataValue.street = user.street;
            childDataValue.city = user.city;
            childDataValue.state = user.state;
            childDataValue.zipcode = user.zipcode;
        }
        if(user.role){
            childDataValue.role = user.role;
        }
        usersBucket.child(user.id).update(childDataValue);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Success! User Updated."
                }
            });
        }, 500);
    }
    ///////////////// Update User

    ///////////////// Update App
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
                            message: "Success! Mission updated!"
                        }
                    });
                }, 500);
                break;
            case "parllaxOne":
                var data = {};
                var elementData = {};
                var elementBackground = {};
                elementBackground.images = {};
                elementData.text = $rootScope.editable_parallax_one.data.text;
                elementBackground.images.source = $rootScope.editable_parallax_one.background.images.source;
                data = elementData;
                backgroundImageData = elementBackground;
                $rootScope.parallaxOne.data.text = elementData.text;
                $rootScope.parallaxOne.background.images.source = elementBackground.images.source;
                appDataBucket.child("parallaxOne").child("data").update(data);
                appDataBucket.child("parallaxOne").child("background").update(backgroundImageData);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success! Parallax One updated!"
                        }
                    });
                }, 500);
                break;
            case "featuredProducts":
                var data = {};
                var elementData = {};
                var elementBackground = {};
                elementBackground.images = {};
                elementData.text = $rootScope.editable_parallax_one.data.text;
                elementBackground.images.source = $rootScope.editable_parallax_one.background.images.source;
                data = elementData;
                backgroundImageData = elementBackground;
                $rootScope.parallaxOne.data.text = elementData.text;
                $rootScope.parallaxOne.background.images.source = elementBackground.images.source;
                appDataBucket.child("parallaxOne").child("data").update(data);
                appDataBucket.child("parallaxOne").child("background").update(backgroundImageData);
                break;
            default:
                return;
        }
    }
    ///////////////// Update App

    ///////////////// Update Image
    $rootScope.updateMedia = function(image){
        $rootScope.updatedMedia = {};
        if(image.metadata.cover == null){
            image.metadata.cover = false;
        }
        if(image.metadata.tags == null){
            image.metadata.tags = null;
        }
        var tags = image.metadata.tags;
        var cover = image.metadata.cover;
        var newMetadata = {
            tags: tags,
            cover: cover
        };
        mediaBucket.child(image.id).child("metadata").update(newMetadata);
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image Updated!"
                }
            });
        }, 500);
    }
    ///////////////// Update Image

    ///////////////// Update Tags
    $rootScope.updateTags = function(tags){
        console.log("tags selected = " + JSON.stringify(tags));
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
                    message: "Tags Added!"
                }
            });
        }, 500);
        $rootScope.tags = [];
    }
    ///////////////// Update Tags

    ///////////////// Update Gallery
    $rootScope.updateGallery = function(gallery){
        var updatedGallery = {};
        updatedGallery.description = gallery.description;
        updatedGallery.featured = gallery.featured;
        updatedGallery.transition = gallery.transition;
        updatedGallery.id = gallery.id
        var storeGallery = galleriesBucket.child(updatedGallery.id).update(updatedGallery);
    }
    ///////////////// Update Gallery

    ///////////////// Add Gallery
    $rootScope.addGallery = function(gallery){
        console.log("gallery added = " + JSON.stringify(gallery));
        var newGallery = {};
        newGallery.name = gallery.name;
        newGallery.description = gallery.description;
        newGallery.url = gallery.name.split(' ').join('-').toLowerCase();
        newGallery.featured = gallery.featured;
        newGallery.transition = gallery.transition;
        newGallery.tag = gallery.name;
        newGallery.id = uuid.v4();

        // Save New Gallery Tag
        var tagObj = {}
        tagObj.tag = gallery.name;
        var task = tagArray.$add(tagObj);
        $rootScope.taglist.push(tagObj);
        // Save New Gallery Tag

        //remove blank gallery from galleries list to avoid dupes
        $rootScope.galleries.splice(newGalleryIndex, 1);
        newGalleryIndex = null;
        //remove blank gallery from galleries list to avoid dupes

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
                        message: "New gallery added!"
                    }
                });
            }, 500);
        });
    }
    ///////////////// Add Gallery

    ///////////////// Upload Media
    $rootScope.sendFiles = function(files){
        console.log("ng-angular-uploads files obj = " + files);
        angular.forEach(files, function(file) {
            var metadata = {};
            metadata.name = file.name;
            metadata.tags = file.tags;
            console.log(file);
            return new Promise(function (resolve, reject) {
                var task = imageBucket.child(file.name).put(file, metadata);
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
                        var fileURL = "https://storage.googleapis.com/spsd-189118.appspot.com/"
                        fileObj.source = fileURL + task.snapshot.metadata.name;
                        fileObj.filename = task.snapshot.metadata.name;
                        fileObj.uploadID = uuid.v4();
                        var storeMedia = mediaBucket.child(fileObj.uploadID).set(fileObj);
                        file.source = fileObj.source;
                        file.filename = fileObj.filename
                        $rootScope.imagelist.unshift(file)
                    }
                );
            });
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Your uploads were successful!"
                    }
                });
            }, 500);
        });

    }
    ///////////////// Upload Media

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
.factory('tag_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var tagBucket = realtimeDatabase.ref().child('tags');
    // Storage Init
    var getTags = function(){
        var defer = $q.defer();
        var taglist = [];
        tagBucket.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                childDataValue.tag = childData.tag;
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
            console.log("users list received");
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                if(childData.firstname){
                    childDataValue.firstname = childData.firstname;
                }
                if(childData.lastname){
                    childDataValue.lastname = childData.lastname;
                }
                if(childData.birthday){
                    childDataValue.birthday = childData.birthday;
                }
                if(childData.email){
                    childDataValue.email = childData.email;
                }
                if(childData.phone){
                    childDataValue.phone = childData.phone;
                }
                if(childData.street){
                    childDataValue.street = childData.street;
                    childDataValue.city = childData.city;
                    childDataValue.state = childData.state;
                    childDataValue.zipcode = childData.zipcode;
                }
                if(childData.role){
                    childDataValue.role = childData.role;
                }
                childDataValue.id = childKey;
                usersList.push(childDataValue);
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
            console.log("your user data received ", JSON.stringify(snapshot.val()));
            var childData = snapshot.val();
            var childDataValue = {};
            childDataValue = {};
            if(childData.firstname){
                childDataValue.firstname = childData.firstname;
            }
            if(childData.lastname){
                childDataValue.lastname = childData.lastname;
            }
            if(childData.birthday){
                childDataValue.birthday = childData.birthday;
            }
            if(childData.email){
                childDataValue.email = childData.email;
            }
            if(childData.phone){
                childDataValue.phone = childData.phone;
            }
            if(childData.street){
                childDataValue.street = childData.street;
                childDataValue.city = childData.city;
                childDataValue.state = childData.state;
                childDataValue.zipcode = childData.zipcode;
            }
            if(childData.role){
                childDataValue.role = childData.role;
            }
            childDataValue.id = id;
            defer.resolve(childDataValue); 
        });
        return defer.promise;
    }

    return {
        getUsers: getUsers,
        getMe: getMe
    }
})
.factory('image_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var imageBucket = realtimeDatabase.ref().child('images');
    // Storage Init
    var getImages = function(){
        var defer = $q.defer();
        var imagelist = [];
        imageBucket.once('value')
        .then(function(snapshot) {
            console.log("value received");
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                childDataValue.metadata = {};
                if(childData.source){
                    childDataValue.source = childData.source;
                } else {
                    childDataValue.source = childData.avatar;
                }
                if(childData.name){
                    childDataValue.name = childData.name;
                }
                if(childData.title){
                    childDataValue.title = childData.title;
                }
                if(childData.metadata){
                    if(childData.metadata.tags){
                        console.log("tags on media located " + childData.metadata.tags)
                        childDataValue.metadata.tags = childData.metadata.tags;
                    }
                    if(childData.metadata.cover){
                        console.log("tags on media located " + childData.metadata.cover)
                        childDataValue.metadata.cover = childData.metadata.cover;
                    }
                }
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
.factory('gallery_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var galleryBucket = realtimeDatabase.ref().child('galleries');
    // Storage Init
    var getGalleries = function(){
        var defer = $q.defer();
        var galleries = [];
        galleryBucket.once('value')
        .then(function(snapshot) {
            console.log("value received");
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = {};
                childDataValue.description = childData.description;
                childDataValue.featured = childData.featured;
                childDataValue.id = childData.id;
                childDataValue.name = childData.name;
                childDataValue.tag = childData.tag;
                childDataValue.transition = childData.transition;
                childDataValue.url = childData.url;
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