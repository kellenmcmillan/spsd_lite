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
      var headerHeight = 100;
      var screenHeight = $window.innerHeight - headerHeight;
      element.css('height', screenHeight + 'px');
      setTimeout(function(){
        attrs.$set('dataSize', element.height());
      }, 500);
      angular.element($window).bind('resize', function(){
        headerHeight = 100;
        screenHeight = $window.innerHeight - headerHeight;
        element.css('height', screenHeight + 'px');
        setTimeout(function(){
          attrs.$set('dataSize', element.height());
        }, 500);
         // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
         // manuall $digest required as resize event
         // is outside of angular
        scope.$digest();
       });
     }

}])
.directive('minfullScreen', ['$window', '$compile', function($window, $compile){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      var headerHeight = 100;
      var screenHeight = $window.innerHeight - headerHeight;
      element.css('min-height', screenHeight + 'px');
      setTimeout(function(){
        attrs.$set('dataSize', element.height());
      }, 500);
      
      angular.element($window).bind('resize', function(){
        headerHeight = 100;
        screenHeight = $window.innerHeight - headerHeight;
        element.css('min-height', screenHeight + 'px');
        setTimeout(function(){
          attrs.$set('dataSize', element.height());
        }, 500);
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
.directive('verticalCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var containerHeight = $window.innerHeight;
      var elementHeight = angular.element('.vertical-element').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable - 50 + 'px');
    }, 100);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        containerHeight = $window.innerHeight;
        elementHeight = angular.element('.vertical-element').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable - 50 + 'px');
        scope.$digest();
      }, 100);
    });

  }
}])
.directive('quaternaryoneCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.quaternary-center--1').height();
      var containerHeight = angular.element('.quaternary--1').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable - 18 + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 100);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.quaternary-center--1').height();
        containerHeight = angular.element('.quaternary--1').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable - 18 + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 100);
    });

  }
}])
.directive('quaternarytwoCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.quaternary-center--2').height();
      var containerHeight = angular.element('.quaternary--2').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 100);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.quaternary-center--2').height();
        containerHeight = angular.element('.quaternary--2').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 100);
    });

  }
}])
.directive('mapColumnOneCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.map-column-center--1').height();
      var containerHeight = angular.element('.map--1').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 1000);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.map-column-center--1').height();
        containerHeight = angular.element('.map--1').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 1000);
    });

  }
}])
.directive('mapColumnTwoCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.map-column-center--2').height();
      var containerHeight = angular.element('.map--2').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 1000);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.map-column-center--2').height();
        containerHeight = angular.element('.map--2').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 1000);
    });

  }
}])
.directive('primaryContactOneCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.contact-center--1').height();
      var containerHeight = angular.element('.contact--1').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 1000);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.contact-center--1').height();
        containerHeight = angular.element('.contact--1').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 1000);
    });

  }
}])
.directive('primaryContactTwoCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var elementHeight = angular.element('.contact-center--2').height();
      var containerHeight = angular.element('.contact--2').height();
      var marginTopVariable = (containerHeight/2) - (elementHeight/2);
      // console.log('Here Is Contents Height ' + heroGridContentHeight);
      element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
    }, 1000);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        elementHeight = angular.element('.contact-center--2').height();
        containerHeight = angular.element('.contact--2').height();
        marginTopVariable = (containerHeight/2) - (elementHeight/2);
        // console.log('Here Is Contents Height ' + heroGridContentHeight);
        element.css('margin-top', marginTopVariable + 'px'); // subtracted 32px to acct for margin, padding, etc.
        scope.$digest();
      }, 1000);
    });

  }
}])

;

