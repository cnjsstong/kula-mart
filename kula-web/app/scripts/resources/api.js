var resources = angular.module('resources', ['ngResource']);

resources.constant('API', {
    FotoClient: function () {
        return 'KulaMart Web v'+this.Version+', Build '+this.BuildDate+'; '+this.FeatureString;
    },
    Version: '0.0.1',
    BuildDate: '20140115',
    BuildDateString: 'Jan 15, 2014',
    FeatureString: 'Ashley.',
    ResourceUrl: 'http://localhost:3000/',
    Method: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        OPTIONS: 'OPTIONS'
    }
});