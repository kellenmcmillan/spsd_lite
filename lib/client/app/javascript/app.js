'use strict';

var lightweightApp = angular.module('lightweightApp', ['ngMaterial', 'ngTouch', 'ngAnimate', 'firebase', 'angular-uuid', 'angularTypewrite', 'routeController', 'ui.sortable'])

.run(function ($rootScope, $timeout, $route, $window, $location) {
	

    angular.element(window).on("resize", function() {
        $rootScope.$apply();
    });


    ////////////////////////////////// Google Global Site Tag
    // $rootScope.$on('$routeChangeSuccess', function() {
    //     $window.gtag('config', 'UA-115574705-1', {'page_path': $location.path()});
    //     $window.gtag('event', 'page_view');
    // });
    ////////////////////////////////// Google Global Site Tag


})
.config(function(){
    var config = {
        apiKey: "AIzaSyAF_pWmvd7Wh9qr4tIcyWQUaZr5izq7cys",
        authDomain: "spsd-189118.firebaseapp.com",
        databaseURL: "https://spsd-189118.firebaseio.com",
        projectId: "spsd-189118",
        storageBucket: "gs://spsd-189118.appspot.com/",
        messagingSenderId: "339197570434"
    };
    firebase.initializeApp(config);
});



