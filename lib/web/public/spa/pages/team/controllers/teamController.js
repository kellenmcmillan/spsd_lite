'use strict';

var team = angular.module('team', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'staffDataService'
])
.controller('teamController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'staff', 
'$mdDialog', 
'$mdMenu', 
'$location', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
staff, 
$mdDialog, 
$mdMenu, 
$location)
{

	staff.get()
    .success(function(data) { 
    	var staff_member = [];
        var staff_data = data;
        $rootScope.pageTitle = staff_data.data[0].name;
        console.log(data);
        $scope.staffTiles = (function() {
			for (var i = 0; i < staff_data.data[0].content.lists[0].content.length; i++) {
				staff_member.push({
					avatar: staff_data.data[0].content.lists[0].content[i].avatar,
          			landscape: staff_data.data[0].content.lists[0].content[i].landscape,
					name: staff_data.data[0].content.lists[0].content[i].name,
          			title: staff_data.data[0].content.lists[0].content[i].work_title,
          			description: staff_data.data[0].content.lists[0].content[i].description,
          			call_to_action: staff_data.data[0].content.lists[0].content[i].call_to_action,
				});
			}
			return staff_member;
		})();
    }) 
   .error(function(err) { 
        console.log(err);
        return err; 
    });

    $scope.show_dialog = false;
    $scope.memmber;
    $scope.select_member = function(member){
	    if(member.call_to_action){
	    	return null;
	    } else {
	      	$scope.member = member;
	      	$scope.show_dialog = true;
	    }
	}

}]).directive('compile', ['$compile', function ($compile) {

    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };

}])
.directive('featuredGalleryContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }

}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){
            $('#default-page-loading').fadeOut('slow');
        });
    }

}]);