define(['angular','md5'],function(angular) {
    'use strict';
    function loginCtrl($rootScope,$scope,$http,$location,$cordovaSQLite,loginAuth,optDB) {
        var host = $rootScope.proxyURL;
        var self = this;
        self.user = $scope.user = {};
        self.user.username = '';
        self.user.passward = '';
        self.saveAccData = function(data) {
            var accURL = host + '/user/personal';
            loginAuth.saveAccData(accURL).success(function(resData) {
                if(resData.err === 0) {
                    var pw = hex_md5(self.user.password);
                    console.log('get acc data');
                    var accData = resData.info;
                    /*
                        save acc data in datebase

                    */
                    if (window.cordova) {
                        window.localStorage.setItem('currentUser',data.accID);
                        alert(window.localStorage.getItem('currentUser'));
                        $rootScope.userDB = $cordovaSQLite.openDB({ name: "mmx_" + data.accID});
                        /*
                        var selectAcc = 'SELECT username portrait FROM account';
                        $cordovaSQLite.execute($rootScope.userDB,selectAcc,[])
                        .then(function(res) {
                            var updateAcc = 'UPDATE account SET username = ?, password = ?, portrait = ?';
                            $cordovaSQLite.execute($rootScope.userDB,updateAcc,[accData.name,pw,accData.portrait])
                            .then(function(res) {
                                alert('update success');
                                $rootScope.account.hasData = true;
                                $rootScope.account.userId = data.accID;
                                $rootScope.account.username = accData.name;
                                $rootScope.account.password = hex_md5(self.user.password);
                                $rootScope.account.portrait = accData.portrait;
                                loginAuth.remove();
                                console.log('res id is,' + res.updateId);
                            },function(err) {
                                console.log(err);
                                alert('update failed');
                            });
                        },function(err) {
                            alert('no mmx_userid table');
                            $cordovaSQLite.execute($rootScope.userDB, "CREATE TABLE IF NOT EXISTS account (id integer primary key, user_id text, username text, password text, portrait text)");       
                            var insertAcc = 'INSERT INTO account (user_id,username,password,portrait) VALUES (?,?,?,?)';
                            $cordovaSQLite.execute($rootScope.userDB,insertAcc,[data.accID,accData.name,pw,accData.portrait])
                            .then(function(res) {
                                alert('insert new data');
                                $rootScope.account.hasData = true;
                                $rootScope.account.userId = data.accID;
                                $rootScope.account.username = accData.name;
                                $rootScope.account.password = hex_md5(self.user.password);
                                $rootScope.account.portrait = accData.portrait;
                                loginAuth.remove();
                            },function(err) {   
                                alert('insert error');
                            });
                        });*/
                        optDB.select('account','username, portrait')
                        .then(function(res) {
                            var updateData = [accData.name,pw,accData.portrait];
                            optDB.update('account','username = ?, password = ?, portrait = ?',updateData)
                            .then(function(res) {
                                alert('update success');
                                $rootScope.account.hasData = true;
                                $rootScope.account.userId = data.accID;
                                $rootScope.account.username = accData.name;
                                $rootScope.account.password = hex_md5(self.user.password);
                                $rootScope.account.portrait = accData.portrait;
                                loginAuth.remove();
                            },function(err) {
                                alert('update failed');
                            });
                        },function(err) {
                            $cordovaSQLite.execute($rootScope.userDB, "CREATE TABLE IF NOT EXISTS account (id integer primary key, user_id text, username text, password text, portrait text)");
                            var insertData = [data.accID,accData.name,pw,accData.portrait];
                            optDB.insert('account','(user_id,username,password,portrait)',insertData,'(?,?,?,?)')
                            .then(function(res) {
                                alert('insert new data');
                                $rootScope.account.hasData = true;
                                $rootScope.account.userId = data.accID;
                                $rootScope.account.username = accData.name;
                                $rootScope.account.password = hex_md5(self.user.password);
                                $rootScope.account.portrait = accData.portrait;
                                loginAuth.remove();
                            },function(err) {
                                alert('insert err');
                            });
                        });    
                        // $cordovaSQLite.execute($rootScope.userDB, "CREATE TABLE IF NOT EXISTS account (id integer primary key, user_id text, username text, password text, portrait text)");
                        // var query = 'INSERT INTO user (username,portrait) VALUES (?,?)';
                        // $cordovaSQLite.execute($rootScope.db,query,[accData.name,accData.portrait])
                        // .then(
                        //     function(res) {
                        //         console.log('insert id is ,' + res.insertId);
                        //     },function(err) {
                        //         console.error(err);
                        // });
                        } else {
                            $rootScope.account.hasData = true;
                            $rootScope.account.userId = data.accID;
                            $rootScope.account.username = accData.name;
                            $rootScope.account.password = hex_md5(self.user.password);
                            $rootScope.account.portrait = accData.portrait;

                            loginAuth.remove();
                        }
                    }
            });
        };
        self.user.tryLogin = function() {
            var loginURL = host + '/user/login';
            var loginData = {
                phone:self.user.username,
                password:self.user.password,
                mode:2,
                dev:'',
                type:4
            };
            console.log('login data');
            console.log(loginData);
            var success = function(data) {
                if (data.err === 0) {
                    self.saveAccData(data);
                } else {
                    alert('用户名或密码错误');
                }
            };
            var error = function(data) {

            };
            loginAuth.login(loginURL,loginData).success(success).error(error);
        };
    }
    loginCtrl.$inject = ['$rootScope','$scope','$http','$location','$cordovaSQLite','loginAuth','optDB'];
    return loginCtrl;
});