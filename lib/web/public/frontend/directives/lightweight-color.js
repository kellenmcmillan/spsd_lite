'use strict';

var lightweightColor = angular.module('lightweightColor', [])

.directive('lwColor', ['$timeout', function($timeout){

		return {
			link: link,
			restrict: 'A',
			scope: {}
		};

		// function(type,hue,prop,opacity){

		function link(scope, element, attrs){
		$timeout(function(){
			var colors = ['primary', 'secondary', 'base'];
			var	hues = ['hlst', 'hlr', 'hn', 'hdr', 'hdst'];
			var	properties = ['background', 'border', 'text'];
			var	opacities = ['opacity-lightest', 'opacity-darkest'];
			

			var c = attrs.color;
			var h = attrs.hue;
			var p = attrs.property;
			var o = attrs.opaqueness;

			color_it(c,h,p,o);


			function color_it(c,h,p,o){

				var color_array = c.split(',');
				var hue_array = h.split(',');
				var property_array = p.split(',');
				var opaqueness_array = o.split(',');

				var i = 0;

				for (i = 0; i < color_array.length; i++){
					var	color_blob = '';
					
					if (color_array[i] === 'p' || color_array[i] === 'primary'){
						color_blob = colors[0] + '-';
					} else if (color_array[i] === 's' || color_array[i] === 'secondary') {
						color_blob = colors[1] + '-';
					} else if (color_array[i] === 'b' || color_array[i] === 'base') {
						color_blob = colors[2] + '-';
					} else {
						color_blob = color_blob;
					}

					if(hue_array[i] === 'hlst' || hue_array[i] === 'hue lightest'){
				        color_blob += hues[0];
				    } else if(hue_array[i] === 'hlr' || hue_array[i] === 'hue lighter'){
				        color_blob += hues[1];
				    } else if(hue_array[i] === 'hn') {
				        color_blob += hues[2];
				    } else if(hue_array[i] === 'hue normal') {
				        color_blob += hues[2];
				    } else if(hue_array[i] === 'hdr') {
				        color_blob += hues[3];
				    } else if(hue_array[i] === 'hue darker') {
				        color_blob += hues[3];
				    } else if(hue_array[i] == 'hdst') {
				        color_blob += hues[4];
				   	} else if(hue_array[i] === 'hue darkest') {
				        color_blob += hues[4]
				    } else {
				        color_blob = 'transparent';
				    }
				   
					if(property_array[i] === 'background' || property_array[i] === 'bg'){
						color_blob = color_blob;
					} else if( property_array[i] === 'text' || property_array[i] === 'txt'){
						color_blob += '--' + properties[2];
					} else if (property_array[i] === 'border' || property_array[i] === 'bdr'){
						color_blob += '--' + properties[1];
					}

				
					if(opaqueness_array[i] === 'lightest' || opaqueness_array[i] === 'lst'){
						color_blob += (' ' + opacities[0]);
					} else if (opaqueness_array[i] === 'darkest' || opaqueness_array[i] === 'dst'){
						color_blob += (' ' + opacities[1]);
					} else {
						color_blob = color_blob;
					}

					element.addClass(color_blob);
				}
			}
		}, 300);
	}
}]);




