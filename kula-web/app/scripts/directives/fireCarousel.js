angular.module('kulaWebApp')
    .directive('fireCarousel', function () {
        return {
            restrict: 'A',
            scope: {
                bg: '=fireCarouselBg',
                last: '=fireCarousel'
            },
            link: function (scope, element, attrs) {
                element.css('background-image', "url(http://img.kulamart.com.s3.amazonaws.com/" + (scope.bg || 'placeholder.png') + ")");
                if (scope.last) {
                    fireCarouFredSel(element.parent());
                }
            }
        };
    });