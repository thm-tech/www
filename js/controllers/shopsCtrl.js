define(function() {
    'use strict';
    function shopsCtrl($scope,$location,$cordovaBarcodeScanner) {
        $scope.name = 'this is shop';
        var self = this;
        self.shops = $scope.shops = {};

        self.shops.search = function() {
            $location.path('/mmx/shops/search');
        };

        self.shops.scan = function() {
            $cordovaBarcodeScanner
                  .scan()
                  .then(function(barcodeData) {
                    alert(barcodeData.text);        
                  }, function(error) {
                    // An error occurred
                    alert('error');
            });
        };
    }
    shopsCtrl.$inject = ['$scope','$location','$cordovaBarcodeScanner'];
    return shopsCtrl;
});