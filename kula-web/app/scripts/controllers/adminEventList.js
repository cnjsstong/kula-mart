'use strict';

angular.module('kulaWebApp')
    .controller('AdminEventListCtrl', ['$scope', 'Event', 'Category', '$location', function ($scope, Event, Category, $location) {

        function loadEvents() {
            $scope.events = Event.adminQuery();
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadEvents();
        });

        $scope.RemoveEvent = function(event, $index) {
            console.log(event);
            Event.adminDelete({eventId: event._id}, function(){
                $scope.events.splice($index,1);
            })
        };

        $scope.EditEvent = function(event, $index) {
            console.log(event);
            $location.path('/admin/event/'+event._id);
        };
    }]);
