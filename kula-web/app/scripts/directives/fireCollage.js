angular.module('kulaWebApp')
    .directive('fireCollage', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.log(scope.$last);
                if(scope.$last) {
                    InitImageHover();
                    collage();
                }
            }
        };
    });