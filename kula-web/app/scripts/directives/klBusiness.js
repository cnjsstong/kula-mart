angular.module('kulaWebApp')
    .directive('klBusiness', ['Post', '$dialogs', 'Account', 'SecurityService', '$FB', '$rootScope', '$filter', function (Post, $dialogs, Account, SecurityService, $FB, $rootScope, $filter) {
        return {
            restrict: 'E',
            scope: {
                business: '=klBusiness'
            },
            templateUrl: 'views/partial/klBusiness.html',
            link: function (scope, element, attrs) {

                scope.ShareFacebook = function () {
                    $FB.ui(
                        {
                            method: 'feed',
                            name: (scope.post.type == 'request' ? 'Requesting' : 'Offering') + scope.post.title + 'for ' + $filter('price')(scope.post.price),
                            link: 'http://kulamart.com/post/' + scope.post._id,
                            picture: 'http://img.kulamart.com.s3.amazonaws.com/' + scope.post.images[0] || 'category/' + scope.post.category,
                            caption: 'KulaMart.com - ' + $rootScope.currentArea.title,
                            description: scope.post.description,
                            message: ''
                        });
                };
            }
        };
    }]);