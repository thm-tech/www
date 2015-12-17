define(['ionicBundle'], function() {
    'use strict';
        function changeAccCtrl($rootScope,$http,$scope,$location,$timeout,$ionicHistory,$ionicLoading,$cordovaSQLite,personalData,optDB) {
            var host = $rootScope.proxyURL;
            var self = this;
            self.accountData = $scope.accountData = {};

            var getAccData = function() {
                var accURL = host + '/user/personal';
                var success = function(data) {
                    if (data.err === 0) {
                        self.accountData.info = data.info;
                        hideLoading();
                    }
                };
                var error = function(data) {};
                personalData.getUserData(accURL).success(success).error(error);
            };

            self.accountData.saveName = function() {
                var saveURL = host + '/user/personal';
                var postData = {
                    attr: 1,
                    name: self.accountData.info.name,
                    portrait: self.accountData.info.portrait,
                    gender: self.accountData.info.gender,
                    city: self.accountData.info.city 
                };
                var success = function(data) {
                    if (data.err == 0) {
                            //self.personal.account.name = $scope.account.curName;
                        updateNameInDB(self.accountData.info.name);
                        $ionicHistory.goBack();
                    }
                };
                var error = function(data) {};
                personalData.postUserData(saveURL,postData).success(success).error(error);
            };

            var updateNameInDB = function(data) {
               var updateData = [];
               updateData.push(data);
               optDB.update('account','username = ?',updateData)
               .then(function(res) {
                   var msg = {newName: self.accountData.info.name};
                   $scope.$emit('nameChange',msg);
                   $rootScope.account.username = data;
               },function(err) {
                   alert('update failed');
               });
            };

            var showLoading = function() {
                $ionicLoading.show({
                    template: '正在加载'
                });
            };

            var hideLoading = function() {
                $ionicLoading.hide();
            };

            var initData = function() {
                showLoading();
                getAccData();
            };

            initData();
        }

        changeAccCtrl.$inject = ['$rootScope','$http','$scope','$location','$timeout','$ionicHistory','$ionicLoading','$cordovaSQLite','personalData','optDB'];
        return changeAccCtrl;
});