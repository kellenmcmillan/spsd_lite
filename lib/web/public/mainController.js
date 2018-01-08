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
'$firebaseAuth',
'$firebaseObject',
'$firebaseArray',
'uuid',
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
$firebaseAuth,
$firebaseObject,
$firebaseArray,
uuid){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
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

    $scope.$on('server-event', function(event, args) {
        //build a directive
        var snackbarContainer = document.querySelector('#lightweight--message');
        snackbarContainer.MaterialSnackbar.showSnackbar(args.data);
    });
    // listeners to broadcast on scope

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
            var userObject = {};
            userObject.email = $scope.newUser.email
            var usersDocument = realtimeDatabase.ref("users");
            var storeUser = usersDocument.child(user.uid).set(userObject);
            var userRef = usersDocument.child(user.uid);
            userRef.once("value")
            .then(function(snapshot){
                console.log("Success! Here's the snapshot " + snapshot.val());
            });
        }
        // Add Successfully Signed Up User To Database
    }

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
        } else {
            $rootScope.user = null;
            if($location.path() === "/myvault"){
                location.path("/");
            }
        }
    });
    // any time auth state changes, add the user data to scope

    //////////////////////////////////////////// authentication handler

    //////////////////////////////////////////// Media Vault

    $scope.mediaVaultView = null;

    // Storage Init
    var imageBucket = firebaseStorage.ref().child('images');
    var mediaBucket = realtimeDatabase.ref().child('images');
    // Storage Init

    //Send Files
    $rootScope.sendFiles = function(files){
        console.log("ng-angular-uploads files obj = " + files);
        angular.forEach(files, function(file) {

            var metadata = {};
            metadata.name = file.name;
            metadata.tags = file.tags;
            console.log(file);
            return new Promise(function (resolve, reject) {
                //Upload file
                var task = imageBucket.child("/" + file.name).put(file, metadata);
                //Update progress bar
                // Revisit Storage docs to see all possible events
                task.on('state_changed',
                    function progress(snapshot){
                        // figure out way to attach progress to each object in the view
                        file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                        
                    },
                    function error(err){

                    },
                    function complete(){
                        // Initiate storage to Realtime Database Here
                        // Metadata will be added here...
                        file.source = task.snapshot.downloadURL;
                        file.filename = task.snapshot.metadata.name;
                        file.uploadID = uuid.v4();
                        var storeMedia = usersDocument.child(file.uploadID).set(file);
                    }
                );
            });

        });

    }
    //Send Files

    // Tag Management
    $scope.tags = [];
    function querySearch (query) {
      var results = query ? $scope.tags.filter(createFilterFor(query)) : [];
      return results;
    }

    // Storage Init
    var tagBucket = realtimeDatabase.ref().child('tags');
    var tagArray = $firebaseArray(tagBucket);
    // Storage Init

    var taglist = [];
    tagBucket.on('child_added', function(snapshot) {
        console.log("value received");

            var childKey = snapshot.key;
            var childData = snapshot.val();
            var childDataValue = childData.tag;
            console.log('child found ' + childDataValue);
            taglist.push(childDataValue);

        console.log(taglist);
        
    });

    $scope.taglist = taglist;

    //Send Files
    $rootScope.updateTags = function(tags){
        console.log("tags selected = " + JSON.stringify(tags));
        angular.forEach(tags, function(tag) {
            return new Promise(function (resolve, reject) {
                //Upload tag
                var tagObj = {}
                tagObj.tag = tag;
                var task = tagArray.$add(tagObj);
                taglist.push(tagObj.tag);
            });
        });
        $scope.tags = [];
    }

    //////////////////////////////////////////// Media Vault

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



