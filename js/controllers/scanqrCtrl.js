define(function() {
    'use strict';
    function scanqrCtrl($scope,$cordovaBarcodeScanner) {
        $scope.name = 'this is scanqr';
        $cordovaBarcodeScanner
              .scan()
              .then(function(barcodeData) {
                alert(barcodeData.text);        
              }, function(error) {
                // An error occurred
                alert('error');
        });
        // $cordovaBarcodeScanner
        //       .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.baidu.com")
        //       .then(function(res) {
        //         // Success!
        //             alert(res);
        //       }, function(error) {
        //         // An error occurred
        //       });

    }
    scanqrCtrl.$inject = ['$scope','$cordovaBarcodeScanner'];
    return scanqrCtrl;
});