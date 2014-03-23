angular.module('services.upload', [
    'resources'
]);

angular.module('services.upload')
    .factory('UploadService', ['$fileUploader', 'API', '$rootScope', 'SecurityService', '$dialogs', function ($fileUploader, API, $rootScope, SecurityService, $dialogs) {


        var processors = {
            success: {},
            error: {},
            afteraddingfile: {
                default: function (event, item) {
                    console.info('After adding a file', item);
//                    item.upload();
                }
            }
        };

        var service = {
            uploader: $fileUploader.create({
                url: API.UploadBase + '',
                alias: 'image',
                autoUpload: true,
                filters: [
                    function (item) {
                        if(service.allowedExtensions.indexOf(item.type) == -1) {
                            $dialogs.error('Upload', 'Only *.jpg and *.png files are allowed.')
                            console.log("Only *.jpg and *.png files are allowed.");
                            return false;
                        }
                        if(item.size>service.maxSize) {
                            $dialogs.error('Upload', 'File oversize. Max size: 2MB.')
                            console.log("File oversize. Max size: 2MB.");
                            return false;
                        }
                        return true;
                    }
                ]}),
            allowedExtensions: ['image/jpeg', 'image/png'],
            maxSize: 2000000,
            processor: function (event, type, processor) {
                if (processor) {
                    processors[event][type] = processor;
                } else {
                    return processors[event][type];
                }
            }
        };

        function addNewEvent(event) {
            service.uploader.bind(event, function (a, b, c, d) {
                console.info(a, b, c, d);
                if (c && c.uploadInfo && c.uploadInfo.type) {
                    processors[event][c.uploadInfo.type](a, b, c, d);
                } else {
                    processors[event]['default'](a, b, c, d);
                }
            });
        }

        $rootScope.$on('Security:LoginChecked', function (event, res) {
            console.log('Login Checked', event, res);
            service.uploader.headers['KulaAuth'] = res.email + ' ' + res.token;
        });

        SecurityService.checkLogin();

        for (var ev in processors) {
            addNewEvent(ev);
        }

        return service;
    }]);