angular.module('resources', ['ngResource']);

angular.module('resources')
    .constant('API', {
        Client: function () {
            return 'KulaMart Web v' + this.Version + ', Build ' + this.BuildDate + '; ' + this.FeatureString;
        },
        Version: '0.0.1',
        BuildDate: '20140115',
        BuildDateString: 'Jan 15, 2014',
        FeatureString: 'Ashley.',
        ResourceUrl: 'http://inori.sj.gs:3000/',//'http://localhost:3000/',
        Method: {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            OPTIONS: 'OPTIONS'
        },
        FB: {
            AppId: '218438405026655'
        },
        AWS: {
            RoleARN: 'arn:aws:iam::416288670287:role/KulaMart',
            BucketName: 'img.kulamart.com'
        }
    });