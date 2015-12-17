define(function (require) {

    'use strict';

    require('ionicBundle');
    var services = require('services/services'),
        config = require('config'),
        controllers = angular.module('mmx.controllers', ['mmx.config']);
        controllers.controller('loginCtrl', require('controllers/loginCtrl'));
        controllers.controller('menuCtrl', require('controllers/menuCtrl'));
        controllers.controller('personalCtrl', require('controllers/personalCtrl'));
        controllers.controller('accountCtrl', require('controllers/accountCtrl'));
        controllers.controller('changeNameCtrl', require('controllers/changeNameCtrl'));
        controllers.controller('changePhoneCtrl', require('controllers/changePhoneCtrl'));
        controllers.controller('addressListCtrl', require('controllers/addressListCtrl'));
        controllers.controller('shopsCtrl', require('controllers/shopsCtrl'));
        controllers.controller('recommendCtrl', require('controllers/recommendCtrl'));
        controllers.controller('friendsCtrl', require('controllers/friendsCtrl'));
        controllers.controller('mmlistCtrl', require('controllers/mmlistCtrl'));
        controllers.controller('scanqrCtrl', require('controllers/scanqrCtrl'));
        controllers.controller('feedbackCtrl', require('controllers/feedbackCtrl'));
        controllers.controller('citiesCtrl', require('controllers/citiesCtrl'));
        controllers.controller('settingsCtrl', require('controllers/settingsCtrl'));
        controllers.run(['$rootScope', function ($rootScope) {
            $rootScope.sampleParam = "value";
        }]);
        
        return controllers;

});