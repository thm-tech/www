define(['ionicBundle'], function() {
    'use strict';
    var personalData = function($http) {
        //获取账号信息
        function getUserData(url) {
            return $http({
                url: url,
                method: 'GET'
            });
        }
        // //获取关注商店
        // function getAttentionData(url) {

        // }
        // //获取收藏商品
        // function getFavData(url) {

        // }
        function postUserData(url,data) {
            return $http({
                url: url,
                method: 'POST',
                data: data
            });
        }

        function putUserData(url,data) {
            return $http({
                url: url,
                method: 'PUT',
                data: data
            });
        }

        function deleteUserData(url,data) {
            return $http({
                url: url,
                method: 'DELETE',
                data: data
            });
        }

        return {
            getUserData: getUserData,
            postUserData: postUserData,
            putUserData: putUserData,
            deleteUserData: deleteUserData
        };
    };
    personalData.$inject = ['$http'];
    return personalData;
});