'use strict';

var callback = angular.module('callback', [])

.controller('callbackController', [function (){
    console.log('got to the callback controller');
    function callbackController() {}
}]);



/////////////////////////////////
