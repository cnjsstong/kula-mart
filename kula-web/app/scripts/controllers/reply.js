'use strict';

angular.module('kulaWebApp')
    .controller('ReplyCtrl', ['$scope', 'Post', '$routeParams', '$dialogs', '$location', function ($scope, Post, $routeParams, $dialogs, $location) {
        $scope.reply = Post.getReply({replyId: $routeParams.replyId});
        $scope.Respond = function (respond, reply) {
            Post.respond({replyId: $routeParams.replyId}, respond, function () {
                $dialogs.notify('Confirm', 'You respond have been sent.');
                $location.path('/');
            }, function(){
                $dialogs.notify('Failed', 'Sending failed. Please retry.');
            });
        }
    }]);
