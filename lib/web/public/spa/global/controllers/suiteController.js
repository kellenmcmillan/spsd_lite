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
'$firebaseArray',
'uuid',
'fromAppDatabase',
'tag_data',
'image_data',
'gallery_data',
'filterFilter',
function (
$rootScope, 
$scope,  
$timeout,   
$q, 
$firebaseArray,
uuid,
fromAppDatabase,
tag_data,
image_data,
gallery_data,
filterFilter){

	var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();

    ////////////////////////////////// Firebase Reference
    var imageBucket = firebaseStorage.ref();
    var appDataBucket = realtimeDatabase.ref().child('appData');
    var mediaBucket = realtimeDatabase.ref().child('images');
    var tagsBucket = realtimeDatabase.ref().child('tags');
    var galleriesBucket = realtimeDatabase.ref().child('galleries');
    var tagArray = $firebaseArray(tagsBucket);
    ////////////////////////////////// Firebase Reference

    // Scoped Variables
    var newGalleryIndex = 0;
    // Scoped Variables

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
    $rootScope.openMyVault = function() {
        $rootScope.my_vault_detail_visible = true;
    };
    $rootScope.closeMyVault = function() {
        $rootScope.my_vault_detail_visible = false;
    };
    var resetMediaVault = function(){
        return null;
    }
    $rootScope.editMedia = false;
    ////////////////////////////////// Controls

    ////////////////////////////////// Data Manipulation

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
                $rootScope.featuredProducts.data.list[0].images.source = selected;
                break;
            case "featuredProducts1":
                $rootScope.featuredProducts.data.list[1].images.source = selected;
                break;
            case "featuredProducts2":
                $rootScope.featuredProducts.data.list[2].images.source = selected;
                break;
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
                var data = $rootScope.editable_featured_products;
                console.log("featured product object when updating: " + data);
                // var data = {
                //     address : {
                //         city : check_data(user.address.city),
                //         state : check_data(user.address.state),
                //         street : check_data(user.address.street),
                //         zipcode : check_data(user.address.zipcode)
                //     },
                //     birthday : check_data(user.birthday),
                //     firstname : check_data(user.firstname),
                //     lastname : check_data(user.lastname),
                //     phone : check_data(user.phone),
                //     email : check_data(user.email),
                //     security : {
                //         roles : check_data(user.security.roles)
                //     }
                // }
                appDataBucket.child("featuredProducts").child("data").update(data);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Success! Parallax One updated!"
                        }
                    });
                }, 500);
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

    ///////////////// Delete Image
    $rootScope.deleteMedia = function(image){
        var image_source;
        if (image.source){
            image_source = image.source.split('https://storage.googleapis.com/spsd-189118.appspot.com/').pop();
        } else {
            image_source = image.avatar.split('https://storage.googleapis.com/spsd-189118.appspot.com/').pop();
        }
        firebaseStorage.ref(image_source).delete().then(function() {
            mediaBucket.child(image.id).remove();
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Image Deleted!"
                    }
                });
            }, 500);
        }).catch(function(error) {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Error Removing Image! " + error
                    }
                });
            }, 500);
        });
    }
    ///////////////// Delete Image

    ///////////////// Update Tags
    $scope.tags = [];
    $rootScope.updateTags = function(tags){
        console.log("tags selected = " + tags);
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
        $scope.tags = [];
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
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Gallery updated!"
                }
            });
        }, 500);
    }
    ///////////////// Update Gallery

    ///////////////// Add Gallery
    $rootScope.addGallery = function(gallery){
        console.log("gallery added = " + JSON.stringify(gallery));
        var newGallery = {};
        newGallery.name = gallery.name;
        newGallery.description = gallery.description;
        newGallery.url = gallery.url.toLowerCase();
        newGallery.featured = gallery.featured;
        newGallery.transition = (gallery.transition ? gallery.transition : 0);
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
                        childDataValue.metadata.tags = childData.metadata.tags;
                    }
                    if(childData.metadata.cover){
                        childDataValue.metadata.cover = childData.metadata.cover;
                    }
                    if(childData.metadata.name){
                        childDataValue.metadata.name = childData.metadata.name;
                    }
                    if(childData.metadata.description){
                        childDataValue.metadata.description = childData.metadata.description;
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