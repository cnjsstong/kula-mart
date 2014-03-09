angular.module('kulaWebApp')
    .directive('fireAutoCarousel', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
//                $('.dropdown-toggle').click(function() {
//                    $(this).next('.dropdown-menu').fadeToggle(500);
//                });
            }
        };
    });