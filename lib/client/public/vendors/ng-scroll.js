'use strict';
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ngParallax';
}
angular.module('ngParallax',[]);
angular.module('ngParallax').directive('ngParallax', [
  '$timeout',
  function ($window, $timeout) {
    return {
        restrict: 'AE',
        scope:{
          pattern: '=',
          speed: '='
        },
        link: function(scope, elem, attr) {

          window.mobileAndTabletcheck = function() {
            return( navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
             || navigator.userAgent.match(/Windows Phone/i)
             );
          };

          var bgObj = elem[0];
              bgObj.style.height = "100%";
              bgObj.style.margin = "0 auto";
              bgObj.style.position = "relative";
              bgObj.style.background = "url(" + scope.pattern + ")";
              bgObj.style.backgroundAttachment = 'fixed';
              bgObj.style.backgroundRepeat = "repeat";
              bgObj.style.backgroundSize = "cover";
          var isMobile = window.mobileAndTabletcheck();


          function execute(){

              var material_window = angular.element("#lightweight_content");

              var scrollTop = (material_window.scrollTop() !== undefined) ? material_window.scrollTop() : material_window.scrollTop;
              var speed = (scrollTop / scope.speed);
              if(isMobile){
                speed = speed * .10
              }
              if(speed == 0){
                bgObj.style.backgroundPosition = '0% '+ 0 + '%';
              }
              else{
                bgObj.style.backgroundPosition = '0% '+ speed + '%';
              }

          }

          // for mobile
          angular.element("#lightweight_content").addEventListener("touchmove", function(){
              execute();
          });


          // for browsers
          angular.element("#lightweight_content").addEventListener("scroll", function() {
              execute();
          });

          execute();

        }

    };
  }
]);