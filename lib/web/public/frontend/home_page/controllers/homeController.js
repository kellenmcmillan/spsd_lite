'use strict';

var home = angular.module('home', ['lightweightColor', 'scrollPosition', 'duScroll', 'slideshowDataService', 'indexServiceDataService', 'firstParallaxDataService', 'imageGalleryService', 'thirdParallaxDataService'])

.controller('homeController', [
    '$rootScope', 
    '$scope', 
    '$compile', 
    '$window', 
    '$interval', 
    '$timeout', 
    "$location",
    "slideshow_data",
    "index_service",
    "first_parallax_data",
    "image_galleries",
    "third_parallax_data", 
    function ($rootScope, $scope, $compile, $window, $interval, $timeout, $location, slideshow_data, index_service, first_parallax_data, image_galleries, third_parallax_data){
    
    var hash = $location.hash();

    var w = angular.element($window);
    

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }






    // pulls relevant page data from appData Stream


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
        console.log(err);
        return err; 
    });
    //slideshow Hero

    //First parallax
    var first_parallax = {};
    first_parallax_data.get()
    .success(function(data) { 
        first_parallax = data.data[0];
        $scope.secondary_standard_container = first_parallax;
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //First parallax

    
    //Featured Services
    var featured_services = {};
    index_service.get()
    .success(function(data) { 
        featured_services = data.data[0];
        $scope.featured_products = featured_services;
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //Featured Services


    //Image Galleries
    var featured_galleries = [];
    var imageGalleries = {};
    image_galleries.get()
    .success(function(data) { 
        imageGalleries = data.data[0];
        $scope.primary_gallery = imageGalleries;
        // sort featured galleries & cover images
        for(let i = 0, l = $scope.primary_gallery.content.lists.length; i < l; i++) {
            var gallery = $scope.primary_gallery.content.lists[i].content;
            var gallery_details = $scope.primary_gallery.content.lists[i].details;
            if (gallery_details.featured == true){
                for(let c = 0, length = gallery.length; c < length; c++) {
                    var image = gallery[c];
                    var details = gallery_details;
                    if(image.is_cover_image == true){
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
        // sort featured galleries & cover images
        $scope.featured_galleries = featured_galleries;
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //Image Galleries


    //third parallax
    var third_parallax = {};
    third_parallax_data.get()
    .success(function(data) { 
        third_parallax = data.data[0];
        $scope.tertiary_standard_container = third_parallax;
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //third parallax



   // pulls relevant page data from appData Stream
    $scope.primary_standard_container = page.primary_standard_container;
    $scope.quaternary_standard_container = page.quaternary_standard_container;
    $rootScope.pageTitle = page.name;
    
    $scope.primary_contact = page.primary_contact;
    
    var visible_slide = -1;
    var slideshowStarting = true;       
    var slideshow_timeout;
    var parallax_timeout;
    var navigation_range_timeout;

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

    
    $scope.end_vertical_animate = false;

    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        visible_slide = visible_slide - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }       

    var slideshowEngineRev = function() {
        $scope.end_vertical_animate = false;
        $timeout(function(){
            $scope.end_vertical_animate = true;
        }, 4000);
        slideshow_timeout = $timeout(function(){
            slideshowEngineRev()
        }, slideshow_speed);

        visible_slide++;
        if (slideshowStarting && visible_slide !== -1){
            slideshowStarting = false;
            $scope.visible_slide = 0;
        } else if (visible_slide < slideshow_length && !slideshowStarting && visible_slide > 0){
            $scope.visible_slide = visible_slide;
        } else if (visible_slide < 0){
            visible_slide = slideshow_length - 1;
            $scope.visible_slide = visible_slide;
        } else {
            visible_slide = 0;
            $scope.visible_slide = 0;
        }
    }

    slideshowEngineRev();

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

    $scope.featured_first = function(value){
        switch(value){
            case 0:
                return true;
                break;
            case 1:
                return true;
                break;
            case 4:
                return true;
                break;
            case 5:
                return true;
                break;
            default:
                return false;
        }
    }

    $scope.featured_second = function(value){
        switch(value){
            case 2:
                return true;
                break;
            case 3:
                return true;
                break;
            default:
                return false;
        }
    }

    $scope.clearActiveLinks = function(){
        var sections = angular.element(".lightweight-navigation-link");
        sections.removeClass('active');
    }

    // listener on root scope of application
    $rootScope.$on('hash-change', function(event, args) {

        var hash = args.data.hash;
        var sections = angular.element(".lightweight-navigation-link");
            sections.each( function() {
            var hash_check = $(this).attr('hash');
            if (hash == hash_check) {
                sections.removeClass('active');
                $(this).addClass('active');
            }

          });

    });
    // listener on root scope of application

    $scope.$on("$destroy", function(){
        $timeout.cancel(slideshow_timeout);
        $timeout.cancel(navigation_range_timeout);
        $timeout.cancel(parallax_timeout);
    });
}])
.directive('portfolioOverlayContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
    var thumbnail_size = angular.element('.portfolio_item').height();
    var overlay_content = angular.element('.lightweight-portfolio--content-overlay-container').height();
    var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
    element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
      var thumbnail_size = angular.element('.portfolio_item').height();
      var overlay_content = angular.element('.lightweight-portfolio--content-overlay-container').height();
      var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
      element.css('margin-top', marginTopVariable + 'px');
      scope.$digest();
    });
  }
}])
.directive('clickGo', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("click", function(){ 
            $location.path(attrs.clickGo)
        });
    }
    
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



