'use strict';

var main = angular.module('main', ['ngResource', 'ngAnimate', 'duScroll', 'kit', 'appDataService'])

.controller('mainController', ['$rootScope', '$scope', '$compile', '$timeout', '$window', 
    '$interval', '$location', '$sce', '$anchorScroll', '$route', "$q", "$http", "frontend", "ngParallax",
    function ($rootScope, $scope, $compile, $timeout, $window, $interval, $location, $sce, $anchorScroll, $route, $q, $http, frontend, ngParallax){

    // pulls relevant page data from appData Stream
    frontend.query()
    .$promise.then(function(data) {
        var view_data = data[0];
        $rootScope.app_data = data[0];
        $rootScope.miniAppName = view_data.app_configs.name;
        $rootScope.google_address_link = view_data.app_configs.address.google_address_link;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data.app_configs.address.google_map_widget);
        $scope.company_address_one = view_data.app_configs.address.info.street + ", " + view_data.app_configs.address.info.city +", " + view_data.app_configs.address.info.state + " " + view_data.app_configs.address.info.zipcode;
        
        for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
            var pages = $rootScope.app_data.home_page_configs;
            if(pages[i].name == "SPSD Home"){
                var page = pages[i];
            }
        }

        $scope.primary_slideshow_hero = page.primary_slideshow_hero;

        var slideshow_length = page.primary_slideshow_hero.slides.length;
        var visible_slide = -1;
        var slideshowStarting = true;       
        var slideshow_timeout;

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

            slideshow_timeout = $timeout(function(){
                slideshowEngineRev()
            }, $scope.primary_slideshow_hero.component_transition_speed);

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
    });
    // pulls relevant page data from appData Stream

    
    $scope.year = new Date().getFullYear();

    $rootScope.KIT_Activation = false;
    $rootScope.default_active = false;
    $rootScope.mail_active = false;

    // Window Sizing Variable
    $scope.window_height = $window.innerHeight;
    $scope.window_width = $window.innerWidth;
    $(window).resize(function() {
        $scope.window_width = $window.innerWidth;
        $scope.window_height = $window.innerHeight;
    });
    // Window Sizing Variable
    
    $rootScope.is_stretched = true;
    $scope.toggle = function (){
        if ($rootScope.is_stretched){
            $rootScope.is_stretched = false;
        } else {
            $rootScope.is_stretched = true;
        }
    }

    $scope.user_button = false;
    
    // listeners on scope
    $scope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });

    $scope.$on('server-event', function(event, args) {
        //build a directive
        var snackbarContainer = document.querySelector('#lightweight--message');
        snackbarContainer.MaterialSnackbar.showSnackbar(args.data);
    });
    // listeners on scope

    // listener on root scope of application
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl){
        $('.mdl-layout__content').animate({
            scrollTop: $('.mdl-layout__content').offset().top - 6100
        }, 0);
    });

    $rootScope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl){

        componentHandler.upgradeAllRegistered();

    });
    // listener on root scope of application

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



