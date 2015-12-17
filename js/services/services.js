define(function (require) {
    
    'use strict';
    
    require('ionicBundle');
        var config = require('config'),
        services = angular.module('mmx.services', ['mmx.config']);
    
    services.factory('loginAuth', require('services/auth.service'));
    services.factory('optDB', require('services/optDB.service'));
    services.factory('personalData', require('services/personalData.service'));
    return services;

});