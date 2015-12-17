define(['ionicBundle'],function() {
    'use strict';
    var addressListCtrl = function($scope,$rootScope,$ionicModal,$ionicLoading,personalData) {
        var host = $rootScope.proxyURL;
        var self = this;
        self.address = $scope.address = {};


        var getAddress = function() {
            var addressListURL = host + '/user/address';
            personalData.getUserData(addressListURL).success(function(data) {
                if (data.err == 0) {
                    self.address.addressList = data.addressList;
                    hideLoading();
                }
            });
        };
        var setDefault = function(addr) {
            var defaultURL = host + '/user/address/default';
            personalData.postUserData(defaultURL,addr).success(function(data) {
                console.log('set default address success');
                popTip('设置成功');
                getAddress();
            })
            .error(function(data) {});
        };

        $scope.setDefault = function(evt,address) {
            evt.stopPropagation();
            evt.preventDefault();
            var defaultAddr = {addrID: address.addrID};
            setDefault(defaultAddr);
        };

        $scope.delete = function(address,index) {
            console.log('delete address');
            var deleteItem = address;
            var deleteURL = host + '/user/address';
            var delData = {addrID: deleteItem.addrID};
            personalData.deleteUserData(deleteURL,delData).success(function(data) {
                if (data.err == 0) {
                    self.address.addressList.splice(index,1);
                    popTip('已删除');
                    if (address.default) {
                        if (self.address.addressList.length) {
                            var defaultAddr = {addrID: self.address.addressList[0].addrID};
                            setDefault(defaultAddr);
                        }
                    }
                }
            })
            .error(function(data) {});
        };


        //弹出新建框
        self.address.newAddress = {};
        self.address.createAddress = function() {
            getProvinces();
            self.address.newModal.show();
        };

        self.address.addAddress = function() {
            addAddress();
            self.address.newModal.hide();
            self.address.newAddress = {};   //clear newAddress obj
        };

        var addAddress = function() {
            var addURL = host + '/user/address';
            self.address.newAddress.province_id = self.address.province.province_id;
            self.address.newAddress.city_id = self.address.city.city_id;
            var address = angular.extend({},self.address.newAddress);
            var success = function(data) {
                if (data.err == 0) {
                    getAddress();
                }
            };
            var error = function(data) {};
            personalData.putUserData(addURL,address)
            .success(success)
            .error(error);
        };

        self.address.closeNewModal = function() {
            self.address.newModal.hide();
            self.address.newAddress =  {};
        };

        //弹出编辑框
        self.address.showAddress = {};

        $scope.showDetail = function(address) {
            console.log('show detail');
            angular.extend(self.address.showAddress,address);
            getProvinces();
            self.address.modModal.show();
        };

        self.address.saveAddress = function() {
            saveAddress();
            self.address.modModal.hide();
        };

        var saveAddress = function() {
            var saveURL = host + '/user/address';
            self.address.showAddress.province_id = self.address.province.province_id;
            self.address.showAddress.city_id = self.address.city.city_id;
            var address = angular.extend({},self.address.showAddress);
            var success = function(data) {
                if (data.err == 0) {
                    getAddress();
                }
            };

            var error = function(data) {};
            personalData.postUserData(saveURL,address)
            .success(success)
            .error(error);
        };

        var getProvinces = function() {
            var provinceURL = host + '/basic/provinces';
            var success = function(data) {
                self.address.provinces = data.provinces;
                console.log('showAddress,');
                console.log(self.address.showAddress);
                if (self.address.modModal.isShown()) {
                    for (var i=0,len=self.address.provinces.length; i<len; i++) {
                        if (self.address.provinces[i].province_id == self.address.showAddress.province_id) {
                            console.log('yes');
                            self.address.province = self.address.provinces[i];
                            break;
                        }
                    }
                } else {
                    self.address.province = self.address.provinces[0];
                }
                console.log(self.address.province);
                getCities(self.address.province.province_id);
            };
            var error = function(data) {};
            personalData.getUserData(provinceURL)
            .success(success)
            .error(error);
        };

        var getCities = function(provinceId) {
            var cityURL = host + '/basic/cities?all=1&province_id=' + provinceId;
            var success = function(data) {
                self.address.cities = data.cities;
                if (self.address.modModal.isShown()) {
                    for (var i=0,len=self.address.cities.length; i<len; i++) {
                        if (self.address.cities[i].city_id == self.address.showAddress.city_id) {
                            self.address.city = self.address.cities[i];
                            break;
                        }
                    }
                } else {
                    self.address.city = self.address.cities[0];
                }
            };
            var error = function(data) {};
            personalData.getUserData(cityURL)
            .success(success)
            .error(error);
        };

        var initModal = function() {
            $ionicModal.fromTemplateUrl('templates/personal/addressDetail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                self.address.modModal = modal;
                console.log('popModallll');
            });
            $ionicModal.fromTemplateUrl('templates/personal/newAddress.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                self.address.newModal = modal;
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

        var popTip = function(tipString) {
            $ionicLoading.show({
                template: tipString,
                noBackdrop: true,
                duration: 2000
            });
        };

        var initData = function() {
            showLoading();
            initModal();
            getAddress();
        };

        initData();
    };

    addressListCtrl.$inject = ['$scope','$rootScope','$ionicModal','$ionicLoading','personalData'];
    return addressListCtrl;
});
