define(['angular'],function(angular) {
    'use strict';
    function menuCtrl($rootScope,$scope,$ionicSideMenuDelegate,$location,$cordovaSQLite,loginAuth,optDB) {
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
            alert('logged in');
            console.log($rootScope.account);
            if ($rootScope.userDB) {
                alert('userDB');
                optDB.select('account','username, portrait')
                .then(function(res) {
                    // alert(res.rows.length);
                    // var ite;
                    // angular.forEach(res.rows.item(0),function(v,k) {
                    //     alert(k);
                    //     alert(v);
                    // });
                    self.menu.user.username = res.rows.item(0).username;
                    self.menu.user.portrait = res.rows.item(0).portrait;
                    self.menu.logged = true;
                },function(err) {
                    console.log(err);
                });
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
    menuCtrl.$inject = ['$rootScope','$scope','$ionicSideMenuDelegate','$location','$cordovaSQLite','loginAuth','optDB'];
    return menuCtrl;
});