define(['angular','md5'], function(angular) {
    'use strict';
    var loginAuth = function($ionicModal,$rootScope,$http) {
        var Amodal;
        function auth() {
            if(getUserInfo()) {
                Amodal.remove();
            } else {
                console.log('rootScope');
                console.log($rootScope.account);
                showModal();
            }
        }
        //判断用户登录状态
        function getUserInfo() {
            if($rootScope.account.hasData) {
                return true;
            }
            else {
                return false;
            }
        }

        function login(loginURL,credentials) {
            credentials.password = hex_md5(credentials.password);
                auth._credentials = credentials;
                return $http({
                            url:loginURL,
                            method:'POST',
                            withCredentials:true,
                            data: auth._credentials
                });
        }
        //保存用户账号信息
        function saveAccData(accURL) {
//            $rootScope.account.hasData = true;            
            return $http({
                url: accURL,
                method: 'GET',
                withCredentials:true
            });
        }

        function popModal() {
            $ionicModal.fromTemplateUrl('templates/login/login.html', {
                animation: 'slide-in-up',
                focusFirstInput: true,
            }).then(function(modal) {
                Amodal = modal;
                console.log('popModal');
            });
        }

        function showModal() {
            Amodal.show();
        }

        function hideModal() {
            Amodal.hide();
        }

        function removeModal() {
            Amodal.remove();
        }

        return {
            popModal: popModal,
            show: showModal,
            hide: hideModal,
            remove: removeModal,
            auth: auth,
            login: login,
            saveAccData:saveAccData
        };
    };
    loginAuth.$inject = ['$ionicModal','$rootScope','$http'];
    return loginAuth;
});