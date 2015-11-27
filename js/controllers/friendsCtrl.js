define(function() {
    'use strict';
    function friendsCtrl($scope) {
        $scope.name = 'this is friends';
    }
    friendsCtrl.$inject = ['$scope'];
    return friendsCtrl;
});