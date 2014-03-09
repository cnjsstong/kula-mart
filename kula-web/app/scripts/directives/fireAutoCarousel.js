angular.module('kulaWebApp')
    .directive('fireAutoCarousel', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var timer = setInterval(function(){
                    element.carousel('next');
                }, 3000);
            }
        };
    });