angular.module('kulaWebApp')
    .directive('klPost', ['Post', '$dialogs', function (Post, $dialogs) {
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
                });

                scope.Reply = function(post, reply) {
                    Post.reply({postId: post._id}, reply, function(){
                        $dialogs.notify('Confirm', 'Your reply has been sent.');
                    }, function(){
                        $dialogs.notify('Failed', 'Sending failed. Please retry.');
                    });
                }
            }
        };
    }]);