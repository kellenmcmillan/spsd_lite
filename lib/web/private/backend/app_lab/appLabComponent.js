'use strict';

var app_lab = angular.module('app_lab', ['lightweightColor', 'appDataService', 'dialogComponent'])

.controller('appLabController', ['$rootScope', '$scope', '$compile', '$window', '$interval', '$timeout', 'frontend', function ($rootScope, $scope, $compile, $window, $interval, $timeout, frontend){
    
    $rootScope.editable = true;
    var w = angular.element($window);
    $scope.selected_page = "SPSD Home";
    $rootScope.pageTitle = "SPSD Home";
    $rootScope.is_stretched = true;
    $rootScope.show_dialog = false;

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var home_page = pages[i];
        }
    }

    for(let i = 0, l = $rootScope.app_data.portfolio_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.portfolio_page_configs;
        if(pages[i].name == "SPSD Portfolio"){
            var portfolio_page = pages[i];
        }
    }

    // pulls relevant page data from appData Stream

    var page = services_page;

    function setPage(view){
        switch(view) {
            case view == "SPSD Home":
                page = null;
                $rootScope.is_stretched = true;
                $rootScope.show_dialog = false;
                break;
            case view == "SPSD Portfolio":
                page = portfolio_page;
                $rootScope.is_stretched = false;
                $rootScope.show_dialog = false;
                break;
            case view == "About SPSD":
                page = about_page;
                $rootScope.is_stretched = false;
                $rootScope.show_dialog = false;
                break;
            case view == "SPSD Careers":
                page = careers_page;
                $rootScope.is_stretched = false;
                $rootScope.show_dialog = false;
                break;
            case view == "SPSD Services":
                page = services_page;
                $rootScope.is_stretched = false;
                $rootScope.show_dialog = false;
                break;
            default:
                page = null;
                $rootScope.is_stretched = false;
                $rootScope.show_dialog = false;
                                
        }
    }
    $scope.changeView = function(view){
        $rootScope.pageTitle = view;
        $rootScope.$broadcast('page-switch-event', {
            data:{
                message: 'Page Switch',
            }
        });
        scope.selected_page = view;
        $scope.current_panel = 0;
        $timeout(function(){
           setPage(view);
           $anchorScroll();
        }, 500);
        
    }

    // Dialog Initialization
    $rootScope.openDialog = function(data, view){
        $rootScope.show_dialog = true;
        $rootScope.$broadcast('dialog-event', {
            data: data,
            view: view
        });
    }
    // Dialog Initialization

    /////////////////////////////////////Home data////////////////////////////////////////
    $scope.primary_standard_container = home_page.primary_standard_container;
    $scope.primary_parallax = home_page.primary_parallax;
    $scope.primary_slider = home_page.primary_slider;
    $scope.secondary_standard_container = home_page.secondary_standard_container;
    $scope.tertiary_standard_container = home_page.tertiary_standard_container;
    $scope.primary_slideshow_hero = home_page.primary_slideshow_hero;
    $rootScope.pageTitle = $scope.selected_page;


    var slideshow_length = $scope.primary_slideshow_hero.component_slides.length;
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

    // Panels Init
    var panels = $scope.primary_slider.component_panels.panes;
    var val = 0;
    var value = 0;
    var windowWidth = $window.innerWidth;
    var number_of_slides = $scope.primary_slider.component_panels.panes.length;
    var panel_component = [];
    var slide_count = 0;
    var slide_increment = 100/$scope.slide_count;
    $scope.active_slide = 1;
    $scope.amount_to_slide = 0;
    // Panels Init
    
    // Panels Control
    function getSlideCount(){
        windowWidth = $window.innerWidth;
        if(windowWidth<840){$scope.slide_count=number_of_slides,slide_increment=100/$scope.slide_count,slide_count=number_of_slides,$scope.amount_to_slide="0%",$scope.active_panel=1,$scope.compressed_slider=!0,panel_component=[];for(var i=0;i<number_of_slides;i++)panel_component.push(i);$scope.panels=panel_component,$scope.panelControls=angular.copy(panel_component)}else{$scope.slide_count=Math.floor(number_of_slides/2)+Math.ceil(number_of_slides%2),slide_increment=100/$scope.slide_count,slide_count=Math.floor(number_of_slides/2)+Math.ceil(number_of_slides%2),$scope.amount_to_slide="0%",$scope.active_panel=1,$scope.compressed_slider=!1;var slide_creating_variable=Math.floor(number_of_slides/2)+Math.ceil(number_of_slides%2);panel_component=[];for(var i=0;i<slide_creating_variable;i++)panel_component.push(i);$scope.panels=panel_component,$scope.panelControls=angular.copy(panel_component)}
        $scope.panel = function(val){
            value = val - 1;
            $scope.amount_to_slide = -value * slide_increment + '%';
            $scope.active_panel = val;
        }
        var max_swipe = 0;
        var min_swipe = 0;
        var panel_number = function(){
            if ($scope.compressed_slider === true){
                return max_swipe = Number(number_of_slides) - 1;
            } else {
                return max_swipe = Number(number_of_slides/2) - 1;
            }
        }
        $scope.panel_swipe=function(a){max_swipe=panel_number(),"left"===a?0===value?(value=Math.abs(value)+1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):0!=value&&value!=max_swipe?(value+=1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):(value=0,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):0===value?(value=max_swipe,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):(value-=1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1)};
    }
    // Panels Control

    getSlideCount();

    /////////////////////Resize Handler
    /////////////////////Resize Handler
    w.bind("resize", function(){

        function getSlideCount(){windowWidth=$window.innerWidth,windowWidth<840&&$scope.$apply(function(){$scope.slide_count=number_of_slides,slide_increment=100/$scope.slide_count,$scope.amount_to_slide="0%",$scope.active_panel=1,value=0,$scope.compressed_slider=!0,panel_component=[];for(var a=0;a<number_of_slides;a++)panel_component.push(a);$scope.panels=panel_component,$scope.panelControls=angular.copy(panel_component)}),windowWidth>840&&$scope.$apply(function(){$scope.slide_count=Math.floor(number_of_slides/2)+Math.ceil(number_of_slides%2),slide_increment=100/$scope.slide_count,$scope.amount_to_slide="0%",$scope.active_panel=1,$scope.compressed_slider=!1;var a=Math.floor(number_of_slides/2)+Math.ceil(number_of_slides%2);panel_component=[];for(var b=0;b<a;b++)panel_component.push(b);$scope.panels=panel_component,$scope.panelControls=angular.copy(panel_component)})}
        getSlideCount();

        $scope.panel = function(val){
            value = val - 1;
            $scope.amount_to_slide = -value * slide_increment + '%';
            $scope.active_panel = val;
        }

        var max_swipe = 0;
        var min_swipe = 0;

        var panel_number = function(){
            if ($scope.compressed_slider === true){
                return max_swipe = Number(number_of_slides) - 1;
            } else {
                return max_swipe = Number(number_of_slides/2) - 1;
            }
        }

        $scope.panel_swipe=function(a){max_swipe=panel_number(),"left"===a?0===value?(value=Math.abs(value)+1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):0!=value&&value!=max_swipe?(value+=1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):(value=0,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):0===value?(value=max_swipe,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1):(value-=1,$scope.amount_to_slide=-value*slide_increment+"%",$scope.active_panel=value+1)};
        // Panels Control

    });
    /////////////////////Resize Handler
    /////////////////////Resize Handler
    /////////////////////////////////////Home data////////////////////////////////////////

    /////////////////////////////////////Interior Page data////////////////////////////////////////
    $scope.page = page;
    $scope.content_data = page.component_page_data.content;
    $scope.current_panel = 0;
    $scope.panel_visible = page.component_page_data.starting_panel;
    $scope.page_navigation_icon = page.component_page_data.page_navigation_icon;
    $scope.page_navigation_title = page.component_page_data.page_navigation_title;
    $scope.shrinking_title_image = page.component_page_data.shrinking_title_image;
    /////////////////////////////////////Interior Page data////////////////////////////////////////

    /////////////////////////////////////Portfolio Page data////////////////////////////////////////
    // $scope.page = page;
    $scope.closer_look_active = false;
    $scope.portfolio_thumbnail_active = false;
    $scope.folders = page.component_page_data.folders;
    $scope.currentPorfolioImage = 0;

    $scope.openPortfolio = function(item){
        $scope.currentPorfolioImage = 0;
        $scope.show_portfolio_loading = true;
        $scope.portfolio_item = item;
        $scope.closer_look_active = true;

        $timeout(function(){
            $scope.show_portfolio_loading = false;
        }, 1500);
    }

    $scope.closePortfolio = function(item){

        item = '';

        $scope.show_portfolio_loading = false;
        $scope.portfolio_item = null;
        $scope.closer_look_active = false;

    }

    $scope.scrollToTop = function(destination) {
        var old = $location.hash();
        $location.hash(destination);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    }
    /////////////////////////////////////Portfolio Page data////////////////////////////////////////


    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

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
.directive('closerLookPortfolio', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
        var header_height = angular.element('.mdl-layout__header').height();
        element.css('height', ($window.innerHeight - header_height) + 'px');
        element.css('width', $window.innerWidth + 'px');
        element.css('top', header_height + 'px');
        angular.element($window).bind('resize', function(){
            header_height = angular.element('.mdl-layout__header').height();
            element.css('height', ($window.innerHeight - header_height) + 'px');
            element.css('width', $window.innerWidth + 'px');
            element.css('top', header_height + 'px');
            scope.$digest();
        });
    }

}])
.directive('portfolioCloserLookOverlayContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
    var thumb_number = attrs.thumb;
    var thumb_class = '.thumb' + thumb_number;
    var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
    var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
    var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
    element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var thumb_number = attrs.thumb;
        var thumb_class = '.thumb' + thumb_number;
        var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
        var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
        var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }
}]).directive('applabloadingScreen', ['$window', function($window) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'backend/app_lab/loading.html',
    controller: ['$scope', '$window', '$sce', '$rootScope', '$location', '$timeout', function loadingController($scope, $window, $sce, $rootScope, $location, $timeout) {
          // App Loading Screen
          $rootScope.$on('page-switch-event', function(event, args) {
              
              $scope.page_is_loading = true;

              $timeout(function(){
                  $scope.page_is_loading = false;
              }, 1500);

          });
    }]
  }
}]);



