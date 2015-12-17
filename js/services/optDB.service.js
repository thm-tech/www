define(['ionicBundle'], function() {
    'use strict';
    var optDB = function($rootScope,$cordovaSQLite,$q) {

        function select(tbName,queryParams) {
            var deferred = $q.defer();
            try {
                alert('optDB.select');
                if (angular.isString(queryParams)) {
                    var queryStr = 'SELECT ' + queryParams + ' FROM ' + tbName;
                    // for (var i=1; i<queryParams.length; i++) {
                    //     queryStr += ',' + queryParams[i];
                    // }
                    // queryStr += queryStr + ' FROM ' + tbName;
                    console.log('userdbbbbbbbbbbb,' + $rootScope.userDB.dbname);
                    $cordovaSQLite.execute($rootScope.userDB,queryStr,[])
                    .then(function(res) {
                        deferred.resolve(res);
                    },function(err) {
                        deferred.reject(err);
                    });
                } else {
                    throw new Error('type of second arg is error');
                }
            } catch(e) {
                alert('查询失败' + e.message);
            }
            return deferred.promise;
        }

        function insert(tbName,insertParams,insertData,placeStr) {
            var deferred = $q.defer();
            try {
                if (angular.isString(insertParams) && angular.isArray(insertData) && angular.isString(placeStr)) {
                    var insertStr = 'INSERT INTO ' + tbName + ' ' + insertParams + ' VALUES ' + placeStr;
                    console.log('insert sql is ,' + insertStr);
                    $cordovaSQLite.execute($rootScope.userDB,insertStr,insertData)
                    .then(function(res) {
                        deferred.resolve(res);
                    },function(err) {
                        alert(err.message);
                        deferred.reject(err);
                    });
                } else {
                    throw new Error('type of second or third arg is error');
                }
            } catch(e) {
                alert('插入失败' + e.message);
            }
            return deferred.promise;
        }

        function update(tbName,updateParams,updateData) {
            var deferred = $q.defer();
            try {
                if (angular.isString(updateParams) && angular.isArray(updateData)) {
                    var updateStr = 'UPDATE ' + tbName + ' SET ' + updateParams;
                    $cordovaSQLite.execute($rootScope.userDB,updateStr,updateData)
                    .then(function(res) {
                        deferred.resolve(res);
                    },function(err) {
                        deferred.reject(err);
                    });
                } else {
                    throw new Error('type of second or third arg is error');
                }
            } catch(e) {
                alert('更新失败' + e.message);
            }
            return deferred.promise;
        }

        return {
            select: select,
            insert: insert,
            update: update
        };
    };
    optDB.$inject = ['$rootScope','$cordovaSQLite','$q'];
    return optDB;
});