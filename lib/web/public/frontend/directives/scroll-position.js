'use strict';

var scrollPosition = angular.module('scrollPosition', [])

.directive('scrollPosition', ['$window', function($window) {
	return {
		scope: {
			scroll: '=?scrollPosition'
		},
		link: function(scope, element, attrs) {

			// window.requestAnimationFrame = undefined;
			// window.mozRequestAnimationFrame = undefined;
			// window.webkitRequestAnimationFrame = undefined;


			var myfunc = (function () {
			    if (typeof (window.requestAnimationFrame) != "undefined") {
			        return window.requestAnimationFrame;
			    } else if (typeof (window.webkitRequestAnimationFrame) != "undefined") {
			        return window.webkitRequestAnimationFrame;
			    } else if (typeof (window.mozRequestAnimationFrame) != "undefined") {
			        return window.mozRequestAnimationFrame;
			    } else {
			        return function (callback) {
			            window.setTimeout(callback, 1000 / 60);
			        };
			    }
			})();
			window.requestAnimFrame = myfunc;
			requestAnimFrame(function(){console.log('callback')});


			var windowElement = angular.element('.mdl-layout__content');
			var latestKnownScrollY = 0;
			var handler = function() {
				var ticking = false,
				item = angular.element('.mdl-layout__content');

				function update() {
				    // reset the tick so we can
				    // capture the next onScroll
				    ticking = false;
				}


				function onScroll() {
				    latestKnownScrollY = windowElement.scrollTop();
				    requestTick();
				}

				function requestTick() {
				    if(!ticking) {
				    	requestAnimFrame(function(){update()});
				        // requestAnimationFrame(update);
				    }
				    ticking = true;
				}
				onScroll();
				scope.scroll = latestKnownScrollY;

			}
			windowElement.on('scroll', scope.$apply.bind(scope, handler));
			handler();
			


		}
	}
}])

;