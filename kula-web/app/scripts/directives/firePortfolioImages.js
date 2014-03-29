angular.module('kulaWebApp')
    .directive('firePortfolioImages', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$first) {
                    InitPortfolioImages();
                }
            }
        };
    });

