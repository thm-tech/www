require.config({
    paths: {
        angular:          '../lib/ionic/js/angular/angular.min',
        angularAnimate:   '../lib/ionic/js/angular/angular-animate.min',
        angularSanitize:  '../lib/ionic/js/angular/angular-sanitize.min',
        uiRouter:         '../lib/ionic/js/angular-ui/angular-ui-router.min',
        ionic:            '../lib/ionic/js/ionic.min',
        ionicAngular:     '../lib/ionic/js/ionic-angular.min',
        ngCordova:        '../lib/ng-cordova-master/dist/ng-cordova.min',
        frostedGlass:     '../lib/ionic-contrib-frostedGlass/ionic.contrib.frostedGlass', 
        text:             '../lib/ionic/js/text',
        md5:              '../lib/md5/md5'        
    },
    shim: {
        angular : {'exports' : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], 'exports' : 'ionic'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']},
        ngCordova: {deps: ['angular'], 'exports' : 'ngCordova'},
        frostedGlass: {deps: ['angular','ionic'], 'exports': 'frostedGlass'},
        md5: {'exports' : 'md5'}
    },
    priority: [
        'angular',
        'ionic'
    ],
    deps: [
        'bootstrap'
    ]
});