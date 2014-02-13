angular.module('services.upload', [
    'resources'
]);

angular.module('services.upload')
    .factory('UploadService', ['$q', 'API', '$rootScope', 'LoginService', function ($q, API, $rootScope, LoginService) {

        var bucket = new AWS.S3({
            params: {
                Bucket: API.AWS.BucketName
            }
        });
        var fbUserId;

        var allowedFileTypes = ['image/jpeg','image/png'];
        function isFileTypeAllowed(fileType) {
            var res = false;
            for(var i in allowedFileTypes) {
                if(allowedFileTypes[i]==fileType) {
                    res = true;
                }
            }
            return res;
        }

        return {
            upload: function (file) {

                var defer = $q.defer();

                LoginService.getLoginStatus().then(function(res) {
                    bucket.config.credentials = new AWS.WebIdentityCredentials({
                        ProviderId: 'graph.facebook.com',
                        RoleArn: API.AWS.RoleARN,
                        WebIdentityToken: res.authResponse.accessToken
                    });
                    fbUserId = res.authResponse.userID;

                    var fileType = file.type;
                    if(isFileTypeAllowed(fileType)) {
                        var objKey = 'facebook-' + fbUserId + '/' + Date.now();
                        var params = {Key: objKey, ContentType: file.type, Body: file, ACL: 'public-read'};
                        bucket.putObject(params, function (err, data) {
                            if (err) {
                                defer.reject(err);
                            } else {
                                defer.resolve(objKey);
                            }
                        });
                    } else {
                        console.log('File type not allowed.');
                        defer.reject('File type not allowed.');
                    }
                },function() {
                    console.log('Not logged in.');
                    defer.reject('Not logged in.');
                });

                return defer.promise;
            }
        };
    }]);