'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', 'Area', '$routeParams', '$location', 'UploadService', '$window', 'Predefined', 'API', '$dialogs', function ($scope, Post, Category, Area, $routeParams, $location, UploadService, $window, Predefined, API, $dialogs) {


        function loadPost(postId) {
            $scope.categories = Category.query();
            $scope.areas = Area.query();
            $scope.deliveries = Predefined.query({type: 'delivery'});
            $scope.post = { images: [] };
            $scope.step = 0;
            if (postId) {
                $scope.post = Post.get({postId: postId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPost($routeParams.postId);
        });

        $scope.Submit = function (post) {
            Post.save({postId: $routeParams.postId}, post);
            $window.history.back();
        };

        $scope.GetPostUploadOptions = function () {
            var res = {
                uploadInfo: {
                    type: 'post',
                    scope: $scope
                },
                url: API.UploadBase+'upload'
            };
            console.log(res);
            return res;
        };

        UploadService.processor('success', 'post', function (event, xhr, item, response) {
            item.uploadInfo.scope.post.images.push(response.imageId);
        });

        UploadService.processor('error', 'post', function(event, xhr, item, response) {
            $dialogs.error('Upload', 'Upload failed. Please retry.');
        })

    }]);
