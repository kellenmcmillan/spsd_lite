'use strict';

var main = angular.module('main', ['ngResource', 'ngAnimate', 'duScroll', 'appDataService'])

.controller('mainController', ['$rootScope', '$scope', '$compile', '$timeout', '$window', 
    '$interval', '$location', '$sce', '$anchorScroll', '$route', "$q", "$http", "frontend",
    function ($rootScope, $scope, $compile, $timeout, $window, $interval, $location, $sce, $anchorScroll, $route, $q, $http, frontend){

    // pulls relevant page data from appData Stream
    // frontend.query()
    // .$promise.then(function(data) {
    //     var view_data = data[0];
    //     $rootScope.app_data = data[0];
    //     $rootScope.miniAppName = view_data.app_configs.name;
    //     $rootScope.google_address_link = view_data.app_configs.address.google_address_link;
    //     $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data.app_configs.address.google_map_widget);
    //     $scope.company_address_one = view_data.app_configs.address.info.street + ", " + view_data.app_configs.address.info.city +", " + view_data.app_configs.address.info.state + " " + view_data.app_configs.address.info.zipcode;
    // });

        var view_data = frontend.query();
        var test_data = frontent.state.list();
        console.log(test_data);
        $rootScope.app_data = view_data[0];
        $rootScope.miniAppName = view_data[0].app_configs.name;
        $rootScope.google_address_link = view_data[0].app_configs.address.google_address_link;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data[0].app_configs.address.google_map_widget);
        $scope.company_address_one = view_data[0].app_configs.address.info.street + ", " + view_data[0].app_configs.address.info.city +", " + view_data[0].app_configs.address.info.state + " " + view_data[0].app_configs.address.info.zipcode;

    // pulls relevant page data from appData Stream

    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var msie = ua.indexOf('MSIE ');
    var ms_version = (function(){
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        } else {
            return false;
        }
    })();
    var trident = ua.indexOf('Trident/');
    var trident_ms = (function(){
        if (trident > 0) {
            return true;
        } else {
            return false;
        }
    })();
    var edge = ua.indexOf('Edge/');
    var edge_ms = (function(){
        if (edge > 0) {
            return true;
        } else {
            return false;
        }
    })();
    var iOSSafari = iOS && webkit && !/(Chrome|CriOS|OPiOS)/.test(ua);
    if (iOSSafari || iOS){
        $rootScope.scrollable = false;
    } else if (ms_version){
        $rootScope.scrollable = false;
    } else if (trident_ms){
        $rootScope.scrollable = false;
    } else if (edge_ms){
        $rootScope.scrollable = false;
    } else {
        $rootScope.scrollable = true;
    }
    
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

    $rootScope.user_button = false;
    $rootScope.mobile_menu = false;
    
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
    $rootScope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl){

        componentHandler.upgradeAllRegistered();

    });
    // listener on root scope of application
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl){
        $('.mdl-layout__content').animate({
            scrollTop: $('.mdl-layout__content').offset().top - 6100
        }, 0);
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



