// Ionic Starter App

/*global define, require */

define(['angular',
        'ionic',
        'uiRouter',
        'config',
 //       'filters/filters',
        'services/services',
 //       'directives/directives',
        'controllers/controllers',
        'ionicAngular',
        'ngCordova',
        'frostedGlass'
        ],

    function (angular, uiRouter) {
        'use strict';

        var app = angular.module('mmxApp', [
            'ionic',
            'ngCordova',
            'mmx.controllers',
            'mmx.config',
            'ui.router',
//            'mmx.filters',
            'mmx.services',
            'ionic.contrib.frostedGlass'
//            'mmx.directives',
    ]);
    app.run(function($ionicPlatform,$rootScope,$cordovaSQLite) {
      $rootScope.proxyURL = 'http://api.immbear.com';
      $rootScope.account = {hasData: false};
//      $rootScope.curCityId = 1; //设置了默认城市合肥
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        if (window.cordova) {
          if (window.localStorage.getItem('currentUser')) {
            var currentUser = window.localStorage.getItem('currentUser');
            $rootScope.account = {hasData: true};
            $rootScope.userDB = $cordovaSQLite.openDB({ name: "mmx_" + currentUser});
          } else {
            $rootScope.account = {hasData: false};
//           }
//            $rootScope.db = $cordovaSQLite.openDB({ name: "mmx" });
//            $cordovaSQLite.execute($rootScope.db,'DROP TABLE IF EXISTS user');
//            $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS user (id integer primary key, username text, portrait text)");
          }
        }
        });
    });
    app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }]);
        return app;
});
/*
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
*/