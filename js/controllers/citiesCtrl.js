define(['angular'], function(angular) {
    'use strict';
    function citiesCtrl($rootScope,$scope) {
        var self = this;
        self.cities = $scope.cities = {};
        self.cities.cities = [
            {name: '合肥',id: 1},
            {name: '上海',id: 2},
            {name: '北京',id: 3},
            {name: '深圳',id: 4},
            {name: '广州',id: 5},
            {name: '厦门',id: 6}
        ];
        self.cities.curCityId = $rootScope.curCity.id;
        self.cities.selectCity = function(curCity) {
            self.cities.curCityId = curCity.id;
            $rootScope.curCityId = curCity.id;
            var city = {};
            angular.copy(curCity,city);
            $scope.$emit('changeCity',city);
        };
    }
    citiesCtrl.$inject = ['$rootScope','$scope'];
    return citiesCtrl;
});