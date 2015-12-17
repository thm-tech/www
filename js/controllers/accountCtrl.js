define(['ionicBundle','qrcode','qrcodeUTF8'], function() {
    'use strict';
        function accountCtrl($rootScope,$http,$scope,$location,$cordovaSQLite,$ionicModal,$ionicHistory,$ionicLoading,$cordovaCamera,$cordovaImagePicker,$cordovaFileTransfer,personalData,optDB) {
            var host = $rootScope.proxyURL,
                chatHost = $rootScope.chatURL;
            var self = this;
            self.account = $scope.account = {};

            var getAccData = function() {
                var accURL = host + '/user/personal';
                var success = function(data) {
                    if (data.err === 0) {
                        self.account.info = data.info;
                        if (self.account.info.gender == 1) {
                            self.account.info._gender = '男';
                        }
                        else if (self.account.info.gender == 2) {
                            self.account.info._gender = '女';
                        }
                        getCityName();
                        getUserAddress();
                    }
                };
                var error = function(data) {};
                personalData.getUserData(accURL).success(success).error(error);
            };

            var getCityName = function() {
                var cityURL = host + '/basic/city/' + self.account.info.city;
                var success = function(data) {
                    //self.account.info.cityName = data.province_name + ' ' + data.city_name;
                    angular.extend(self.account.info,data);
                };
                var error = function(data) {};
                personalData.getUserData(cityURL).success(success).error(error);
            };

            var getUserAddress = function() {
                var addressURL = host + '/user/address';
                var success = function(data) {
                    hideLoading();
                    // if (data.err == 0) {
                    //     var len = data.addressList.length;
                    //     if (len) {
                    //         while(len--) {
                    //             if (data.addressList[len].default) {
                    //                 self.account.info.defaultAddr = data.addressList[len].address;
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     else {
                    //         self.account.info.defaultAddr = '';
                    //     }
                    // }
                };
                var error = function() {};
                personalData.getUserData(addressURL).success(success).error(error);
            };

            self.account.popSelectImg = function() {
                popSelectImg();
            };

            self.account.getPictures = function(type) {
                // type == 1: Camera.PictureSourceType.PHOTOLIBRARY
                // type == 0: Camera.PictureSourceType.CAMERA
                hideSelectImg();//关闭弹出框
                var sourceType = type ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
                var options = {
                    quality: 75,
                    //destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: sourceType,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function(imageURI) {
                    postImage(imageURI);
//                            $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                            self.account.info.portrait = $scope.imgURI;
                }, function(err) {
                            // An error occured. Show a message to the user
                });
            };

            var changePortrait = function(url) {
                // alert('change portrait');
                var changePortraitURL = host + '/user/personal';
                var postData = {
                    attr: 2,
                    city: self.account.info.city_id,
                    gender: self.account.info.gender,
                    name: self.account.info.name,
                    portrait:  url
                };
                var success = function(data) {
                    if (data.err == 0) {
//                        alert('change image success');
                        self.account.info.portrait = url;
                        updatePortraitInDB(url);
                    } else {
                        popTip('头像修改失败');
                    }
                };

                var error = function(data) {
                    popTip('头像修改失败');
                };

                var updatePortraitInDB = function(data) {
                    var updateData = [];
                    updateData.push(data);
                    optDB.update('account','portrait = ?',updateData)
                    .then(function(res) {
                        var msg = {portrait:data};
//                        alert('update success');
                        $rootScope.account.portrait = data;
                        hideSelectImg();
                        $scope.$emit('portraitChange',msg);
                    },function(err) {
                        alert('update failed');
                    });
                };    

                personalData.postUserData(changePortraitURL,postData)
                .success(success)
                .error(error);
            };

            var postImage = function(imageURI) {
                var postImageURL = chatHost + ':8889/file/uploader';
                var options = {

                };
                console.log('imgURI,' + imageURI);
                $cordovaFileTransfer.upload(postImageURL, imageURI, options)
                      .then(function(result) {
                        // Success!
                        var imgInfo = angular.fromJson(result.response);
                        console.log('imginfo.url,' + imgInfo.url);
                        changePortrait(imgInfo.url);
                      }, function(err) {
                        // Error
                        alert('error,' + JSON.stringify(err));
                      }, function (progress) {
                        // constant progress updates
                      });
            };

            self.account.showCities = function() {
                getProvinces();
                popCityModal();
            };

            $scope.changeProvince = function(province) {
                var _province = angular.extend({},province);
                getCities(_province.province_id);
            };

            $scope.saveCity = function() {
                var cityURL = host + '/user/personal';
                var postData = {
                    attr: 4,
                    city: self.account.city.city_id,
                    gender: self.account.info.gender,
                    name: self.account.info.name,
                    portrait: self.account.info.portrait 
                };
                var success = function(data) {
                    if (data.err == 0) {
                        self.account.info.city_name = self.account.city.city_name;
                        self.account.info.city_id = self.account.city.city_id;
                        self.account.info.province_id = self.account.province.province_id;
                        self.account.info.province_name = self.account.province.province_name;
                        hideCityModal();
                    }
                };

                var error = function(data) {};
                personalData.postUserData(cityURL,postData)
                .success(success)
                .error(error)
            };

            var getProvinces = function() {
                var provincesURL = host + '/basic/provinces?all=1';
                var success = function(data) {
                    self.account.provinces = data.provinces;
                    console.log(self.account.provinces);
                    if (self.account.info.province_id) {
                        for (var i=0,len=self.account.provinces.length; i<len; i++) {
                            if (self.account.provinces[i].province_id == self.account.info.province_id) {
                                self.account.province = self.account.provinces[i];
                                console.log('province,' + self.account.province.province_name);
                                break;
                            }
                        }
                    } else {
                        self.account.province = self.account.provinces[0];
                    }
                    getCities(self.account.province.province_id);
                };
                var error = function(data) {};

                personalData.getUserData(provincesURL)
                .success(success)
                .error(error);
            };

            var getCities = function(provinceId) {
                var cityURL = host + '/basic/cities?all=1&province_id=' + provinceId;
                var success = function(data) {
                    self.account.cities = data.cities;
                    if (self.account.info.city_id && provinceId == self.account.info.province_id) {
                        for (var i=0,len=self.account.cities.length; i<len; i++) {
                            if (self.account.cities[i].city_id == self.account.info.city_id) {
                                self.account.city = self.account.cities[i];
                                console.log('city,' + self.account.city.city_name);
                                break;
                            }
                        }
                    } else {
                        self.account.city = self.account.cities[0];
                    }
                };
                var error = function(data) {};

                personalData.getUserData(cityURL)
                .success(success)
                .error(error);
            };

            var initSelectImgModal = function() {
                $ionicModal.fromTemplateUrl('/templates/personal/selectImg.html', {
                    scope: $scope,
                    animation: 'fade-in-scale'
                }).then(function(modal) {
                    self.account.selectImgModal = modal;
                });
            };

            var popSelectImg = function() {
                if (self.account.selectImgModal) {
                    self.account.selectImgModal.show();
                }
                
            };

            var hideSelectImg = function() {
                if (self.account.selectImgModal) {
                    self.account.selectImgModal.hide();
                }
            };

            var popCityModal = function() {
                if (self.account.cityModal) {
                    self.account.cityModal.show();
                }
                
            };

            var hideCityModal = function() {
                if (self.account.cityModal) {
                    self.account.cityModal.hide();
                }
            };

            var initCityModal = function() {
                $ionicModal.fromTemplateUrl('/templates/personal/changeCity.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    self.account.cityModal = modal;
                });
            };

            self.account.toggleQrcode = function() {
                console.log('show qrcode');
                self.account.qrcode = !self.account.qrcode;
            };

            self.account.selectGender = function() {
                console.log('gender,' + self.account.info.gender);
                if (self.account.info.gender == 1) {
                    self.account.info._gender = '男';
                } else if (self.account.info.gender == 2){
                    self.account.info._gender = '女';
                }
                hideGenderModal();
                saveGender();
            };

            var saveGender = function() {
                var saveURL = host + '/user/personal';
                var postData = {
                    attr: 3,
                    name: self.account.info.name,
                    portrait: self.account.info.portrait,
                    gender: self.account.info.gender,
                    city: self.account.info.city 
                };
                var success = function(data) {
                    if (data.err == 0) {
                        console.log('save gender success');
                    }
                };
                var error = function(data) {};
                personalData.postUserData(saveURL,postData).success(success).error(error);
            };

            var initGenderModal = function() {
                $ionicModal.fromTemplateUrl('templates/personal/gender.html', {
                    scope: $scope,
                    animation: 'fade-in-scale'
                }).then(function(modal) {
                    self.account.genderModal = modal;
                    console.log('popModal');
                });
            };
            self.account.popGenderModal = function() {
                showGenderModal();
            };

            var showGenderModal = function() {
                if (self.account.genderModal) {
                   self.account.genderModal.show();
                }
                
            };

            var hideGenderModal = function() {
                if (self.account.genderModal) {
                    self.account.genderModal.hide();
                }               
            };

            var removeModal = function() {
                self.account.genderModal.remove();
                self.account.cityModal.remove();
                self.account.selectImgModal.remove();
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

            $scope.$on('_nameChange',function(evt,msg) {
                console.log('name change');
                self.account.info.name = msg.newName;
            });

            $scope.$on('_phoneChange', function(evt,msg) {
                self.account.info.phone = msg.phone;
            });

            $scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
                console.log('back to personal');
//                removeModal();
            });

            $scope.$on('$stateChangeSuccess', function(event,toState, toParams, fromState, fromParams) {
                console.log('state change success');

            });

            var initData = function() {
                self.account.qrcode = false;
                showLoading();
                initGenderModal();
                initCityModal();
                initSelectImgModal();
                getAccData();
            };


            initData();
        }

        accountCtrl.$inject = ['$rootScope','$http','$scope','$location','$cordovaSQLite','$ionicModal','$ionicHistory','$ionicLoading','$cordovaCamera','$cordovaImagePicker','$cordovaFileTransfer','personalData','optDB'];
        return accountCtrl;
    }
);
