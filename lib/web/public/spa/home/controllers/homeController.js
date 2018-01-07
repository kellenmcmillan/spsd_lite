'use strict';

var home = angular.module('home', [
'lightweightColor', 
'scrollPosition', 
'duScroll', 
'slideshowDataService', 
'indexServiceDataService', 
'firstParallaxDataService',
'secondParallaxDataService', 
'imageGalleryService', 
'thirdParallaxDataService',
'missionDataService',
'indexContactDataService'
])
.controller('homeController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$route',
'$interval', 
'$timeout', 
"$location",
"slideshow_data",
"index_service",
"first_parallax_data",
"second_parallax_data",
"image_galleries",
"third_parallax_data", 
"mission_data",
"index_contact",
"$firebaseStorage",
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$route, 
$interval, 
$timeout, 
$location, 
slideshow_data, 
index_service, 
first_parallax_data,
second_parallax_data,
image_galleries, 
third_parallax_data,
mission_data,
index_contact,
$firebaseStorage)
{
    

    var w = angular.element($window);
    
    // operational timeouts 
    var slideshow_timeout;
    var parallax_timeout;
    var navigation_range_timeout;
    // operational timeouts

    // Hero Slideshow Variables
    var visible_slide = -1;
    var slideshowStarting = true;
    // Hero Slideshow Variables

    //slideshow Hero
    var slideshow_hero = {};
    var slideshow_length = 0;
    var slideshow_speed = 0;
    slideshow_data.get()
    .success(function(data) { 
        slideshow_hero = data.data[0];
        slideshow_length = slideshow_hero.content.lists[0].content.length;
        slideshow_speed = slideshow_hero.content.lists[0].settings.transition_speed;
        $scope.primary_slideshow_hero = slideshow_hero;
    }) 
    .error(function(err) { 
        return err; 
    });
    //slideshow Hero

    //Mission
    var mission = {};
    mission_data.get()
    .success(function(data) { 
        mission = data.data[0];
        $scope.primary_standard_container = mission;
    }) 
    .error(function(err) { 
        return err; 
    });
    //Mission

    //First parallax
    var first_parallax = {};
    first_parallax_data.get()
    .success(function(data) { 
        first_parallax = data.data[0];
        $scope.secondary_standard_container = first_parallax;
    }) 
    .error(function(err) { 
        return err; 
    });
    //First parallax

    //Second parallax
    var second_parallax = {};
    second_parallax_data.get()
    .success(function(data) { 
        second_parallax = data.data[0];
        $scope.quaternary_standard_container = second_parallax;
    }) 
    .error(function(err) { 
        return err; 
    });
    //Second parallax

    
    //Featured Services
    var featured_services = {};
    index_service.get()
    .success(function(data) { 
        featured_services = data.data[0];
        $scope.featured_products = featured_services;
    }) 
    .error(function(err) { 
        return err; 
    });
    //Featured Services


    //Featured Image Galleries
    var featured_galleries = [];
    var imageGalleries = {};
    image_galleries.get()
    .success(function(data) {

        // sort featured galleries & cover images 
        imageGalleries = data.data[0];
        for(let i = 0, l = imageGalleries.content.lists.length; i < l; i++) {
            var gallery = imageGalleries.content.lists[i].content;
            var gallery_details = imageGalleries.content.lists[i].details;
            var gallery_settings = imageGalleries.content.lists[i].settings;
            if (gallery_settings.featured == true){
                for(let c = 0, length = gallery.length; c < length; c++) {
                    var image = gallery[c];
                    var details = gallery_details;
                    var settings = gallery_settings;
                    if(image.is_cover == true){
                        var gallery_package = {};
                        gallery_package.url_param = details.param;
                        gallery_package.title = details.name;
                        gallery_package.description = details.description;
                        gallery_package.hi_res = image.hi_res;
                        gallery_package.landscape = image.landscape;
                        gallery_package.thumbnail = image.thumbnail;
                        featured_galleries.push(gallery_package);
                    }
                }
            }
        }
        $scope.featured_galleries = featured_galleries;
        // sort featured galleries & cover images

    }) 
    .error(function(err) { 
        return err; 
    });
    //Featured Image Galleries


    //third parallax
    var third_parallax = {};
    third_parallax_data.get()
    .success(function(data) { 
        third_parallax = data.data[0];
        $scope.tertiary_standard_container = third_parallax;
    }) 
    .error(function(err) { 
        return err; 
    });
    //third parallax

    //contact
    var contact_info = {};
    index_contact.get()
    .success(function(data) { 
        contact_info = data.data[0];
        $scope.primary_contact = contact_info;
    }) 
    .error(function(err) { 
        return err; 
    });
    //contact

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }

    // pulls relevant page data from appData Stream
    $rootScope.pageTitle = page.name;
    // pulls relevant page data from appData Stream
    
    // Navigation Active Handler
    $scope.clearActiveLinks = function(){
        var sections = angular.element(".lightweight-navigation-link");
        sections.removeClass('active');
    }
    // Navigation Active Handler

    //Navigation scroll Spy
    navigation_range_timeout = $timeout(function(){
        $scope.slideshow_top = 0;
        $scope.slideshow_bottom = angular.element('.slideshow').height() - 100;
        $scope.mission_top = $scope.slideshow_bottom + 1;
        $scope.mission_bottom = $scope.mission_top + angular.element('.mission').height();
        $scope.secondary_parallax_top = $scope.mission_bottom + 1;
        $scope.secondary_parallax_bottom = $scope.secondary_parallax_top + angular.element('.secondary-parallax').height() - 5;
        $scope.products_top = $scope.secondary_parallax_bottom + 1;
        $scope.products_bottom = $scope.products_top + angular.element('.featured-products').height();
        $scope.primary_parallax_top = $scope.products_bottom + 1;
        $scope.primary_parallax_bottom = $scope.primary_parallax_top + angular.element('.primary-parallax').height();
        $scope.featured_gallery_top = $scope.primary_parallax_bottom + 1;
        $scope.featured_gallery_bottom = $scope.featured_gallery_top + angular.element('.primary-gallery').height() - 96;
        $scope.tertiary_parallax_top = $scope.featured_gallery_bottom + 1;
        $scope.tertiary_parallax_bottom = $scope.tertiary_parallax_top + angular.element('.tertiary-parallax').height();
        $scope.map_container_top = $scope.tertiary_parallax_bottom + 1;
        $scope.map_container_bottom = $scope.map_container_top + angular.element('.map').height();
        $scope.contact_container_top = $scope.map_container_bottom + 1;
        $scope.contact_container_bottom = $scope.contact_container_top + angular.element('.primary-contact').height();
        $scope.end_of_page_beginning = $scope.contact_container_bottom - 300;
    }, 1000);

    $(window).resize(function() {
        navigation_range_timeout = $timeout(function(){
        $scope.slideshow_top = 0;
        $scope.slideshow_bottom = angular.element('.slideshow').height() - 100;
        $scope.mission_top = $scope.slideshow_bottom + 1;
        $scope.mission_bottom = $scope.mission_top + angular.element('.mission').height();
        $scope.secondary_parallax_top = $scope.mission_bottom + 1;
        $scope.secondary_parallax_bottom = $scope.secondary_parallax_top + angular.element('.secondary-parallax').height() - 5;
        $scope.products_top = $scope.secondary_parallax_bottom + 1;
        $scope.products_bottom = $scope.products_top + angular.element('.featured-products').height();
        $scope.primary_parallax_top = $scope.products_bottom + 1;
        $scope.primary_parallax_bottom = $scope.primary_parallax_top + angular.element('.primary-parallax').height();
        $scope.featured_gallery_top = $scope.primary_parallax_bottom + 1;
        $scope.featured_gallery_bottom = $scope.featured_gallery_top + angular.element('.primary-gallery').height() - 96;
        $scope.tertiary_parallax_top = $scope.featured_gallery_bottom + 1;
        $scope.tertiary_parallax_bottom = $scope.tertiary_parallax_top + angular.element('.tertiary-parallax').height();
        $scope.map_container_top = $scope.tertiary_parallax_bottom + 1;
        $scope.map_container_bottom = $scope.map_container_top + angular.element('.map').height();
        $scope.contact_container_top = $scope.map_container_bottom + 1;
        $scope.contact_container_bottom = $scope.contact_container_top + angular.element('.primary-contact').height();
        $scope.end_of_page_beginning = $scope.contact_container_bottom - 300;
        }, 1000);
    });
    //Navigation scroll Spy

    //Parallax scroll Spy
    parallax_timeout = $timeout(function(){
        
        var a = angular.element('.slideshow').height();
        var b = angular.element('.mission').height();
        var c = angular.element('.secondary-parallax').height();
        var d = angular.element('.featured-products').height();
        var e = angular.element('.primary-parallax').height();
        var f = angular.element('.primary-gallery').height();
        var p = angular.element('.map').height();
        var q = angular.element('.tertiary-parallax').height();
        var g;
        var h;
        var j;
        var k;
        var l;
        var m;
        var n;
        var o;
        var result_1;
        var result_2;
        var result_3;
        var result_4;
        g = a + b
        h = g/2;
        result_1 = -1 * h;
        $scope.first_offset = result_1 - 50;
        j = g + c + d;
        k = j/2;
        result_2 = -1 * k;
        $scope.second_offset = result_2 - 50;
        l = j + e + f;
        m = l/2;
        result_3 = -1 * m;
        $scope.third_offset = result_3 - 50;
        n = l + p + q;
        o = n/2;
        result_4 = -1 * o;
        $scope.fourth_offset = result_4 -50;
    }, 1000);

    $(window).resize(function() {
        parallax_timeout = $timeout(function(){
            var a = angular.element('.slideshow').height();
            var b = angular.element('.mission').height();
            var c = angular.element('.secondary-parallax').height();
            var d = angular.element('.featured-products').height();
            var e = angular.element('.primary-parallax').height();
            var f = angular.element('.primary-gallery').height();
            var p = angular.element('.map').height();
            var q = angular.element('.tertiary-parallax').height();
            var g; 
            var h;
            var j;
            var k;
            var l;
            var m;
            var n;
            var o;
            var result_1;
            var result_2;
            var result_3;
            var result_4;
            g = a + b;
            h = g/2;
            result_1 = -1 * h;
            $scope.first_offset = result_1 - 50;
            j = g + c + d;
            k = j/2;
            result_2 = -1 * k;
            $scope.second_offset = result_2 - 50;
            l = j + e + f;
            m = l/2;
            result_3 = -1 * m;
            $scope.third_offset = result_3 - 50;
            n = l + p + q;
            o = n/2;
            result_4 = -1 * o;
            $scope.fourth_offset = result_4 -50;
        }, 1000);
    });
    //Parallax scroll Spy
    
    $scope.end_vertical_animate = false;

    //slideshow Controls
    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        visible_slide = visible_slide - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }
    //slideshow Controls      

    // Slideshow Timer
    var slideshowEngineRev=function(){$scope.end_vertical_animate=!1,$timeout(function(){$scope.end_vertical_animate=!0},4e3),slideshow_timeout=$timeout(function(){slideshowEngineRev()},slideshow_speed),visible_slide++,slideshowStarting&&-1!==visible_slide?(slideshowStarting=!1,$scope.visible_slide=0):visible_slide<slideshow_length&&!slideshowStarting&&visible_slide>0?$scope.visible_slide=visible_slide:visible_slide<0?(visible_slide=slideshow_length-1,$scope.visible_slide=visible_slide):(visible_slide=0,$scope.visible_slide=0)};
    slideshowEngineRev();
    // Slideshow Timer

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller


    // Sort Featured Galleries
    $scope.featured_first = function(e){switch(e){case 0:case 1:case 4:case 5:return!0;default:return!1}};
    $scope.featured_second = function(e){switch(e){case 2:case 3:return!0;default:return!1}};
    // Sort Featured Galleries

    if ($rootScope.home_page_scroll_position > 0){
        var top = $rootScope.home_page_scroll_position;
        var duration = 300; //milliseconds
        //Scroll to the exact position
        angular.element('.mdl-layout__content').duScrollTop(top, duration);
    }

    /////////////////////// Dialog Edit Home

    // Mission

    // Controls
    $rootScope.startMissionEdit = function() {
        $rootScope.edit_mission_dialog_visible = true;
    };
    $rootScope.endMissionEdit = function() {
        $rootScope.edit_mission_dialog_visible = false;
    };
    $rootScope.startImageUpload = function() {
        $rootScope.upload_dialog_visible = true;
    };
    $rootScope.endImageUpload = function() {
        $rootScope.upload_dialog_visible = false;
    };
    // Controls

    // Data
    $rootScope.sample_title = "Execute";
    $rootScope.sample_subtitle = "Our Mission";
    $rootScope.sample_text = "To provide quality landscape and construction services long term by collaborating with fair, equitable and enjoyable people while adding value through our longevity, industry knowledge, honesty, integrity and aggressive performance.";
    // Data
    
    // Mission

    // Storage Init
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imageBucket = storageRef.child('images');
    // Storage Init

    //Get files Convert from upload action to preview action
    $rootScope.uploadFiles = function(){
        $scope.previews = $scope.files;
    }
    $rootScope.sendFiles = function(){
        for (var i = 0; i < $scope.files.length; i++) {
            var imageFile = $scope.files[i];
            uploadImageAsPromise(imageFile);
        }
    }
    //Get files

    // Put Media uploading each file using promise
    function uploadImageAsPromise (imageFile) {
        return new Promise(function (resolve, reject) {
            //Upload file
            var task = imageBucket.put(imageFile);

            //Update progress bar
            // Revisit Storage docs to see all possible events
            task.on('state_changed',
                function progress(snapshot){
                    // figure out way to attach progress to each object in the view
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    uploader.value = percentage;
                },
                function error(err){

                },
                function complete(){
                    // Initiate storage to Realtime Database Here
                    // Metadata will be added here...
                    
                    var downloadURL = task.snapshot.downloadURL;
                    console.log("image uploaded! Here's the downloadURL " + downloadURL);
                }
            );
        });
    }
    // Put Media


    /////////////////////// Dialog Edit Home




    $scope.$on("$locationChangeStart", function(){
        if($location.path == '/' & $rootScope.home_page_scroll_position > 0){
            return;
        } else if ($location.path !== '/'){
            $rootScope.home_page_scroll_position = $scope.scroll;
        }
    });

    $scope.$on("$destroy", function(){
        $timeout.cancel(slideshow_timeout);
        $timeout.cancel(navigation_range_timeout);
        $timeout.cancel(parallax_timeout);
    });
}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){

            $('#default-page-loading').fadeOut('slow');

        });
    }
}])
.directive('featuredGalleryContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }
}])
;



