'use strict';

angular.module('imageCropPOC')
        .controller('CropimageCtrl', function ($scope, $location) {
            // Handle if there's no image found to crop
            $scope.imageError = function () {
                $location.path('/');
            };

            //$scope.showCanvas = false;
            angular.element('#exportCanvas').show();
            $scope.toggleCanvas = function () {
                if ($scope.showCanvas) {
                    angular.element('#exportCanvas').hide();
                    $scope.showCanvas = false;
                } else {
                    angular.element('#exportCanvas').show();
                    $scope.showCanvas = true;
                }
            };

            $scope.imageFinish = function () {
                /*
                 Remove the existing image
                 */
                var existingImage = angular.element('#crop-image-1').get(0);
                if (typeof (existingImage) !== 'undefined') {
                    existingImage.remove();
                }

                /*
                 Export the canvas into a dataURL
                 */
                var img = new Image();
                img.id = 'crop-image-1';
                img.src = angular.element('#exportCanvas').get(0).toDataURL('image/jpeg');
                img.style.display = 'none';
                angular.element('body').append(img);

                // Forward them to the end
                $location.path('/finish');
            };
        });
