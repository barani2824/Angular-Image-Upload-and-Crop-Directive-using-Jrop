'use strict';

angular.module('imageCropPOC')
        .controller('MainCtrl', function ($scope, $location) {
            $scope.uploaded = false;
            $scope.uploadSrc = '';
            $scope.setUpload = function (src) {
                $scope.uploaded = true;
                $scope.uploadSrc = src;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            $scope.cropPhoto = function () {
                $location.url("/crop");
            };
        });