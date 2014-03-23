'use strict';

angular.module('kulaWebApp')
    .controller('PostDetailCtrl', ['$scope', 'Post', '$routeParams', 'CategoryService', '$dialogs', 'Account', '$FB', '$rootScope', function ($scope, Post, $routeParams, CategoryService, $dialogs, Account, $FB, $rootScope) {
        $scope.post = Post.get({postId: $routeParams.postId});
        $scope.Reply = function (post, reply) {
            Post.reply({postId: post._id}, reply, function () {
                $dialogs.notify('Confirm', 'Your reply has been sent.');
            }, function () {
                $dialogs.notify('Failed', 'Sending failed. Please retry.');
            });
        };

        $scope.SaveForLater = function () {
            Account.addFavorite({}, {postId: scope.post._id}, function () {
                $dialogs.notify('Confirm', 'Saved.')
            });
        };

        $scope.ShareFacebook = function () {
            $FB.ui(
                {
                    method: 'feed',
                    name: $scope.post.title,
                    link: 'http://kulamart.com/post/' + $scope.post._id,
                    picture: 'http://img.kulamart.com.s3.amazonaws.com/' + $scope.post.images[0] || 'category/' + $scope.post.category,
                    caption: 'KulaMart.com - '+ $rootScope.currentArea.title,
                    description: $scope.post.description,
                    message: ''
                });
        };

        $scope.ImageModal = function () {
            var dlg = $dialogs.create('views/partial/klImages.html', 'PostDetailImageModalCtrl', {post: $scope.post}, {windowClass: 'wide', backdrop: 'static'});
        };
    }])
    .controller('PostDetailImageModalCtrl', ['$scope', '$modalInstance', 'data', '$timeout', function ($scope, $modalInstance, data, $timeout) {
        $scope.post = data.post;
        $scope.index = 0;

        $scope.Previous = function () {
            if ($scope.index > 0) $scope.index--;
        };

        $scope.Next = function () {
            if ($scope.index < $scope.post.images.length - 1) $scope.index++;
        };

        $scope.CloseModal = function () {
            $modalInstance.close();
        }
    }]);
