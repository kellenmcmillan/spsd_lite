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
'$timeout', 
'$window', 
'$location', 
'$sce',  
'$route', 
'$q',  
'frontend',
'$mdDialog',
'$mdToast',
'$firebaseAuth',
'$firebaseObject',
'$firebaseArray',
'fromAppDatabase',
'$routeParams',
'users_data',
'tag_data',
'image_data',
'gallery_data',
function (
$rootScope, 
$scope,  
$timeout, 
$window,  
$location, 
$sce,  
$route, 
$q, 
frontend,
$mdDialog,
$mdToast,
$firebaseAuth,
$firebaseObject,
$firebaseArray,
fromAppDatabase,
$routeParams,
users_data,
tag_data,
image_data,
gallery_data){

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
    $rootScope.auth = $firebaseAuth();
    $rootScope.params = $routeParams;

    // pulls relevant page data from appData Stream
    
    // Browser Check
    var ua=window.navigator.userAgent,iOS=!!ua.match(/iPad/i)||!!ua.match(/iPhone/i),webkit=!!ua.match(/WebKit/i),msie=ua.indexOf("MSIE "),ms_version=msie>0,trident=ua.indexOf("Trident/"),trident_ms=trident>0,edge=ua.indexOf("Edge/"),edge_ms=edge>0,iOSSafari=iOS&&webkit&&!/(Chrome|CriOS|OPiOS)/.test(ua);iOSSafari||iOS?($rootScope.scrollable=!1,$rootScope.apple_device=!0):ms_version?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):trident_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):edge_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):$rootScope.scrollable=!0;
    // Browser Check

    // Scoped Variables
    $rootScope.taglist = [];
    $rootScope.galleries = [];
    $rootScope.all_galleries = [];
    var imagelist = [];
    var featured_galleries = [];
    var all_galleries = [];
    // Scoped Variables


    image_data.getImages().then(function(result){
        if(result.length > 0){
            $rootScope.imagelist = result;
            imagelist = result;
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
        }
        gallery_data.getGalleries().then(function(result){
            if(result.length > 0){
                $rootScope.galleries = result;
                $rootScope.gallerySize = 9;
                $rootScope.currentGalleryPage = 0;
                $rootScope.numberOfGalleryPages = Math.ceil(result.length/$rootScope.gallerySize);
            }
            // Parse all galleries to
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {
                // find featured galleries
                if($rootScope.galleries[i].featured == true){
                    var gallery = $rootScope.galleries[i];
                    var gallery_images = [];
                    // parse all images
                    for(let i = 0, l = $rootScope.imagelist.length; i < l; i++) {
                        // to find images with the galleriy's tags
                        for(var key in $rootScope.imagelist[i].metadata.tags) {
                            // push images with the gallery's tag into gallery's array of images
                            var tag = $rootScope.imagelist[i].metadata.tags[key];
                            if(tag == gallery.tag){
                                gallery_images.push($rootScope.imagelist[i]);
                            }
                        }
                    }
                    // gallery's array of images
                    var images = gallery_images;
                    // find cover image in the gallery's array of images and
                    for (let i = 0, l = images.length; i < l; i++){
                        // construct the gallery object while pushing the object into the array of featured galleries
                        if(images[i].metadata.cover == true){
                            var gallery_package = {};
                            gallery_package.url = gallery.url;
                            gallery_package.name = gallery.name;
                            gallery_package.description = gallery.description;
                            gallery_package.source = images[i].source;
                            featured_galleries.push(gallery_package);
                        }
                    }
                }
            }
            $rootScope.featured_galleries = featured_galleries;
            // compile all galleries
            // Parse all galleries to
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {
                var allGalleries = $rootScope.galleries[i];
                var all_gallery_images = [];
                var all_galleries_package = {};
                // parse all images
                for(let i = 0, l = $rootScope.imagelist.length; i < l; i++) {
                    // to find images with the galleriy's tags
                    for(var key in $rootScope.imagelist[i].metadata.tags) {
                        // push images with the gallery's tag into gallery's array of images
                        var tag = $rootScope.imagelist[i].metadata.tags[key];
                        if(tag == allGalleries.tag){
                            if ($rootScope.imagelist[i].metadata.cover == true){
                                all_gallery_images.push($rootScope.imagelist[i]);
                                all_galleries_package.cover = $rootScope.imagelist[i].source;
                            } else {
                                all_gallery_images.push($rootScope.imagelist[i]); 
                            }
                        }
                    }
                }
                // gallery's package
                all_galleries_package.url = allGalleries.url;
                all_galleries_package.name = allGalleries.name;
                all_galleries_package.description = allGalleries.description;
                all_galleries_package.images = all_gallery_images;
                all_galleries_package.transition = allGalleries.transition;
                all_galleries.push(all_galleries_package);
            }
            $rootScope.all_galleries = all_galleries;
            $timeout(function(){
               $rootScope.$broadcast('galleries_loaded', {
                    data:{}
                });
            }, 500);
        });
    });

    tag_data.getTags().then(function(result){
        if(result.length > 0){
            $rootScope.taglist = result;     
        }
    });




    $scope.year = new Date().getFullYear();
    //State Abbreviate Select Field
    $rootScope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    //State Abbreviate Select Field
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
    $rootScope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
            users_data.getMe(user.uid)
            .then(function(result){
                $rootScope.me = result;
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
    // any time auth state changes, add the user data to scope

    //////////////////////////////////////////// authentication handler

    //////////////////////////////////////////// App Lab

     // Controls
    var originatorEv;
    $scope.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
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
        $rootScope.featuredProducts = app.featuredProducts;
        $rootScope.editable_featured_products = app.featuredProducts;
        $rootScope.parallaxTwo = app.parallaxTwo;
        $rootScope.editable_parallax_two = app.parallaxTwo;
        console.log(JSON.stringify(app.parallaxOne));
    });
    
    ///////////////////// Extract App Data

}])

