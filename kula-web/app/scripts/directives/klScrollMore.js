angular.module('kulaWebApp')
    .directive('klScrollMore', function ($document) {

        return {

            restrict: 'A',

            link: function (scope, element, attr) {
                $document.bind('scroll', function () {
                    if ($document.scrollTop() + $(window).height()>= $document.height()) {
                        scope.$apply(attr.klScrollMore);
                    }
                });
            }

        };
    });
