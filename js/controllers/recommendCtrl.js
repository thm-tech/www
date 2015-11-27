define(function() {
    'use strict';
    function recommendCtrl($scope) {
        $scope.name = 'this is recommend';
    }
    recommendCtrl.$inject = ['$scope'];
    return recommendCtrl;
});