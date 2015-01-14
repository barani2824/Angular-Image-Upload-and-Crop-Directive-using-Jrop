
'use strict';

angular.module('imageCropPOC')
        .directive('cropimage', function () {
            return {
                replace: true,
                scope: {
                    src: '=',
                    onload: '&',
                    imageError: '&'
                },
                restrict: 'A',
                link: function postLink(scope, element, attr) {

                    var targetImage;
                    var aspectRatio = attr.aspectRatio;
                    var minWidth = attr.minWidth;
                    var minHeight = attr.minHeight;
                    var maxWidth = attr.maxWidth || 0;
                    var maxHeight = attr.maxHeight || 0;
                    scope.clear = function () {
                        if (targetImage) {
                            targetImage.find('img').remove();
                            targetImage.remove();
                            targetImage = undefined;
                            element.removeData('crop-data');
                        }
                    };

                    scope.setupJCrop = function (targetImage, selection, imgWidth, imgHeight, cropCallback) {

                        jQuery(targetImage).Jcrop({
                            aspectRatio: 0,
                            minSize: [minWidth, minHeight],
                            maxSize: [maxWidth, maxHeight],
                            trackDocument: true,
                            onSelect: function (coords) {
                                element.data('crop-data', coords);
                                jQuery('.jcrop-viewport').css({
                                    opacity: 1.0,
                                    backgroundColor: ''
                                });

                                if (typeof (cropCallback) === 'function') {
                                    cropCallback(coords);
                                }
                            },
                            boxWidth: 400,
                            boxHeight: 400,
                            setSelect: selection,
                            trueSize: [imgWidth, imgHeight],
                            allowSelect: false
                        });

                    };

                    scope.setup = function (sourceUrl, cropCallback) {

                        var temp = new Image();
                        temp.src = sourceUrl;
                        temp.onload = function () {
                            var imgWidth = this.width;
                            var imgHeight = this.height;
                            var incoming = jQuery(element).data('crop-data');
                            var selection = [0, 0, (imgHeight / imgWidth < 0.75) ? 0.75 * imgWidth : imgWidth, (imgHeight / imgWidth > 0.75) ? 0.75 * imgHeight : imgHeight];
                            if (typeof (incoming) !== 'undefined') {
                                selection = [
                                    incoming.x,
                                    incoming.y,
                                    incoming.x + incoming.w,
                                    incoming.y + incoming.h
                                ];
                            }

                            scope.setupJCrop(targetImage, selection, imgWidth, imgHeight, cropCallback);

                            setTimeout(function () {
                                scope.$apply('onload()');
                            }, 800);
                        };

                        temp.onerror = function () {
                            jQuery('#imageUnavailable').show();
                            jQuery('#change-photo-modal').modal('show');
                        };
                    };

                    var encodedImage = angular.element(document).find('#full-user-image').attr('src');
                    if (typeof (encodedImage) === 'undefined') {
                        scope.imageError();
                    } else {

                        element.html('');
                        scope.clear();

                        element.append('<img />');
                        targetImage = element.find('img');
                        targetImage.attr('src', encodedImage);

                        var img = document.createElement('img');
                        img.id = 'pic';
                        img.src = encodedImage;
                        img.onload = function () {
                            var sourceCanvas = document.createElement('canvas');
                            sourceCanvas.width = img.width;
                            sourceCanvas.height = img.height;
                            sourceCanvas.style.display = 'none';
                            sourceCanvas.id = 'sourceCanvas';
                            var exportCanvas = document.createElement('canvas');
                            exportCanvas.id = 'exportCanvas';
                            exportCanvas.style.display = 'none';
                            exportCanvas.style.margin = '20px 0px';
                            exportCanvas.width = 500;
                            exportCanvas.height = 350;
                            element.append(exportCanvas);
                            var ctx = sourceCanvas.getContext('2d');
                            ctx.clearRect(0, 0, 500, 350);
                            ctx.drawImage(img, 0, 0, img.width, img.height);
                            scope.setup(encodedImage, function (c) {
                                var exportCanvas = document.getElementById('exportCanvas').getContext('2d');
                                exportCanvas.fillStyle = 'rgb(255,255,255)';
                                exportCanvas.fillRect(0, 0, 500, 350);
                                var w = c.x2 - c.x, h = c.y2 - c.y, prevImgHeight = element.find(".jcrop-tracker").height(), prevImgWidth = element.find(".jcrop-tracker").width();
                                exportCanvas.drawImage(sourceCanvas, c.x, c.y, w, h, 0, 0, prevImgWidth, prevImgHeight);
                            });
                        };
                    }
                }
            };
        });
