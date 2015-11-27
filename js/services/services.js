define(function (require) {
    
    'use strict';
    
    var angular = require('angular'),
        config = require('config'),
        services = angular.module('mmx.services', ['mmx.config']);
    
    services.factory('loginAuth', require('services/auth.service'));
    services.factory('optDB', require('services/optDB.service'));
    return services;

});