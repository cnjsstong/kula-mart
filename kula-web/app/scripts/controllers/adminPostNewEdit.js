'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', 'Area', '$routeParams', '$location', 'UploadService', '$window', 'Predefined', 'API', '$dialogs', '$rootScope', function ($scope, Post, Category, Area, $routeParams, $location, UploadService, $window, Predefined, API, $dialogs, $rootScope) {


        function loadPost(postId) {
            $scope.categories = Category.query();
            $scope.areas = Area.query();
            $scope.tags = Predefined.query({type: 'tag'});
            $scope.deliveries = Predefined.query({type: 'delivery'});
            $scope.post = { images: [], email: $rootScope.GetUser('email') };
            if($scope.post.email.indexOf('@facebookusers.kulamart.com')!=-1) {
                $scope.post.email = '';
            }
            $scope.step = 0;
            if (postId) {
                $scope.post = Post.get({postId: postId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPost($routeParams.postId);
        });

        $scope.Submit = function (post) {
            Post.save({postId: $routeParams.postId}, post, function (res) {
//                console.log('DDDDDDDDDDDDDDD', res);
                $location.path('/post/' + res._id);
            });
        };

        $scope.GetPostUploadOptions = function () {
            var res = {
                uploadInfo: {
                    type: 'post',
                    scope: $scope
                },
                url: API.UploadBase + 'upload'
            };
            console.log(res);
            return res;
        };

        $scope.AddTag = function (tag) {
            if ($scope.post.tags.indexOf(tag.title) < 0) {
                $scope.post.tags.push(tag.title.toLowerCase());
            }
        };

        $scope.Lower = function($tag) {
            $scope.post.tags[$scope.post.tags.indexOf($tag)] = $tag.toLowerCase();
        };

        UploadService.processor('success', 'post', function (event, xhr, item, response) {
            item.uploadInfo.scope.post.images.push(response.imageId);
        });

        UploadService.processor('error', 'post', function (event, xhr, item, response) {
            $dialogs.error('Upload', 'Upload failed. Please retry.');
        })

    }]);