//////////////////////////////////////////// App Data
.factory('fromAppDatabase', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var appDataBucket = realtimeDatabase.ref().child('appData');
    // Storage Init
    var getData = function(){
        var defer = $q.defer();
        appDataBucket.once('value')
        .then(function(snapshot) {
            console.log("app data received");
            // mission
            var appData = snapshot.val();
            var app = {};
            app.mission = appData["mission"];
            app.parallaxOne = appData["parallaxOne"];
            app.featuredProducts = appData["featuredProducts"];
            app.parallaxTwo = appData["parallaxTwo"];
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
.factory('users_data', function($q){

    // Storage Init
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    // Storage Init
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersBucket.child(id).once('value')
        .then(function(snapshot) {
            console.log("your user data received ", JSON.stringify(snapshot.val()));
            var childData = snapshot.val();
            var data = {
                address : {
                    city : (childData.address.city ? childData.address.city : undefined),
                    state : (childData.address.state ? childData.address.state : undefined),
                    street : (childData.address.street ? childData.address.street : undefined),
                    zipcode : (childData.address.zipcode ? childData.address.zipcode : undefined)
                },
                birthday : (childData.birthday ? childData.birthday : undefined),
                firstname : (childData.firstname ? childData.firstname : undefined),
                lastname : (childData.lastname ? childData.lastname : undefined),
                phone : (childData.phone ? childData.phone : undefined),
                security : {
                    email : (childData.security.email ? childData.security.email : undefined),
                    locked_out : (childData.security.locked_out ? childData.security.locked_out : false),
                    roles : security.roles,
                    security_question_1 : (childData.security.security_question_1 ? childData.security.security_question_1 : undefined)
                },
                id : id
            }
            defer.resolve(data); 
        });
        return defer.promise;
    }

    return {
        getMe: getMe
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



