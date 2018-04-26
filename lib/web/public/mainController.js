'use strict';

var main = angular.module('main', [
'ngResource', 
'ngAnimate', 
'duScroll',
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
'$mdDialog',
'$mdToast',
'$firebaseAuth',
'$firebaseObject',
'$firebaseArray',
'fromAppDatabase',
'$routeParams',
'users_data',
'tag_data',
'fromImageStorage',
'fromGalleriesDatabase',
function (
$rootScope, 
$scope,  
$timeout, 
$window,  
$location, 
$sce,  
$route, 
$q,
$mdDialog,
$mdToast,
$firebaseAuth,
$firebaseObject,
$firebaseArray,
fromAppDatabase,
$routeParams,
users_data,
tag_data,
fromImageStorage,
fromGalleriesDatabase){





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





   
    $rootScope.auth = $firebaseAuth();
    $rootScope.params = $routeParams;
    var ua=window.navigator.userAgent,iOS=!!ua.match(/iPad/i)||!!ua.match(/iPhone/i),webkit=!!ua.match(/WebKit/i),msie=ua.indexOf("MSIE "),ms_version=msie>0,trident=ua.indexOf("Trident/"),trident_ms=trident>0,edge=ua.indexOf("Edge/"),edge_ms=edge>0,iOSSafari=iOS&&webkit&&!/(Chrome|CriOS|OPiOS)/.test(ua);iOSSafari||iOS?($rootScope.scrollable=!1,$rootScope.apple_device=!0):ms_version?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):trident_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):edge_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):$rootScope.scrollable=!0;
    $rootScope.taglist = [];
    $rootScope.app_pages = [];
    $rootScope.galleries = [];
    $rootScope.all_galleries = [];
    $rootScope.mobile_menu = false;
    $rootScope.location = $location.path();
    $rootScope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    $rootScope.year = new Date().getFullYear();
    var featured_galleries = [];
    var all_galleries = [];





    $scope.window_height = $window.innerHeight;
    $scope.window_width = $window.innerWidth;
    $(window).resize(function() {
        $scope.window_width = $window.innerWidth;
        $scope.window_height = $window.innerHeight;
    });





    $rootScope.sortableList = {
        axis: 'y',
        handle: '.list-handle',
        connectWith: '.lightweight-list-control',
        placeholder: 'sortable-placeholder', 
        forcePlaceholderSize: true,
        revert: false,
        tolerance: 'pointer',
        classes: {'ui-sortable': 'pickedUp'}
    };





    $scope.site_main_scroller = function(hash){
        $rootScope.mobile_menu = false;
        var go_here = angular.element(document.getElementById(hash));
        angular.element('.mdl-layout__content').scrollToElementAnimated(go_here, 100);
    }
    var originatorEv;





    // Menu
    $scope.open_menu = function(item){
        $scope.menu_title = item.navigation.parent.name;
        $scope.sub_navigation_panel = true;
        $scope.child_items = item.navigation.child.data;
    };
    $scope.close_menu = function(){
        $scope.menu_title = null;
        $scope.sub_navigation_panel = false;
        $scope.child_items = null;
    };
    $scope.open_parent_menu = function(){
        $scope.navigation_panel = true;
    };
    $scope.close_parent_menu = function(){
        $scope.navigation_panel = null;
    };
    // Menu





    $scope.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };
    var ToastCtrl = function($scope, $mdToast){$scope.closeToast = function(){$mdToast.hide().then(function() {return;})}}

    






    fromImageStorage.getImages().then(function(result){

        if(result.length > 0){

            // assign image references arry to root scope
            $rootScope.imagelist = result;
            // assign image references arry to root scope

            // media vault variables
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
            // media vault variables
        }

        // request galleries during images request
        fromGalleriesDatabase.getGalleries().then(function(result){
            if(result.length > 0){
                $rootScope.galleries = result;
                $rootScope.gallerySortObj = [];
                var gallerySortable = angular.forEach(result, function(value, key){
                    $rootScope.gallerySortObj.push(value);
                });
                var jsonPrint = JSON.stringify($rootScope.gallerySortObj);
                $rootScope.gallerySize = 9;
                $rootScope.currentGalleryPage = 0;
                $rootScope.numberOfGalleryPages = Math.ceil(result.length/$rootScope.gallerySize);
            }
            // Parse all galleries to find featured galleries
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {
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
            // Parse all galleries to find featured galleries

            // Parse and compile all galleries
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {

                var gallery_object = $rootScope.galleries[i];
                var gallery_objects_images = [];
                var gallery_object_compiled = {};
                var page_object_compiled = {};

                // parse all images
                for(let i = 0, l = $rootScope.imagelist.length; i < l; i++) {
                    // to find images with the galleriy's tags
                    for(var key in $rootScope.imagelist[i].metadata.tags) {
                        // push images with the gallery's tag into the gallery's array of images
                        var tag = $rootScope.imagelist[i].metadata.tags[key];
                        if(tag == gallery_object.tag){
                            if ($rootScope.imagelist[i].metadata.cover == true){
                                gallery_objects_images.push($rootScope.imagelist[i]);
                                gallery_object_compiled.cover = $rootScope.imagelist[i].source;
                            } else {
                                gallery_objects_images.push($rootScope.imagelist[i]); 
                            }
                        }
                    }
                }
                // parse all images

                // gallery's package
                gallery_object_compiled.url = gallery_object.url;
                page_object_compiled.url = "/gallery/" + gallery_object.url;
                gallery_object_compiled.name = gallery_object.name;
                page_object_compiled.name = gallery_object.name;
                gallery_object_compiled.description = gallery_object.description;
                gallery_object_compiled.images = gallery_objects_images;
                gallery_object_compiled.transition = gallery_object.transition;
                page_object_compiled.locked = true;
                all_galleries.push(gallery_object_compiled);
                // gallery's package

                //dynamic pages
                $rootScope.app_pages.push(page_object_compiled);

            }

            $rootScope.all_galleries = all_galleries;

            // Tiles

            $rootScope.random = function(min,max){
                return Math.floor(Math.random()*(max-min+1)+min);
            }
            // Tiles

            // Parse and compile all galleries

            $timeout(function(){
               $rootScope.$broadcast('galleries_loaded', {
                    data:{}
                });
            }, 500);

        });
        // request galleries during images request

    });






    tag_data.getTags().then(function(result){
        if(result.length > 0){
            $rootScope.taglist = result;     
        }
    });





    fromAppDatabase.getData()
    .then(function(result){
        var app = result;
        $rootScope.settings = app.settings;
        $rootScope.editable_app_settings = app.settings;
        $rootScope.staffSortObj = [];
        var staffSortable = angular.forEach(app.settings.staff.members, function(value, key){
            $rootScope.staffSortObj.push(value);
        });



        // index hash fragments
        var capabilitiesHash = {};
        capabilitiesHash.name = "Capabilities - Home Page";
        capabilitiesHash.url = "/#/#capabilities";
        capabilitiesHash.locked = true;
        $rootScope.app_pages.unshift(capabilitiesHash);
        var galleriesHash = {};
        galleriesHash.name = "Featured Galleries - Home Page";
        galleriesHash.url = "/#/#galleries";
        galleriesHash.locked = true;
        $rootScope.app_pages.unshift(galleriesHash);
        var locateUsHash = {};
        locateUsHash.name = "Locate Us - Home Page";
        locateUsHash.url = "/#/#locate-us";
        locateUsHash.locked = true;
        $rootScope.app_pages.unshift(locateUsHash);
        var contactUsHash = {};
        contactUsHash.name = "Contact Us - Home Page";
        contactUsHash.url = "/#/#contact";
        contactUsHash.locked = true;
        $rootScope.app_pages.unshift(contactUsHash);



        // Create object for all galleries
        var allGalleriesPage = {};
        allGalleriesPage.name = "Galleries Page";
        allGalleriesPage.url = "/gallery";
        allGalleriesPage.locked = true;
        $rootScope.app_pages.unshift(allGalleriesPage);

        // create object for staff page
        var staffPage = {};
        staffPage.name = "Staff Page";
        staffPage.url = "/meet-our-team";
        staffPage.locked = true;
        $rootScope.app_pages.unshift(staffPage);



        $rootScope.mission = app.mission;
        $rootScope.editable_mission = app.mission;
        $rootScope.parallaxOne = app.parallaxOne;
        $rootScope.editable_parallax_one = app.parallaxOne;
        $rootScope.featuredProducts = app.featuredProducts;
        $rootScope.editable_featured_products = app.featuredProducts;
        $rootScope.parallaxTwo = app.parallaxTwo;
        $rootScope.editable_parallax_two = app.parallaxTwo;
        $rootScope.parallaxThree = app.parallaxThree;
        $rootScope.editable_parallax_three = app.parallaxThree;
        $rootScope.pages = app.pages;
        $rootScope.editable_pages = app.pages;
        var pages = angular.forEach(app.pages, function(value, key){
            $rootScope.app_pages.unshift(value.settings);
        });
        $rootScope.servicesPage = app.servicesPage;
        $rootScope.editable_services_page = app.servicesPage;
        $rootScope.miniAppName = app.settings.data.company_name;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl($rootScope.settings.data.address.google_map);
        $timeout(function(){
           $rootScope.$broadcast('data_loaded', {
                data:{}
            });
        }, 500);
    });







    $rootScope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });







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






    $rootScope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl){
        componentHandler.upgradeAllRegistered();
    });
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl){
        $('.mdl-layout__content').animate({
            scrollTop: $('.mdl-layout__content').offset().top - 6100
        }, 0);
    });





}])

