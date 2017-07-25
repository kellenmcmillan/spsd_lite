// 'use strict';

angular.module('dialogComponent', ['lightweightColor'])


.directive('dialogWidget', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A',
    scope: {

    },
    templateUrl: 'backend/dialog_editor/index.html',
    controller: ['$rootScope', '$scope', '$window', '$http', function lightweightDialogController($rootScope, $scope, $window, $http) {

      $scope.toggle = {item: -1};
      
      // Close Dialog
      $scope.closeDialog = function(){
        $rootScope.show_dialog = false;
        $rootScope.$broadcast('dialog-close', {
            data: null,
        });
        $scope.widget_data = null;
        $scope.widget_view = null;
      }
      // Close Dialog

      // Listen For Dialog Initialization and Pull Data
      $scope.$on('dialog-event', function(event, args) {
          //build a directive
          $scope.widget_data = args.data;
          $scope.widget_view = args.view.Screen;
      });
      // Listen For Dialog Initialization and Pull Data/View

      //////////////////////////////////////////////////////////
      //use this code whenever I want MDL to load via controller
      angular.element(document).ready( 
          function() {
              componentHandler.upgradeAllRegistered();
          }
      );
      //////////////////////////////////////////////////////////
      //use this code whenever I want MDL to load via controller

    }]
  }

  function link(scope, element, attrs){
    
    var dialogHeight = $window.innerHeight;
    // element.css('height', dialogHeight + 'px');
    
    angular.element($window).bind('resize', function(){
      dialogHeight = $window.innerHeight;
      // element.css('height', dialogHeight + 'px');
      scope.$digest();
    });
  }

}])
.directive('dialogConfiguration', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs) {
    var dialogHeight = angular.element('.dialog').height();
    var curtainHeight = angular.element('.dialog-curtain').height();
    element.css('margin-top', -(dialogHeight/2 - curtainHeight/2) + 'px');
    angular.element($window).bind('resize', function(){
      dialogHeight = angular.element('.dialog').height();
      curtainHeight = angular.element('.dialog-curtain').height();
      element.css('margin-top', -(dialogHeight/2 - curtainHeight/2) + 'px');
      scope.$digest();
    });
  }

}])
.directive('dialogCurtain', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var dialogCurtainHeight = $window.innerHeight;
    element.css('height', dialogCurtainHeight + 'px');
    var dialogCurtainWidth = $window.innerWidth;
    element.css('width', dialogCurtainHeight + 'px');
    
    angular.element($window).bind('resize', function(){
      dialogCurtainHeight = $window.innerHeight;
      element.css('height', dialogCurtainHeight + 'px');
      dialogCurtainWidth = $window.innerWidth;
      element.css('width', dialogCurtainHeight + 'px');
      scope.$digest();
    });
  }
}])
.directive('overlayText', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var overlay_text = angular.element('.overlay-text').height();
    var asset_container = angular.element('.asset_container').height();
    element.css('padding-top', -(overlay_text/2 - asset_container/2) - 50 + 'px');
    angular.element($window).bind('resize', function(){
      overlay_text = angular.element('.overlay-text').height();
      asset_container = angular.element('.asset_container').height();
      element.css('padding-top', -(overlay_text/2 - asset_container/2) - 50 + 'px');
      scope.$digest();
    });
  }
}]);

