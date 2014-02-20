angular.module('kulaWebApp')
    .directive('fireCarousel', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                fireCarouFredSel(element);
            }
        };
    });