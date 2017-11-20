'use strict';

angular.module('userFilter', []).filter('userType', [function () {
    return function (users, selectedFilter) {
        if (!angular.isUndefined(users) && !angular.isUndefined(selectedFilter) && selectedFilter.length > 0) {
            var tempUsers = [];
            angular.forEach(selectedFilter, function (id) {
                angular.forEach(users, function (user) {
                    if (angular.equals(user.role.id, id)) {
                        tempUsers.push(user);
                    }
                });
            });
            return tempUsers;
        } else {
            return users;
        }
    };
}]);




