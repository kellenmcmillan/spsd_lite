'use strict';

var orientation = angular.module('orientation', ['ngResource', 'ngAnimate'])

.directive('orientationCorrection', ['$window', function($window){

return {
    link: link,
    restrict: 'A',
    scope: {}
    };

function link(scope, element, attrs){

    var condition_check_1 = ($window.innerWidth - 320) >= 0;
    var condition_check_2 = ($window.innerWidth - 500) < 0;
    if ($window.innerWidth < 800){
       if($window.innerWidth > $window.innerHeight){
            if (condition_check_1 && condition_check_2) {
                console.log("condition check 1 " + condition_check_1 + " condition check 2 " + condition_check_2);
                element.css('display', 'none');
            } else {
                element.css('display', 'block');
            }
        }
    } else {
        element.css('display', 'none');
    }

    var mdl_content_width = angular.element('.mdl-layout__content').width();
    element.css('height', $window.innerHeight + 'px');
    element.css('width', $window.innerWidth * 1.1 + 'px');
    // element.css('width', Math.floor(($window.innerWidth/7)) - 4.5 + 'px');
    //possible use if else to adjust to css media queries
    angular.element($window).bind('resize', function(){
        var condition_check_1 = ($window.innerWidth - 300) >= 0;
        var condition_check_2 = ($window.innerWidth - 500) < 0;
        if ($window.innerWidth < 800){
           if($window.innerWidth > $window.innerHeight){
                if (condition_check_1 && condition_check_2) {
                    console.log("condition check 1 " + condition_check_1 + " condition check 2 " + condition_check_2);
                    element.css('display', 'none');
                } else {
                    element.css('display', 'block');
                }
            }
        } else {
            element.css('display', 'none');
        }
        
        var mdl_content_width = angular.element('.mdl-layout__content').width();
        //possible use if else to adjust to css media queries
        element.css('height', $window.innerHeight + 'px');
        element.css('width', $window.innerWidth * 1.1 + 'px');
        // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
        // manuall $digest required as resize event
        // is outside of angular
        scope.$digest();
    });
}

}])
.directive('fixOrientation', ['$window', function($window){

return {
    link: link,
    restrict: 'A',
    scope: {}
    };

function link(scope, element, attrs){

    var mdl_content_width = angular.element('.orientation-message').width();
    element.css('margin-left', (($window.innerWidth/2) - 200) + 'px');
    // element.css('width', Math.floor(($window.innerWidth/7)) - 4.5 + 'px');
    //possible use if else to adjust to css media queries
    angular.element($window).bind('resize', function(){
        
        mdl_content_width = angular.element('.orientation-message').width();
        //possible use if else to adjust to css media queries
        element.css('margin-left', (($window.innerWidth/2) - 200) + 'px');
        // element.css('width', Math.floor(($window.innerWidth/7)) - 8 + 'px');
        // manuall $digest required as resize event
        // is outside of angular
        scope.$digest();
    });
}

}])
.directive('orientationAware', ['$window', function($window){

return {
    link: link,
    restrict: 'A'
    };

function link(scope, element, attrs){


   if($window.innerWidth < $window.innerHeight){
        scope.orientation = "portrait";
    } else {
        scope.orientation = "landscape";
    } 

    angular.element($window).bind('resize', function(){
        
       if($window.innerWidth < $window.innerHeight){
            scope.orientation = "portrait";
        } else {
            scope.orientation = "landscape";
        } 
        // manuall $digest required as resize event
        // is outside of angular
        scope.$digest();
    });
}

}]);


