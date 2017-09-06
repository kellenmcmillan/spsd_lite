'use strict';

var scrollPosition = angular.module('scrollPosition', [])

.directive('scrollPosition', ['$window', function($window) {
	return {
		scope: {
			scroll: '=?scrollPosition'
		},
		link: function(scope, element, attrs) {
			// Test via a getter in the options object to see if the passive property is accessed
			var supportsPassive = false;
			try {
			  var opts = Object.defineProperty({}, 'passive', {
			    get: function() {
			      supportsPassive = true;
			    }
			  });
			  $window.addEventListener("test", null, opts);
			} catch (e) {}

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
				        requestAnimationFrame(update);
				    }
				    ticking = true;
				}
				onScroll();
				scope.scroll = latestKnownScrollY;

			}
			windowElement.on('scroll', scope.$apply.bind(scope, handler), supportsPassive ? { passive: true } : false);
			handler();
			


		}
	}
}])

;