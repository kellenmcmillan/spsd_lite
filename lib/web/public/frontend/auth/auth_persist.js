'use strict';

var authenticationPersist = angular.module('authenticationPersist', []);

authenticationPersist.factory('persistentUser', ['$window', '$rootScope', function ($window, $rootScope) {
  
  angular.element($window).on('storage', function(event) {
    if (event.key === 'user') {
      $rootScope.$apply();
    }
  });

  return {
    setData: function(vault, val) {
      if(val !== null){
        $window.localStorage && $window.localStorage.setItem(vault, JSON.stringify(val.data));
        return this;
      } else {
        $window.localStorage && $window.localStorage.setItem(vault, JSON.stringify(val));
        return this;
      }
      
    },
    getData: function(vault) {
      return $window.localStorage && $window.localStorage.getItem(vault);
    }

  };

}]);