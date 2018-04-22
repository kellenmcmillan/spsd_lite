'use strict';

var mediaVault = angular.module('mediaVault', [
'ngResource', 
'ngAnimate', 
'ngFileUpload'
])
.controller('mediaController', [
'$rootScope', 
'$scope', 
'$timeout',
'$location',  
'tag_data',
'image_data',
'gallery_data',
'$http',
'uuid',
'filterFilter',
'$firebaseArray',
'$firebaseAuth',
function (
$rootScope, 
$scope,  
$timeout,
$location,
tag_data,
image_data,
gallery_data,
$http,
uuid,
filterFilter,
$firebaseArray,
$firebaseAuth){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    
    var appDataBucket = realtimeDatabase.ref().child('appData');
    

    // Media Vault Variables
    var imageBucket = firebaseStorage.ref();
    var mediaBucket = realtimeDatabase.ref().child('images');
    var tagsBucket = realtimeDatabase.ref().child('tags');
    var galleriesBucket = realtimeDatabase.ref().child('galleries');
    var tagArray = $firebaseArray(tagsBucket);
    var newGalleryIndex = 0;
    var imagelist = [];
    var img_obj = null;
    $rootScope.editMedia = false;
    $rootScope.galleriesgridview = true;
    
    $rootScope.setStaffToUpdate = function(staffIndex){
        $rootScope.staffIndex = staffIndex;
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

    $rootScope.openMediaVault = function(element) {
        $rootScope.elementToUpdate = element;
        $rootScope.media_vault_visible = true;
    }

    $rootScope.closeMediaVault = function() {
        $rootScope.elementToUpdate = null;
        $rootScope.media_vault_visible = false;
    }






    $rootScope.switchViewGalleries = function() {
        if($rootScope.galleriesgridview == false){
            $rootScope.galleriesgridview = true;
        } else {
            $rootScope.galleriesgridview = false;
        }
    }
    image_data.getImages().then(function(result){
        if(result.length > 0){
            $rootScope.imagelist = result;
            imagelist = result;
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
        }
    });
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

    // $rootScope.selectMedia = function(selected){
    //     $timeout(function(){
    //        $rootScope.$broadcast('server-event', {
    //             data:{
    //                 message: "Image Selected"
    //             }
    //         });
    //     }, 500);
    //     switch($rootScope.elementToUpdate){
    //         case "mission":
    //             $rootScope.mission.data.images.source = selected;
    //             break;
    //         case "parallaxOne":
    //             $rootScope.parallaxOne.background.images.source = selected;
    //             break;
    //         case "parallaxTwo":
    //             $rootScope.parallaxTwo.background.images.source = selected;
    //             break;
    //         case "parallaxThree":
    //             $rootScope.parallaxThree.background.images.source = selected;
    //             break;
    //         case "featuredProducts0":
    //             $rootScope.featuredProducts.data.list[0].images.source = selected;
    //             break;
    //         case "featuredProducts1":
    //             $rootScope.featuredProducts.data.list[1].images.source = selected;
    //             break;
    //         case "featuredProducts2":
    //             $rootScope.featuredProducts.data.list[2].images.source = selected;
    //             break;
    //         case "infoPage":
    //             $rootScope.infoPage.data.page.images.source = selected;
    //             break;
    //         case "featuredServices0":
    //             $rootScope.servicesPage.data.list[0].images.source = selected;
    //             break;
    //         case "featuredServices1":
    //             $rootScope.servicesPage.data.list[1].images.source = selected;
    //             break;
    //         case "featuredServices2":
    //             $rootScope.servicesPage.data.list[2].images.source = selected;
    //             break;
    //         case "staff":
    //             $rootScope.editable_app_settings.data.staff[$rootScope.staffIndex].image = selected;
    //             break;                
    //         default:
    //             return;
    //     }
    //     $rootScope.elementToUpdate = null;
    // }
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
                    message: "Image Updated"
                }
            });
        }, 500);
    }
    $rootScope.deleteMedia = function(image, index){
        var image_source;
        var location_in_array = index; 
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
                        message: "Image Deleted"
                    }
                });
                $rootScope.imagelist.splice(1, location_in_array);
            }, 500);
        }).catch(function(error) {
            $timeout(function(){
                $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Error Removing Image " + error
                    }
                });
            }, 500);
        });
    }
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
                    message: "Gallery updated"
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
                    message: "Gallery order updated"
                }
            });
        }, 500);
    }
    $rootScope.addGallery = function(gallery){        
        var newGallery = {};
        newGallery.name = gallery.name;
        newGallery.description = gallery.description;
        newGallery.url = gallery.url.toLowerCase();
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
                        message: "New gallery added"
                    }
                });
            }, 500);
        });
    }
    $rootScope.sendFiles = function(files){        
        angular.forEach(files, function(file) {
            var metadata = {};
            metadata.name = file.name;
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
                        fileObj.metadata = {};
                        var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/"
                        fileObj.source = appended_cloud_source + task.snapshot.metadata.name;
                        fileObj.metadata.tags = file.tags;
                        fileObj.uploadID = uuid.v4();

                        var storeMedia = mediaBucket.child(fileObj.uploadID).set(fileObj);
                        file.metadata = {};
                        file.source = fileObj.source;
                        file.filename = file.name;
                        file.metadata.tags = file.tags;
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
}])
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start;
            return input.slice(start);
        }
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
    var realtimeDatabase = firebase.database();
    var imageBucket = realtimeDatabase.ref().child('images');
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