/*global define, require, console, cordova, navigator */

define(['app','routes'], function (app) {
    'use strict';
console.log(app);
    var $html,
        onDeviceReady = function () {
            angular.bootstrap(document, [app.name]);
        };

    document.addEventListener("deviceready", onDeviceReady, false);

    if (typeof cordova === 'undefined') {
        $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function () {
            try {
                console.log(app.name);
                angular.bootstrap(document,[app.name]);
            } catch (e) {
                console.error(e.stack || e.message || e);
            }
        });
    }
    
});