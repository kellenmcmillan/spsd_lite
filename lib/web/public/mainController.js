'use strict';

var main = angular.module('main', [
'ngResource', 
'ngAnimate', 
'duScroll', 
'appDataService',
'ngFileUpload'
])
.controller('mainController', [
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

    var view_data = frontend.query();

    $rootScope.app_data = view_data[0];
    $rootScope.miniAppName = view_data[0].app_configs.name;
    $rootScope.google_address_link = view_data[0].app_configs.address.google_address_link;
    $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data[0].app_configs.address.google_map_widget);
    $rootScope.company_address_one = view_data[0].app_configs.address.info.street + ", " + view_data[0].app_configs.address.info.city +", " + view_data[0].app_configs.address.info.state + " " + view_data[0].app_configs.address.info.zipcode;

    $scope.auth = $firebaseAuth();

    // pulls relevant page data from appData Stream
    
    // Browser Check
    var ua=window.navigator.userAgent,iOS=!!ua.match(/iPad/i)||!!ua.match(/iPhone/i),webkit=!!ua.match(/WebKit/i),msie=ua.indexOf("MSIE "),ms_version=msie>0,trident=ua.indexOf("Trident/"),trident_ms=trident>0,edge=ua.indexOf("Edge/"),edge_ms=edge>0,iOSSafari=iOS&&webkit&&!/(Chrome|CriOS|OPiOS)/.test(ua);iOSSafari||iOS?($rootScope.scrollable=!1,$rootScope.apple_device=!0):ms_version?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):trident_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):edge_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):$rootScope.scrollable=!0;
    // Browser Check

    $scope.year = new Date().getFullYear();
    $scope.site_main_scroller = function(hash){
        $rootScope.mobile_menu = false;
        var go_here = angular.element(document.getElementById(hash));
        angular.element('.mdl-layout__content').scrollToElementAnimated(go_here, 100);
    }

    // Window Sizing Variable
    $scope.window_height = $window.innerHeight;
    $scope.window_width = $window.innerWidth;
    $(window).resize(function() {
        $scope.window_width = $window.innerWidth;
        $scope.window_height = $window.innerHeight;
    });
    // Window Sizing Variable

    // Root scope variables
    $rootScope.mobile_menu = false;
    $rootScope.location = $location.path();
    // Root scope variables
    
    // listeners to broadcast on scope
    $rootScope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });
    var ToastCtrl = function($scope, $mdToast){
        $scope.closeToast = function() {
            $mdToast
            .hide()
            .then(function() {
                return;
            });
        };
    }
    $scope.$on('server-event', function(event, args) {
        $mdToast.show({
            hideDelay   : 10000,
            position    : 'top right',
            controller  : function($scope, $mdToast){
                if(args.data.action){
                    $scope.action = args.data.action;
                }
                $scope.toastMessage = args.data.message;
                $scope.closeToast = function() {
                    $mdToast
                    .hide()
                    .then(function() {
                        return;
                    });
                };
            },
            templateUrl : 'toast-template.html'
        });
    });

    // listener on root scope of application
    $rootScope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl){
        componentHandler.upgradeAllRegistered();
    });
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl){
        $('.mdl-layout__content').animate({
            scrollTop: $('.mdl-layout__content').offset().top - 6100
        }, 0);
    });
    // listener on root scope of application



    //////////////////////////////////////////// authentication handler

    ////////////////////////////////// Firebase Methods
    
    $scope.updateUser = function(user){
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
    ////////////////////////////////// Firebase Methods

    // Log in Dialog
    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            controller: loginController,
            templateUrl: 'spa/partials/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    // Log in Dialog

    // Sign Up Dialog
    $scope.showSignUpDialog = function(ev) {
        $mdDialog.show({
            controller: signupController,
            templateUrl: 'spa/partials/signup.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    // Sign Up Dialog

    function loginController($scope, $mdDialog, $firebaseAuth, $firebaseObject) {
        
        //Sign In
        $scope.signIn = function(){
            $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(user) {
                // Close Dialog
                $mdDialog.hide();
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "You are now logged in."
                        }
                    });
                }, 500);
            }).catch(function(error) {
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
        
    }

    function signupController($scope, $mdDialog, $firebaseAuth, $firebaseArray) {

        //Create New User In Authentication Database
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;
            //Create New User In Authentication Database Using Email + Password Combination
            $scope.auth.$createUserWithEmailAndPassword(
                $scope.newUser.email, 
                $scope.newUser.password
            )
            .then(function(user) {
                // Add Successfully Signed Up User To User Profile Database
                storeUserInDatabase(user);
                // Close Dialog
                $mdDialog.hide();
            }).catch(function(error) {
                //Log Signup Error
                console.error("Error: ", error);
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
        //Create New User In Authentication Database

        // Add Successfully Signed Up User To Database
        var storeUserInDatabase = function(user){
            var newUser = {};
            newUser.email = $scope.newUser.email;
            var storeUser = usersBucket.child(user.uid).set(newUser);
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Success! You are now logged in."
                    }
                });
            }, 500);
        }
        // Add Successfully Signed Up User To Database
    }

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
            users_data.getMe(user.uid)
            .then(function(result){
                console.log("Here Your Are ", JSON.stringify(result));
                $rootScope.me = result;
            });
        } else {
            $rootScope.user = null;
            if($location.path() === "/myvault"){
                location.path("/");
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
    // any time auth state changes, add the user data to scope

    //////////////////////////////////////////// authentication handler

    //////////////////////////////////////////// App Lab

     // Controls
    var originatorEv;
    $scope.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };
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
    // Controls

    ////////////////////////////////// App Data

    ///////////////////// Extract App Data
    fromAppDatabase.getData()
    .then(function(result){
        var app = result;
        $rootScope.mission = app.mission;
        $rootScope.editable_mission = app.mission;
        $rootScope.parallaxOne = app.parallaxOne;
        $rootScope.editable_parallax_one = app.parallaxOne;
    });
    
    ///////////////////// Extract App Data
    
    ////////////////////////////////// App Data

    ////////////////////////////////// Firebase Methods
    $scope.updateApp = function(element){
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
                break;
            default:
                return;
        }
    }
    ////////////////////////////////// Firebase Methods

    //////////////////////////////////////////// App Lab

    //////////////////////////////////////////// Media Vault

    $rootScope.openMediaVault = function(element) {
        $scope.elementToUpdate = element;
        $rootScope.media_vault_visible = true;
    };
    $rootScope.closeMediaVault = function() {
        $rootScope.media_vault_visible = false;
    };
    var resetMediaVault = function(){
        return null;
    }
    $scope.editMedia = false;

    // All Media View

    ////////////////////////////////// Extract Data

    var imagelist = [];
    image_data.getImages().then(function(result){
        if(result.length > 0){
            $scope.imagelist = result;
            imagelist = result;
            // for paginate
            $scope.pageSize = 12;
            $scope.currentPage = 0;
            $scope.numberOfPages = Math.ceil(result.length/$scope.pageSize);
        }
    });

    ////////////////////////////////// Extract Data

    ////////////////////////////////// Data Manipulation
    $scope.queryMedia = function(query){
        console.log("query equals = " + query);
        $scope.currentPage = 0;
        $scope.imagelist = filterFilter($scope.imagelist,query);
        $scope.numberOfPages = Math.ceil($scope.imagelist.length/$scope.pageSize);
    }
    $scope.clearQueryMedia = function(){
        $scope.currentPage = 0;
        $scope.queryFilter = undefined;
        $scope.imagelist = imagelist;
        $scope.numberOfPages = Math.ceil($scope.imagelist.length/$scope.pageSize);
    }
    $scope.selectMedia = function(selected){
        switch($scope.elementToUpdate){
            case "mission":
                $scope.mission.data.images.source = selected;
                break;
            case "parallaxOne":
                $scope.parallaxOne.background.images.source = selected;
            default:
                return;
        }
        $rootScope.media_vault_visible = false;
        $timeout(function(){
           $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image Selected!"
                }
            });
        }, 500);
    }
    ////////////////////////////////// Data Manipulation

    ////////////////////////////////// Firebase Methods
    $scope.updateMedia = function(image){
        $scope.updatedMedia = {};
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
    ////////////////////////////////// Firebase Methods

    // All Media View

    // Tag Management View

    $scope.tags = [];
    $scope.taglist = [];

    ////////////////////////////////// Extract Data
    tag_data.getTags().then(function(result){
        if(result.length > 0){
            $scope.taglist = result;     
        }
    });
    ////////////////////////////////// Extract Data

    ////////////////////////////////// Firebase Methods
    $rootScope.updateTags = function(tags){
        console.log("tags selected = " + JSON.stringify(tags));
        angular.forEach(tags, function(tag) {
            return new Promise(function (resolve, reject) {
                //Upload tag
                var tagObj = {}
                tagObj.tag = tag;
                var task = tagArray.$add(tagObj);
                $scope.taglist.push(tagObj);
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
    ////////////////////////////////// Firebase Methods

    // Tag Management View

    // Galleries View

    ////////////////////////////////// Extract Data
    $scope.galleries = [];
    var newGalleryIndex = 0;
    gallery_data.getGalleries().then(function(result){
        if(result.length > 0){
            $scope.galleries = result;
            console.log(JSON.stringify(result));
            console.log(result.length);
            // for paginate
            $scope.gallerySize = 20;
            $scope.currentGalleryPage = 0;
            $scope.numberOfGalleryPages = Math.ceil(result.length/$scope.gallerySize);
        }
    });
    ////////////////////////////////// Extract Data

    ////////////////////////////////// Data Manipulation
    // Initiate Gallery Creation
    $scope.addGalleryTemplate = function(){
        var galleryObj = {};
        galleryObj.featured = false;
        $scope.new_gallery = true;
        $scope.galleries.unshift(galleryObj);
        newGalleryIndex = $scope.galleries.indexOf(galleryObj);
        console.log(newGalleryIndex);
    }
    // Initiate Gallery Creation

    // Remove Gallery Template
    $scope.deleteGallery = function(){
        $scope.galleries.splice(0, 1);
        $scope.new_gallery = false;
    }
    // Remove Gallery Template
    ////////////////////////////////// Data Manipulation

    ////////////////////////////////// Firebase Methods
    $scope.updateGallery = function(gallery){
        var updatedGallery = {};
        updatedGallery.description = gallery.description;
        updatedGallery.featured = gallery.featured;
        updatedGallery.transition = gallery.transition;
        updatedGallery.id = gallery.id
        var storeGallery = galleriesBucket.child(updatedGallery.id).update(updatedGallery);
    }
    $scope.addGallery = function(gallery){
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
        $scope.taglist.push(tagObj);
        // Save New Gallery Tag

        //remove blank gallery from galleries list to avoid dupes
        $scope.galleries.splice(newGalleryIndex, 1);
        newGalleryIndex = null;
        //remove blank gallery from galleries list to avoid dupes

        var storeGallery = galleriesBucket.child(newGallery.id).set(newGallery);
        var galleryRef = galleriesBucket.child(newGallery.id);
        var galleryList = $scope.galleries;
        var galleryLength = galleryList.length;
        
        galleryRef.once("value")
        .then(function(snapshot){
            var gallerySnapshot = snapshot.val();
            $scope.galleries.unshift(gallerySnapshot);
            $scope.new_gallery = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "New gallery added!"
                    }
                });
            }, 500);
        });
    }
    ////////////////////////////////// Firebase Methods

    // Galleries View

    // Upload Media View

    ////////////////////////////////// Firebase Methods
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
                        $scope.imagelist.unshift(file)
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
    ////////////////////////////////// Firebase Methods

    // Upload Media View

    //////////////////////////////////////////// Media Vault

}])

