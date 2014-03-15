angular.module('kulaWebApp')
    .filter('typeTitle', function () {
        return function (type) {
            if (type == 0) {
                return 'Admin';
            }
            if (type == 30) {
                return 'Customer';
            }
        };
    });