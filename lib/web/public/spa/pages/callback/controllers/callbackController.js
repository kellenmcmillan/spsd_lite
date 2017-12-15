'use strict';

var callback = angular.module('callback', [])

.controller('myvaultController', [function (){
    console.log('got to the callback controller');
    function callbackController() {}
}]);



/////////////////////////////////