//////////////////////////////////////////// App Data
.factory('fromAppDatabase', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var appDataBucket = realtimeDatabase.ref().child('appData');
    // Storage Init
    var getData = function(){
        var defer = $q.defer();
        // var mission = {};
        // var parallaxOne = {};
        // var products = {};
        // var parallaxTwo = {};
        // var parallaxThree = {};
        // var locateUs = {};
        // var contactUs = {};
        appDataBucket.once('value')
        .then(function(snapshot) {
            console.log("app data received");
            // mission
            var appData = snapshot.val();
            var app = {};
            app.mission = appData["mission"];
            app.parallaxOne = appData["parallaxOne"];
            // mission

            defer.resolve(app); 
        });
        return defer.promise;
    }

    return {
        getData: getData
    }
})
//////////////////////////////////////////// App Data

//////////////////////////////////////////// Media Vault
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start; //parse to int
            return input.slice(start);
        }
    }
})
.directive('passwordVerify', function(){
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;

          // set validity
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
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
                    childDataValue.street = user.street;
                    childDataValue.city = user.city;
                    childDataValue.state = user.state;
                    childDataValue.zipcode = user.zipcode;
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
        console.log("personal data received ", JSON.stringify(childDataValue));
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
})
//////////////////////////////////////////// Media Vault
.directive('goBackAngular', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $window.history.back();
            });
        }
    };
}])
.directive('menuClose', function() {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                var drawer = angular.element('.mdl-layout__drawer');
                var obfuscator = angular.element('.mdl-layout__obfuscator');
                if(drawer) {
                    drawer.toggleClass('is-visible');
                    obfuscator.toggleClass('is-visible');
                }
            });
            angular.element(document).ready( 
                function() {
                    componentHandler.upgradeAllRegistered();
                }
            );
        }
    };
})
;



