define(function() {
    'use strict';
    function settingsCtrl($rootScope,$scope,$http,$location,$ionicActionSheet,$timeout,$cordovaSQLite) {
        $scope.name = 'this is settings';
        var host = $rootScope.proxyURL;
        var self = this;
        self.settings = $scope.settings = {};
        if (window.localStorage.getItem('currentUser')) {
//            alert('logged');
            self.settings.logged = true;
        }
        else {
//            alert('logged failed');
            self.settings.logged = false;
        }

        self.settings.invite = function() {
                $ionicActionSheet.show({
                    buttons: [
                        {text: '<div><img src="img/weixin.png" />&nbsp;&nbsp;&nbsp;&nbsp;<span>微信</span></div>'},
                        {text: '<div><img src="img/qq.png" />&nbsp;&nbsp;&nbsp;&nbsp;<span>QQ</span></div>'},
                        {text: '<div><img src="img/pengyouquan.png" />&nbsp;&nbsp;&nbsp;&nbsp;<span>朋友圈</span></div>'},
                        {text: '<div><img src="img/duanxin.png" />&nbsp;&nbsp;&nbsp;&nbsp;<span>短信</span></div>'}
                    ],
                    titleText: '分享给好友',
                    cancelText: '<font color="#FF0000">取消</font>',
                    buttonClicked: function(index) {
                           return true;
                    },
                    cssClass: 'mmx-action-sheet'
                });
        };

        self.settings.logout = function() {
//            alert(host + '/user/logout');
            $http({
                url: host + '/user/logout',
                method: 'POST',
                data: {}
            })
            .success(function(data) {
                $rootScope.userDB.close(function() {
                    console.log('close dbbase....');
                });

                $cordovaSQLite.deleteDB({name:$rootScope.userDB.dbname})
                .then(function() {
                    console.log('delete db');  
                    console.log(Object.keys($rootScope.userDB));                 
                });;

                console.log('logout successfully');
//                alert('success logout');
                $scope.$emit('logout');
                $location.path('/mmx/shops');
            })
            .error(function(data,status) {
//                alert(status);
            });
            if (window.localStorage.getItem('currentUser')) {
//                alert('logout');
                window.localStorage.removeItem('currentUser');
                $rootScope.account = {hasData: false};

            }
        };

        self.settings.message = {};
        self.settings.message.shops = [
            {name: '朵以天鹅湖万达'},
            {name: 'Vero Moda银泰店'},
            {name: 'Only天鹅湖万达店'}
        ];
    }
    settingsCtrl.$inject = ['$rootScope','$scope','$http','$location','$ionicActionSheet','$timeout','$cordovaSQLite'];
    return settingsCtrl;
});