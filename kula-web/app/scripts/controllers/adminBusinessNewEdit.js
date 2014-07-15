'use strict';

angular.module('kulaWebApp')
    .controller('AdminBusinessNewEditCtrl', ['$scope', 'Business', '$routeParams', '$location', 'Area', 'UploadService', 'API', '$dialogs', function ($scope, Business, $routeParams, $location, Area, UploadService, API, $dialogs) {

        function loadBusiness(businessId) {
            $scope.areas = Area.query()
            console.log(businessId);
            if (businessId) {
                $scope.business = Business.get({businessId: businessId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadBusiness($routeParams.businessId);
        });

        $scope.Submit = function (business) {
            Business.save({businessId: $routeParams.businessId}, business);
            $location.path('/admin/business');
        };

        $scope.GetBusinessPhotoUploadOptions = function () {
            var res = {
                uploadInfo: {
                    type: 'business',
                    scope: $scope
                },
                url: API.UploadBase + 'upload'
            };
            console.log(res);
            return res;
        };

        UploadService.processor('success', 'business', function (event, xhr, item, response) {
            item.uploadInfo.scope.business.photos.push(response.imageId);
        });

        UploadService.processor('error', 'business', function (event, xhr, item, response) {
            $dialogs.error('Upload', 'Upload failed. Please retry.');
        })

    }]);
