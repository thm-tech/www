define(['ionicBundle'], function() {
    'use strict';
    function personalCtrl($rootScope,$http,$scope,$location,$ionicHistory,$ionicLoading,$cordovaNetwork,personalData) {
        var host = $rootScope.proxyURL;
        var self = this;
        self.personal = $scope.personal = {};
        self.personal.isOnline = null;

        var getAccData = function() {
            var accURL = host + '/user/personal';
            var success = function(data) {
                if (data.err === 0) {
                    self.personal.account = data.info;
                    if (self.personal.account.gender == 1) {
                        self.personal.account._gender = '男';
                    }
                    else if (self.personal.account.gender == 2) {
                        self.personal.account._gender = '女';
                    }
                    hideLoading();
                    // getCityName();
                    // getUserAddress();
                }
            };
            var error = function(data) {};
            personalData.getUserData(accURL).success(success).error(error);
        };

        self.personal.reload = function() {
            console.log('reload');
            initData();
        };

        var showLoading = function() {
            $ionicLoading.show({
                template: '正在加载'
            });
        };

        var hideLoading = function() {
            $ionicLoading.hide();
        };

        var isOnline = function() {
            self.personal.isOnline = $cordovaNetwork.isOnline();
            return self.personal.isOnline;
        };

        var popNetworkErr = function() {
            console.log('popNetworkErr');
            $ionicLoading.show({
                template: '网络异常,检查网络后重试',
                noBackdrop: true,
                duration: 2000
            });
        };

        $scope.$on('$stateChangeSuccess',function() {
            console.log('personal name change');
//            getAccData();
        });

        $scope.$on('$cordovaNetwork:offline', function(event,networkState) {

        });

        var initData = function() {
            if (isOnline()) {
                showLoading();
                getAccData();
             } else {
                 popNetworkErr();
            } 
        };

        initData();
    }
    personalCtrl.$inject = ['$rootScope','$http','$scope','$location','$ionicHistory','$ionicLoading','$cordovaNetwork','personalData'];
    return personalCtrl;
});