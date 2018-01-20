'use strict';

var capabilities = angular.module('capabilities', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'directions', 
'servicePageDataService'
])

.controller('capabilitiesController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
'service_page_data', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams, 
service_page_data)
{
        
    var page = {};
    
    service_page_data.get()
    .success(function(data) { 
        page = data.data[0];
        $rootScope.pageTitle = page.name;
        var starting_tab;
        var url_param = $routeParams.url_param;
        function sort_by(field, reverse, primer){
            var key = function (x) {return primer ? primer(x[field]) : x[field]};
            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
            }
        }
        $scope.compiled_content = [];
        for(let i = 0, l = page.content.tabs.length; i < l; i++) {
            var views = page.content.tabs;
            var url_param = $routeParams.url_param;
            var anonymous_tab_variable = [];
            if(views[i].param == url_param){
                starting_tab = views[i].name;
                $scope.current_tab = i;
            }
            // Sort by position high to low
            var text_array = views[i].text;
            var lists_array = views[i].lists;
            var text_obj = text_array[0];
            var lists_obj = lists_array[0];
            anonymous_tab_variable.push(text_obj, lists_obj);
            $scope.compiled_content.push(anonymous_tab_variable.sort(sort_by('position', true, parseInt)));
            // Sort by position high to low
        }


        ///////////////// Featured Products
        var numberOfProducts = $rootScope.editable_featured_products.data.list.length;
        var productsList = $rootScope.editable_featured_products.data.list;
        var productsArray = [];
        var textArray = [];
        var listArray = [];
        var addText = function(text){
            textArray.push(text);
            compileProducts();
        }
        var addListItem = function(item){
            listArray.push(item);
            compileProducts();
        }
        var sort_by = function(field, reverse, primer){
            var key = function (x) {return primer ? primer(x[field]) : x[field]};
            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
            }
        }
        
        // Get Products
        var compileProducts = function(){
            var text_item_start = "<b>";
            var text_item_end = "</b>";
            var list_item_start = "<ul class=\"lightweight-list-icon mdl-list\">";
            var list_item_build_middle = "<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon {{primary_hue_normal.name}}\">"
            var list_item_build_end = "</span></li>"
            var list_item_end = "</ul>";
            for (var i = 0; i < numberOfProducts; i++) {

                var text_array = productsList[i].text;
                var lists_array = productsList[i].list;

                // compile text into html
                for (var i = 0; i < text_array.length; i++) {
                    var text_data = text_array[i];
                    var text_item;
                    var text_obj = {};
                    text_item += text_item_start + text_data.data + text_item_end;
                    text_obj.data = text_item;
                    text_obj.position = text_data.position;
                    text_obj.type = text_data.type;
                    textArray.push(text_obj);
                }
                // compile text into html

                // compile list into html
                for (var i = 0; i < lists_array.length; i++) {
                    var list_data = lists_array[i];
                    var list_item;
                    var list_obj = {};
                    list_item += list_item_build_middle + list_data[i].data + list_item_build_end;
                    list_obj.data = list_item_start + list_item + list_item_end;
                    list_obj.position = list_data.position;
                    list_obj.type = list_data.type;
                    listArray.push(list_obj);
                }
                // compile list into html

                productsArray.push(textArray, listArray);
                $scope.compiled_content.push(productsArray.sort(sort_by('position', true, parseInt)));
                
            }
        }
        ///////////////// Featured Products


        // Selects Current View From Parameter
        
        $scope.page = page;
        $scope.tab_data = page.content.tabs;
        $scope.page_banner = page.content.background_media.image.src;
        $scope.tab_visible = starting_tab;
    }) 
   .error(function(err) { 
        console.log(err);
        return err; 
    });
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
}]).directive('compile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.compile);
            }, function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
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


