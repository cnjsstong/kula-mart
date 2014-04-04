angular.module('kulaWebApp')
    .directive('klPost', ['Post', '$dialogs', 'Account', 'SecurityService', '$FB', '$rootScope', '$filter', function (Post, $dialogs, Account, SecurityService, $FB, $rootScope, $filter) {
        return {
            restrict: 'E',
            scope: {
                postId: '=klPostId',
                currentUser: '=klCurrentUser',
                postList: '=klPostList',
                postIndex: '=klPostIndex',
                postSaved: '=klPostSaved'
            },
            templateUrl: 'views/partial/klPost.html',
            link: function (scope, element, attrs) {
                scope.$watch('postId', function (newValue) {
                    if (newValue) {
                        scope.post = Post.get({postId: scope.postId});
                        scope.post.expanded = false;
                    }
                });

                scope.Reply = function (post, reply) {
                    Post.reply({postId: post._id}, reply, function () {
                        $dialogs.notify('Confirm', 'Your reply has been sent.');
                    }, function () {
                        $dialogs.notify('Failed', 'Sending failed. Please retry.');
                    });
                };

                scope.ActionsType = function () {
                    if (scope.post && scope.post.status != 'active') {
                        return 0;
                    }
                    if (!SecurityService.isAuthenticated()) {
                        return 4;
                    }
                    if (scope.currentUser && scope.post && scope.post.author && scope.post.author == scope.currentUser) {
                        return 2;
                    } else {
                        return 1;
                    }
                };

                scope.DeletePost = function () {
                    Post.delete({postId: scope.post._id}, function () {
                        $dialogs.notify('Confirm', 'Deleted.');
                        scope.postList.splice(scope.postIndex, 1);
                    })
                };

                scope.ExpirePost = function () {
                    Post.expire({postId: scope.post._id}, {}, function () {
                        $dialogs.notify('Confirm', 'Set as expired.');
                        scope.post.status = 'closed';
                    })
                };

                scope.SaveForLater = function () {
                    Account.addFavorite({}, {postId: scope.post._id}, function () {
                        $dialogs.notify('Confirm', 'Saved.')
                    });
                };

                scope.ImageModal = function () {
                    if (scope.post.images.length > 0) {
                        var dlg = $dialogs.create('views/partial/klImages.html', 'PostDetailImageModalCtrl', {post: scope.post}, {windowClass: 'wide', backdrop: 'static'});
                    }
                };


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