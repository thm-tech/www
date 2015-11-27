define(['angular'], function(angular) {
    'use strict';
    function personalCtrl($rootScope,$http,$scope) {
        var host = $rootScope.proxyURL;
        var self = this;
        self.personal = $scope.personal = {};
        var 
    }
    personalCtrl.$inject = ['$rootScope','$http','$scope'];
    return personalCtrl;
});