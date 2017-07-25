'use strict';

var kit = angular.module('kit', ['directions', 'orientation'])

.directive('kit', ['$window', function($window) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'frontend/widgets/keep-in-touch_widget/keep-in-touch.html'
	}
}])
.directive('lightweightKit', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var kit_width = $window.innerWidth;
    var kit_height = $window.innerHeight;
    element.css('width', kit_width + 'px');
    element.css('height', kit_height + 'px');
    
    angular.element($window).bind('resize', function(){
      kit_width = $window.innerWidth;
      kit_height = $window.innerHeight;

      element.css('width', kit_width + 'px');
      element.css('height', kit_height + 'px');
      scope.$digest();
    });
  }
}])
.directive('kitContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    var containerHeight = $window.innerHeight;
    var contentHeight = 400;
    var marginTopVariable = (containerHeight/2) - (contentHeight/2) - 72;
    // console.log('Here Is Contents Height ' + heroGridContentHeight);
    element.css('margin-top', marginTopVariable + 'px');
    
    angular.element($window).bind('resize', function(){
      containerHeight = $window.innerHeight;
      contentHeight = 400;
      marginTopVariable = (containerHeight/2) - (contentHeight/2) - 92;
      element.css('margin-top', marginTopVariable + 'px');
      scope.$digest();
    });
    
    
  }
}])
;