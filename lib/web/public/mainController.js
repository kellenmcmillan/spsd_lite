'use strict';

var main = angular.module('main', [
'ngResource', 
'ngAnimate', 
'duScroll', 
'appDataService'
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
frontend){

    var view_data = frontend.query();

    $rootScope.app_data = view_data[0];
    $rootScope.miniAppName = view_data[0].app_configs.name;
    $rootScope.google_address_link = view_data[0].app_configs.address.google_address_link;
    $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data[0].app_configs.address.google_map_widget);
    $rootScope.company_address_one = view_data[0].app_configs.address.info.street + ", " + view_data[0].app_configs.address.info.city +", " + view_data[0].app_configs.address.info.state + " " + view_data[0].app_configs.address.info.zipcode;

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
    $rootScope.user_button = false;
    $rootScope.mobile_menu = false;
    $rootScope.location = $location.path();
    // Root scope variables
    
    // listeners to broadcast on scope
    $scope.$on('$locationChangeStart', function(event, args) {
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



