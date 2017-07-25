// 'use strict';

angular.module('dynamicSizing', [])


.directive('heroElement', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      element.css('height', $window.innerHeight + 'px');
      angular.element($window).bind('resize', function(){
        element.css('height', $window.innerHeight + 'px');
         // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
         // manuall $digest required as resize event
         // is outside of angular
        scope.$digest();
       });
     }

}])
.directive('fullScreen', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      var headerHeight = angular.element('.mdl-layout__header').height();
      var screenHeight = $window.innerHeight - headerHeight;
      element.css('height', screenHeight + 'px');
      angular.element($window).bind('resize', function(){
        headerHeight = angular.element('.mdl-layout__header').height();
        screenHeight = $window.innerHeight - headerHeight;
        element.css('height', screenHeight + 'px');
         // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
         // manuall $digest required as resize event
         // is outside of angular
        scope.$digest();
       });
     }

}])
.directive('minfullScreen', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      var headerHeight = angular.element('.mdl-layout__header').height();
      var screenHeight = $window.innerHeight - headerHeight;
      element.css('min-height', screenHeight + 'px');
      angular.element($window).bind('resize', function(){
        headerHeight = angular.element('.mdl-layout__header').height();
        screenHeight = $window.innerHeight - headerHeight;
        element.css('min-height', screenHeight + 'px');
         // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
         // manuall $digest required as resize event
         // is outside of angular
        scope.$digest();
       });
     }

}])
.directive('heroSliderContentContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var mdl_content_width = $window.innerWidth;
    element.css('width', mdl_content_width + 'px');
    angular.element($window).bind('resize', function(){
      mdl_content_width = $window.innerWidth;
      element.css('width', mdl_content_width + 'px');
      scope.$digest();
    });
    
  }
}])
.directive('serviceSliderContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var mdl_content_width = $window.innerWidth;
    scope.slideContainerWidth = mdl_content_width * attrs.slidecount + 'px';
    element.css('width', mdl_content_width * attrs.slidecount + 'px');
    
    angular.element($window).bind('resize', function(){
      mdl_content_width = $window.innerWidth;
      scope.slideContainerWidth = mdl_content_width * attrs.slidecount + 'px';
      element.css('width', mdl_content_width * attrs.slidecount + 'px');
      scope.$digest();
    });
    
    
  }
}])
.directive('serviceSliderContentContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var mdl_content_width = $window.innerWidth;
    element.css('width', mdl_content_width + 'px');
    
    angular.element($window).bind('resize', function(){
      mdl_content_width = $window.innerWidth;

      element.css('width', mdl_content_width + 'px');
      scope.$digest();
    });
    
    
  }
}])
.directive('servicesSliderContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var containerHeight = angular.element('.service-panel--display').height();
    var contentHeight = angular.element('.service-panel').height();
    var marginTopVariable = (containerHeight/2) - (contentHeight/2);
    // console.log('Here Is Contents Height ' + heroGridContentHeight);
    element.css('margin-top', marginTopVariable + 'px');
    
    angular.element($window).bind('resize', function(){
      containerHeight = angular.element('.service-panel--display').height();
      contentHeight = angular.element('.service-panel').height();
      marginTopVariable = (containerHeight/2) - (contentHeight/2);
      element.css('margin-top', marginTopVariable + 'px');
      scope.$digest();
    });
    
    
  }
}])
.directive('ctaContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    var ctaHeight = angular.element('.cta-container').height();
    var ctaContentHeight = angular.element('.ctaContent').height();
    var marginTopVariable = (ctaHeight/2) - (ctaContentHeight/2);
    // console.log('Here Is Contents Height ' + heroGridContentHeight);
    element.css('margin-top', marginTopVariable - 50 + 'px');
    angular.element($window).bind('resize', function(){
      var ctaHeight = angular.element('.cta-container').height();
      ctaContentHeight = angular.element('.ctaContent').height();
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      marginTopVariable = (ctaHeight/2) - (ctaContentHeight/2);
      element.css('margin-top', marginTopVariable - 50 + 'px');
      scope.$digest();
    });

  }
}])

;

