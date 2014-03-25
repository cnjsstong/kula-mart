'use strict';

angular.module('kulaWebApp')
    .controller('PostDetailCtrl', ['$scope', 'Post', '$routeParams', 'CategoryService', '$dialogs', 'Account', '$FB', '$rootScope', '$window', '$filter', function ($scope, Post, $routeParams, CategoryService, $dialogs, Account, $FB, $rootScope, $window, $filter) {
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
                    name: ($scope.post.type=='request'?'Requesting':'Offering') + $scope.post.title + 'for ' + $filter('price')($scope.post.price),
                    link: 'http://kulamart.com/post/' + $scope.post._id,
                    picture: 'http://img.kulamart.com.s3.amazonaws.com/' + $scope.post.images[0] || 'category/' + $scope.post.category,
                    caption: 'KulaMart.com - '+ $rootScope.currentArea.title,
                    description: $scope.post.description,
                    message: ''
                });
        };

        $scope.ShareFacebook2= function(post) {
            var title = encodeURIComponent(post.title);
            var summary = encodeURIComponent(post.description);
            var url = encodeURIComponent('http://kulamart.com/post/' + post._id);
            var share = 'http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + summary + '&p[url]=' + url;
            for(var i in post.images) {
                share += '&p[images]['+i+']='+encodeURIComponent('http://img.kulamart.com.s3.amazonaws.com/' + post.images[i]);
            }
            if(post.images.length==0) {
                share += '&p[images]['+i+']='+encodeURIComponent('http://img.kulamart.com.s3.amazonaws.com/category/' + post.category);
            }
            $window.open(share,'sharer','toolbar=0,status=0,width=548,height=325');
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