//////////////////////////////////////////// App Data
.factory('fromAppDatabase', function($q){
    var realtimeDatabase = firebase.database();
    var appDataBucket = realtimeDatabase.ref().child('data');
    var getData = function(){
        var defer = $q.defer();
        appDataBucket.once('value')
        .then(function(snapshot) {
            var appData = snapshot.val();
            var app = {};
            app.settings = appData["settings"];

            // going to index object
            app.mission = appData["mission"];
            app.parallaxOne = appData["parallaxOne"];
            app.featuredProducts = appData["featuredProducts"];
            app.parallaxTwo = appData["parallaxTwo"];
            app.parallaxThree = appData["parallaxThree"];
            // going to index object

            // app.index = appData["index"];
            app.pages = appData["pages"];
            defer.resolve(app); 
        });
        return defer.promise;
    }
    return {
        getData: getData
    }
})
.factory('users_data', function($q){
    var realtimeDatabase = firebase.database();
    var usersBucket = realtimeDatabase.ref().child('users');
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersBucket.child(id).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            // var data = {
            //     address : {
            //         city : (childData.address.city ? childData.address.city : undefined),
            //         state : (childData.address.state ? childData.address.state : undefined),
            //         street : (childData.address.street ? childData.address.street : undefined),
            //         zipcode : (childData.address.zipcode ? childData.address.zipcode : undefined)
            //     },
            //     birthday : (childData.birthday ? childData.birthday : undefined),
            //     firstname : (childData.firstname ? childData.firstname : undefined),
            //     lastname : (childData.lastname ? childData.lastname : undefined),
            //     phone : (childData.phone ? childData.phone : undefined),
            //     security : {
            //         email : (childData.security.email ? childData.security.email : undefined),
            //         locked_out : (childData.security.locked_out ? childData.security.locked_out : false),
            //         roles : security.roles,
            //         security_question_1 : (childData.security.security_question_1 ? childData.security.security_question_1 : undefined)
            //     },
            //     id : id
            // }
            childData.id = id;
            defer.resolve(childData); 
        });
        return defer.promise;
    }
    return {
        getMe: getMe
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
.factory('fromImageStorage', function($q){
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
.factory('fromGalleriesDatabase', function($q){
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
                childDataValue.id = childKey;
                childDataValue.name = childData.name;
                childDataValue.tag = childData.tag;
                childDataValue.transition = childData.transition;
                childDataValue.url = childData.url;
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
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start;
            return input.slice(start);
        }
    }
})
.directive('passwordVerify', function(){
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return;
        scope.$watch(attrs.ngModel, function() {
          validate();
        });
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });
        var validate = function() {
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
      }
    }
})
.directive('ngConfirmClick', [function() {
    // Create Custom Confirmation
    // Needs to handle forms -- knowing if they are 'dirty' or 'touched'
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var condition = scope.$eval(attrs.ngConfirmCondition);
                if(condition){
                    var message = attrs.ngConfirmMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngConfirmClick);
                    }
                }
                else{
                    scope.$apply(attrs.ngConfirmClick);
                }
            });
        }
    }
}])
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
});



