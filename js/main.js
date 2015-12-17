require.config({
    paths: {
        ionicBundle:      '../lib/ionic/js/ionic.bundle',
        // angular:          '../lib/ionic/js/angular/angular.min',
        // angularAnimate:   '../lib/ionic/js/angular/angular-animate.min',
        // angularSanitize:  '../lib/ionic/js/angular/angular-sanitize.min',
        // uiRouter:         '../lib/ionic/js/angular-ui/angular-ui-router.min',
        // ionic:            '../lib/ionic/js/ionic.min',
        // ionicAngular:     '../lib/ionic/js/ionic-angular.min',
        ngCordova:        '../lib/ng-cordova-master/dist/ng-cordova.min',
        frostedGlass:     '../lib/ionic-contrib-frostedGlass/ionic.contrib.frostedGlass', 
        text:             '../lib/ionic/js/text',
        md5:              '../lib/md5/md5',
        qrcode:           '../lib/angular-qrcode/qrcode',
        qrcodeUTF8:       '../lib/angular-qrcode/qrcode-utf8',
        angularQrcode:    '../lib/angular-qrcode/angular-qrcode'           
    },
    shim: {
        ionicBundle: {'exports': 'ionicBundle'},
        // angular : {'exports' : 'angular'},
        // angularAnimate : {deps: ['angular']},
        // angularSanitize : {deps: ['angular']},
        // uiRouter : {deps: ['angular']},
        // ionic :  {deps: ['angular'], 'exports' : 'ionic'},
        // ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']},
        ngCordova: {deps: ['ionicBundle'], 'exports' : 'ngCordova'},
        frostedGlass: {deps: ['ionicBundle'], 'exports': 'frostedGlass'},
        md5: {'exports' : 'md5'},
        qrcode: {'exports' : 'qrcode'},
        qrcodeUTF8: {'exports' : 'qrcodeUTF8'},
        angularQrcode: {'exports' : 'angularQrcode'}
    },
    priority: [
         'angular',
         'ionic'
    ],
    deps: [
        'bootstrap'
    ]
});