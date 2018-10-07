'use strict';

var rootCtrl = angular.module('rootCtrl', [
'ngResource',
'ngAnimate',
'colorPalette',
'ngFileUpload'
])
.controller('rootController', [
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
fromGalleriesDatabase
){


    ////////////////////////////////// Firebase Init
    var realtimeDatabase = firebase.database();
    ////////////////////////////////// Firebase Init
 
    ////////////////////////////////// Users
    var usersBucket = realtimeDatabase.ref().child('users');
    ////////////////////////////////// Users
    
    $rootScope.params = $routeParams;
    $rootScope.auth = $firebaseAuth();
    $rootScope.page_path = $location.url();

    ////////////////////////////////// Browser Sniff
    var userAgent, ieReg, ie;
    userAgent = $window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);

    if (ie) {
    $rootScope.browser = "ie";
    }
    ////////////////////////////////// Browser Sniff

    $rootScope.taglist = [];
    $rootScope.app_pages = [];
    $rootScope.projectslist = [];
    $rootScope.bloglist = [];
    $rootScope.mobile_menu = false;
    $rootScope.location = $location.path();
    $rootScope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    $rootScope.times = ('6:30AM 7:00AM 7:30AM 8:00AM 8:30AM 9:00AM 9:30AM 10:00AM 10:30AM 11:00AM 11:30AM 12:00PM 12:30PM 1:00PM 1:30PM 2:00PM 2:30PM 3:00PM 3:30PM 4:00PM 4:30PM 5:00PM 5:30PM 6:00PM 6:30PM 7:00PM 7:30PM 8:00PM').split(' ').map(function(time) {return {hour: time};});
    $rootScope.year = new Date().getFullYear();
    var featured_galleries = [];
    var all_galleries = [];
    $rootScope.pages = [];
    











    //////////////////////////////// Window Sizing Variable

    //////////////////////////////// calculate scroll bar width and a window aware of it
    function getScrollBarWidth() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) {
            w2 = outer.clientWidth;
        }
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    $rootScope.window_height = $window.innerHeight;
    $rootScope.window_width = $window.innerWidth;
    $timeout(function(){
        var offset = getScrollBarWidth();
        $rootScope.scroll_bar_aware_window_width = $rootScope.window_width - offset;
    }, 100);
    
    angular.element($window).bind('resize', function() {
        $rootScope.window_width = $window.innerWidth;
        $rootScope.window_height = $window.innerHeight;
        $timeout(function(){
            var offset = getScrollBarWidth();
            $rootScope.scroll_bar_aware_window_width = $rootScope.window_width - offset;
        }, 100);
    });
    //////////////////////////////// calculate scroll bar width and a window aware of it
    
    //////////////////////////////// Window Sizing Variable



    // Enable Sorting
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
    // Enable Sorting

    





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
    var originatorEv;
    $rootScope.openMenu = function($mdMenu, ev) {originatorEv = ev; $mdMenu.open(ev);};
    // Menu


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
                        if ($rootScope.imagelist[i].metadata){
                            for(var key in $rootScope.imagelist[i].metadata.tags) {
                                // push images with the gallery's tag into gallery's array of images
                                var tag = $rootScope.imagelist[i].metadata.tags[key];
                                if(tag == gallery.tag){
                                    gallery_images.push($rootScope.imagelist[i]);
                                }
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
            console.log(JSON.stringify(featured_galleries));
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








    ////////////////////////////////// Retrieve App Data From Factory
    ////////////////////////////////// Retrieve App Data From Factory
    ////////////////////////////////// Retrieve App Data From Factory
    fromAppDatabase.getData().then(function(result){
        
        var app = result;
        $rootScope.settings = app.settings;
        $rootScope.resources = [];
        var resources = angular.forEach(app.resources, function(value, key){
            $rootScope.resources.push(value);
        });
        $rootScope.editable_app_settings = app.settings;
        $rootScope.staffSortObj = [];
        var staffSortable = angular.forEach(app.settings.staff.members, function(value, key){
            $rootScope.staffSortObj.push(value);
        });

        if(app.pages) {
            $rootScope.pages = app.pages;

            // Add Standard Pages
            var home_page = {};
            home_page.name = "Home";
            home_page.url = "/";
            home_page.locked = true;
            $rootScope.app_pages.unshift(home_page);

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

            var blog_page = {};
            blog_page.name = "SPSD News";
            blog_page.url = "/blog";
            blog_page.locked = true;
            $rootScope.app_pages.unshift(blog_page);

            $rootScope.section_1 = app.section_1;
            $rootScope.section_2 = app.section_2;
            $rootScope.section_3 = app.section_3;
            $rootScope.section_4 = app.section_4;
            // $rootScope.section_5 = app.section_5;

            var pages = angular.forEach(app.pages, function(value, key){
                
                // sift pages for blog posts
                if(value.settings.page_type == "blog"){
                    $rootScope.bloglist.push(value);
                }
                // sift pages for blog posts

                // sift pages for projects
                if(value.settings.page_type == "project"){
                    $rootScope.projectslist.push(value);
                    switch(value.data.tag[0]){
                        case "Project Name":
                            $rootScope.project_array.push(value);
                            break;
                        default:
                            return;
                    }
                }
                // sift pages for projects

                $rootScope.app_pages.push(value.settings);
                $rootScope.$broadcast('projects_loaded', {});

            });
        }

        $rootScope.miniAppName = app.settings.data.company_name;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl($rootScope.settings.data.address.google_map);

        $timeout(function(){
           $rootScope.$broadcast('data_loaded', {
                data:{}
            });
        }, 500);

    });
    ////////////////////////////////// Retrieve App Data From Factory
    ////////////////////////////////// Retrieve App Data From Factory
    ////////////////////////////////// Retrieve App Data From Factory




    ////////////////////////////////// Verify User Logged In
    ////////////////////////////////// Verify User Logged In
    ////////////////////////////////// Verify User Logged In
    $rootScope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
            users_data.getMe(user.uid)
            .then(function(result){
                $rootScope.me = result;
                $rootScope.me.id = user.uid;
                firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    console.log("id token retrieved");
                    $rootScope.me.token = idToken;
                }).catch(function(error) {
                    console.log(error);
                });
                get_notification_tokens();
                if(result.firstname){
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Welcome " + result.firstname + "!"
                            }
                        });
                    }, 500);
                }
            });
        } else {
            $rootScope.user = null;
            $rootScope.me = null;
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
    ////////////////////////////////// Verify User Logged In
    ////////////////////////////////// Verify User Logged In
    ////////////////////////////////// Verify User Logged In









    // Apply conditionally if not apple
    if ('Notification' in window && navigator.serviceWorker) {
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey("BCUzAWZ0BJbHCWJLxwxcSFsCXNZbY9-4A92Giddxmxd8FfMCP6xRdEsgcILwRRnYsLJAGcqMrhZymomCgFFxoNg");
        var permission_requested = false;
        
        var get_notification_tokens = function(){
            if($rootScope.me){
                if (!permission_requested){
                    messaging.requestPermission().then(function() {                
                        permission_requested = true;
                    }).catch(function(err) {
                        console.log('Unable to get permission to notify.', err);
                    });
                }

                messaging.getToken().then(function(currentToken) {
                    if (currentToken) {
                        if($rootScope.me.notification){
                            if($rootScope.me.notification.ids){
                                var itr = 0;
                                var currentIds = $rootScope.me.notification.ids;
                                var tokenIDs = angular.forEach(currentIds, function(value, key){
                                    if(value == currentToken){
                                        itr++;
                                    }
                                });
                                if(itr != 0){
                                    return;
                                } else {
                                    $rootScope.me.notification.ids.push(currentToken);
                                }
                            } else {
                                $rootScope.me.notification.ids = [];
                                $rootScope.me.notification.ids.push(currentToken);
                            }
                            
                        } else {
                            $rootScope.me.notification = {};
                            $rootScope.me.notification.ids = [];
                            $rootScope.me.notification.ids.push(currentToken);
                        }

                        usersBucket.child($rootScope.me.id).update($rootScope.me);

                    } else {
                        // Show permission request.
                        console.log('No Instance ID token available. Request permission to generate one.');
                        // Show permission UI.
                        updateUIForPushPermissionRequired();
                    }
                }).catch(function(err) {
                    console.log('An error occurred while retrieving token. ', err);
                });
            }
        };

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
            messaging.getToken().then(function(refreshedToken) {
                $rootScope.me.notification.ids.push(refreshedToken);
                usersBucket.child($rootScope.me.id).update($rootScope.me);
                // ...
            }).catch(function(err) {
                console.log('Unable to retrieve refreshed token ', err);
                // showToken('Unable to retrieve refreshed token ', err);
            });
        });

        messaging.onMessage(function(payload) {
            console.log('Message received. ', payload);
            $rootScope.$broadcast('notification-event', {
                data:{
                    message: "New Notification",
                    title: payload.notification.title,
                    body: payload.notification.body,
                    action: true
                }
            });
        });
        // Apply conditionally if not apple
    }
    




    $rootScope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });


    $scope.$on('notification-event', function(event, args) {
        $mdToast.show({
            hideDelay   : 12000,
            position    : 'top right',
            controller  : function($scope, $mdToast){

                $scope.toastMessage = args.data.message;
                $scope.title = args.data.title;
                $scope.body = args.data.body;
                $scope.action = args.data.action;

                $scope.closeToast = function() {
                    $mdToast
                    .hide()
                    .then(function() {
                        return;
                    });
                };

                $scope.openMoreInfo = function(e) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.confirm()
                        .title($scope.title)
                        .textContent($scope.body)
                        .ariaLabel('Notification Received')
                        .targetEvent(e)
                        .ok('Open My Vault')
                        .cancel('View Later');
                    $mdDialog.show(confirm).then(function() {
                        $rootScope.my_vault_detail_visible = true;
                    }, function() {
                        null;
                    });
                };
            },
            templateUrl : 'toast-template.html'
        });
    });


    $scope.$on('server-event', function(event, args) {
        $mdToast.show({
            hideDelay   : 6000,
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

}])

//////////////////////////////////////////// App Data
.factory('fromAppDatabase', function($q){
    var realtimeDatabase = firebase.database();
    var appDatabase = realtimeDatabase.ref().child('data');
    var getData = function(){
        var defer = $q.defer();
        appDatabase.once('value')
        .then(function(snapshot) {

            var data = snapshot.val();
            var app = {};

            app.settings = data["settings"];

            // index object
            app.section_1 = data["index"]["section_1"];
            app.section_2 = data["index"]["section_2"];
            app.section_3 = data["index"]["section_3"];
            app.section_4 = data["index"]["section_4"];
            app.section_5 = data["index"]["section_5"];
            // index object

            // app.index = data["index"];
            app.pages = data["pages"];
            app.resources = data["resources"]

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
    var usersDatabase = realtimeDatabase.ref().child('users');
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersDatabase.child(id).once('value')
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
.factory('tag_data', function($q){
    var realtimeDatabase = firebase.database();
    var tagDatabase = realtimeDatabase.ref().child('tags');
    var getTags = function(){
        var defer = $q.defer();
        var taglist = [];
        tagDatabase.once('value')
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
.factory('fromImageStorage', function($q){
    var realtimeDatabase = firebase.database();
    var imageBucket = realtimeDatabase.ref().child('media/images');
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
.factory('fromProjectsDatabase', function($q){
    var realtimeDatabase = firebase.database();
    var projectDatabase = realtimeDatabase.ref().child('projects');
    var getprojects = function(){
        var defer = $q.defer();
        var projects = [];
        projectDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                projects.push(childDataValue);
            });
            defer.resolve(projects); 
        });
        return defer.promise;
    }
    return {
        getprojects: getprojects
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
                var childDataValue = childData;
                childDataValue.description = childData.description;
                childDataValue.featured = childData.featured;
                childDataValue.id = childKey;
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
})
;