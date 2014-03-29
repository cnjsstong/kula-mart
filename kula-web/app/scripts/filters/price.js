angular.module('kulaWebApp')
    .filter('price', function () {
        return function (price) {
            if (!price || price == 0) {
                return 'Free';
            } else {
                return '$' + price;
            }
        };
    });