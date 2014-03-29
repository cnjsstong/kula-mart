angular.module('kulaWebApp')
    .directive('fireAutoCarousel', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var pause = false;
                element.mouseenter(function () {
                    pause = true;
                });
                element.mouseleave(function () {
                    pause = false;
                });
                var timer = setInterval(function () {
                    if (!pause) {
                        element.carousel('next');
                    }
                }, 3000);
            }
        };
    });