define(['ionicBundle'],function() {
    'use strict';
    function menuCtrl($rootScope,$scope,$ionicSideMenuDelegate,$location,$timeout,$cordovaSQLite,loginAuth,optDB) {
        var self = this;
        self.menu = $scope.menu = {};
//        self.menu.logged = false;
        self.menu.user = {};
        self.menu.curCity = {name: '合肥',id: 1};
        $rootScope.curCity = {name: '合肥',id: 1};
        /* close menu */
        self.menu.close = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        self.menu.popLogin = function() {
            $ionicSideMenuDelegate.toggleLeft();
            loginAuth.auth();

        };
        self.menu.curItem = 'shops';
        self.menu.select = function(curItem) {
            console.log('curItem,' + curItem);
            self.menu.curItem = curItem;
        };
        $scope.$on('modal.removed', function() {
            if ($rootScope.userDB) {
                console.log('cur dabase is ' + $rootScope.userDB.dbname);
                self.menu.user.username = $rootScope.account.username;
                self.menu.user.portrait = $rootScope.account.portrait;
                self.menu.logged = true;
                // optDB.select('account','username, portrait')
                // .then(function(res) {
                //     // alert(res.rows.length);
                //     // var ite;
                //     // angular.forEach(res.rows.item(0),function(v,k) {
                //     //     alert(k);
                //     //     alert(v);
                //     // });
                //     self.menu.user.username = res.rows.item(0).username;
                //     self.menu.user.portrait = res.rows.item(0).portrait;
                //     self.menu.logged = true;
                // },function(err) {
                //     console.log(err);
                // });
            }
            else {
                self.menu.user.username = $rootScope.account.username;
                self.menu.user.portrait = $rootScope.account.portrait;
                self.menu.logged = true;
            }
        });
        $scope.$on('modal.hidden',function() {
            console.log('hidden modal');
        });
        $scope.$on('logout',function() {
            self.initMenu();
        });
        $scope.$on('changeCity',function(evt,msg) {
            self.menu.curCity = msg;
            angular.copy(msg,$rootScope.curCity);
        });
        $scope.$on('nameChange',function(evt,msg) {
            console.log('namechange');
            self.menu.user.username = msg.newName;
            $rootScope.account.username = msg.newName;
            $timeout(function() {
                $scope.$broadcast('_nameChange',msg);
            },20)
        });
        $scope.$on('portraitChange', function(evt,msg) {
            self.menu.user.portrait = msg.portrait;
            $rootScope.account.portrait = msg.portrait;
        });
        $scope.$on('bindPhoneSuccess',function(evt,msg) {
            console.log('phonechange');
            $timeout(function() {
                $scope.$broadcast('_phoneChange',msg);
            },20)
        });

        self.initMenu = function() {
            loginAuth.popModal();  //init modal
            if (window.localStorage.currentUser) {
                optDB.select('account','user_id, username, password, portrait')
                  .then(function(res) {
                    $rootScope.account.userId = res.rows.item(0).user_id;
                    $rootScope.account.username = res.rows.item(0).username;
                    $rootScope.account.password = res.rows.item(0).password;
                    $rootScope.account.portrait = res.rows.item(0).portrait;
                    self.menu.user.username = $rootScope.account.username;
                    self.menu.user.portrait = $rootScope.account.portrait;
                    self.menu.logged = true;
                    console.log('username,' + self.menu.user.username);
                 },function(err) {
                    console.log(err);
                    alert(err);
                 });
            } else {
                self.menu.logged = false;
                self.menu.user = {};
            }
        };
        self.initData = function() {
            self.initMenu();
        };
        self.initData();
    }
    menuCtrl.$inject = ['$rootScope','$scope','$ionicSideMenuDelegate','$location','$timeout','$cordovaSQLite','loginAuth','optDB'];
    return menuCtrl;
});