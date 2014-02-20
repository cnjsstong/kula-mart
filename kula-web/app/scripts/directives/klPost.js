angular.module('kulaWebApp')
    .directive('klPost', function (Post) {
        return {
            restrict: 'E',
            scope: {
                postId: '=klPostId'
            },
            templateUrl: 'views/partial/klPost.html',
            link: function (scope, element, attrs) {
                scope.$watch('postId',function(newValue) {
                    if(newValue) {
                        scope.post = Post.get({postId: scope.postId});
                    }
                })
            }
        };
    });