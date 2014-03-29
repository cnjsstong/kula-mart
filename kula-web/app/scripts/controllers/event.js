angular.module('kulaWebApp')
    .controller('EventCtrl', ['$scope', 'Event', '$routeParams', 'CategoryService', '$dialogs', 'Account', '$FB', '$rootScope', '$window', '$filter', function ($scope, Event, $routeParams, CategoryService, $dialogs, Account, $FB, $rootScope, $window, $filter) {
        $scope.event = Event.get({eventId: $routeParams.eventId});

        $scope.ShareFacebook = function () {
            $FB.ui(
                {
                    method: 'feed',
                    name: $scope.event.title,
                    link: 'http://kulamart.com/event/' + $scope.event._id,
                    picture: 'http://img.kulamart.com.s3.amazonaws.com/' + $scope.event.images[0] || 'placeholder.png',
                    caption: 'KulaMart.com - ' + $rootScope.currentArea.title,
                    description: $scope.event.description,
                    message: ''
                });
        };

        $scope.ImageModal = function () {
            var dlg = $dialogs.create('views/partial/klImages.html', 'EventImageModalCtrl', {event: $scope.event}, {windowClass: 'wide', backdrop: 'static'});
        };
    }])
    .controller('EventImageModalCtrl', ['$scope', '$modalInstance', 'data', '$timeout', function ($scope, $modalInstance, data, $timeout) {
        $scope.images = data.event.images;
        $scope.title = data.event.title;
        $scope.index = 0;

        $scope.Previous = function () {
            if ($scope.index > 0) $scope.index--;
        };

        $scope.Next = function () {
            if ($scope.index < $scope.images.length - 1) $scope.index++;
        };

        $scope.CloseModal = function () {
            $modalInstance.close();
        }
    }]);
