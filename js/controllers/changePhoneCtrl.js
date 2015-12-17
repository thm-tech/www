define(['ionicBundle'], function() {
    'use strict';
    var changePhoneCtrl = function($scope,$rootScope,$interval,$ionicHistory,$ionicLoading,personalData) {
        var host = $rootScope.proxyURL;
        var self = this;
        self.phone = $scope.phone = {};
        self.phone.sCount = 60;
        self.phone.verClicked = false;
        self.phone.reSend = '重新发送' + '(' + self.phone.sCount + ')';
        self.verPhone = '';//记录发送验证码的手机号
        $scope.$watch('phone.sCount', function(newVal) {
            self.phone.reSend = '重新发送' + '(' + self.phone.sCount + ')';
        });
        
        self.phone.verifyCode = function() {
            if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(self.phone.bindPhone))) {
                self.phone.bindPhone = '';
                popTip('请输入正确的11位手机号码');
                return false;
            }
            self.phone.verClicked = true;
            console.log('resend ' + self.phone.reSend);
            $interval(function() {
                if(self.phone.sCount > 1) {
                    --self.phone.sCount;
                } 
                else {
                    self.phone.verClicked = false;
                    self.phone.sCount = 60;
                }
            },1000,60);
            var codeURL = host + '/user/gencode';
            var success = function(data) {
                if (data.err == 0) {
                    self.verPhone = self.phone.bindPhone;
                    console.log('验证码已发送');
                    popTip('验证码已发送');
                } else {
                    popTip('验证码发送失败,稍后重试');
                }
            };
            var error = function(data) {
                popTip('验证码发送失败,稍后重试');
            };
            personalData.postUserData(codeURL,{phone:self.phone.bindPhone})
            .success(success)
            .error(error);
        };

        self.phone.bind = function() {
            if (self.verPhone != self.phone.bindPhone) {
                popTip('与发送验证码号码不匹配');
                return false;
            }
            var verifyCodeURL = host + '/user/vercode';
            var bindURL = host + '/user/bindphone';
            var verSuccess = function(data) {
                if (data.err == 0) {
                    personalData.postUserData(bindURL,{phone:self.phone.bindPhone})
                    .success(bindSuccess)
                    .error(bindError);
                } else {
                    popTip('验证码有误');
                }
            };
            var verError = function(data) {};
            var bindSuccess = function(data) {
                popTip('绑定成功');
                var msg = {phone:self.phone.bindPhone};
                $scope.$emit('bindPhoneSuccess',msg);
                $ionicHistory.goBack();
            };
            var bindError = function(data) {

            };
            personalData.postUserData(verifyCodeURL,{phone:self.phone.bindPhone,code:self.phone.vercode})
            .success(verSuccess)
            .error(verError);
        };

        var getPhone = function() {
            var phoneURL = host + '/user/personal';
            var success = function(data) {
                if (data.err == 0) {
                    self.phone.info = data.info;
                    hideLoading();
                }
            };
            var error = function(data) {

            };
            personalData.getUserData(phoneURL)
            .success(success)
            .error(error);
        };

        var showLoading = function() {
            $ionicLoading.show({
                template: '正在加载'
            });
        };

        var hideLoading = function() {
            $ionicLoading.hide();
        };

        var popTip = function(tipString) {
            $ionicLoading.show({
                template: tipString,
                noBackdrop: true,
                duration: 2000
            });
        };

        var initData = function() {
            showLoading();
            getPhone();
        };

        initData();
    };

    changePhoneCtrl.$inject = ['$scope','$rootScope','$interval','$ionicHistory','$ionicLoading','personalData'];
    return changePhoneCtrl;
});