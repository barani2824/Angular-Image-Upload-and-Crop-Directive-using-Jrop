'use strict';

angular.module('imageCropPOC')
        .controller('FinishCtrl', function ($scope, $location) {
        var source = angular.element('#crop-image-1').get(0);
            if (typeof (source) !== 'undefined') {
                console.log(source.src);
                $scope.imgSrc = source.src;
            } else {
                $location.path('/');
            }
        }
        );