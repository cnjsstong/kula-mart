'use strict';

angular.module('kulaWebApp')
    .controller('AdminEventNewEditCtrl', ['$scope', 'Event', 'Category', 'Area', '$routeParams', '$location', 'UploadService', '$window', 'Predefined', 'API', '$dialogs', '$rootScope', function ($scope, Event, Category, Area, $routeParams, $location, UploadService, $window, Predefined, API, $dialogs, $rootScope) {


        function loadEvent(eventId) {
            $scope.areas = Area.query();
            $scope.tags = Predefined.query({type:'tag'});
            $scope.event = { images: [], email: $rootScope.GetUser('email') };
            if (eventId) {
                $scope.event = Event.get({eventId: eventId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadEvent($routeParams.eventId);
        });

        $scope.Submit = function (event) {
            Event.save({eventId: $routeParams.eventId}, event);
//            $window.history.back();
        };

        $scope.GetEventUploadOptions = function () {
            var res = {
                uploadInfo: {
                    type: 'event',
                    scope: $scope
                },
                url: API.UploadBase+'upload'
            };
            console.log(res);
            return res;
        };
//
//        $scope.AddTag = function(tag) {
//            if($scope.event.tags.indexOf(tag.title)<0) {
//                $scope.event.tags.push(tag.title);
//            }
//        };

        UploadService.processor('success', 'event', function (event, xhr, item, response) {
            item.uploadInfo.scope.event.images.push(response.imageId);
        });

        UploadService.processor('error', 'event', function(event, xhr, item, response) {
            $dialogs.error('Upload', 'Upload failed. Please retry.');
        })

    }]);
