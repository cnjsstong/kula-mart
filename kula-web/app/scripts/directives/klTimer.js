angular.module('kulaWebApp')
    .directive('klTimer', function () {
        return {
            restrict: 'E',
            scope: {
                start: '=start',
                expire: '=expire'
            },
            template: '<div class="row"><div class="cd col-xs-8"></div><div class="col-xs-4 countdown-indicator" ng-class="{later: indicator==\'later\', left: indicator==\'left\'}" ng-bind="indicator"></div></div>',
            link: function (scope, element, attrs) {

                var cd = element.find('.cd');

                function updateTimer() {
                    var now = new Date();
                    if (scope.start && now < new Date(scope.start)) {
                        cd.countdown({until: new Date(scope.start)});
                        scope.indicator = "later";
                    } else if (scope.expire && now < new Date(scope.expire)) {
                        cd.countdown({until: new Date(scope.expire)});
                        scope.indicator = "left";
                    }
                }

                scope.$watch('start', function () {
                    updateTimer();
                });
                scope.$watch('expire', function () {
                    updateTimer();
                });
            }
        }
    });