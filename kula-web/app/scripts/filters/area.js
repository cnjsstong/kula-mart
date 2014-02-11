angular.module('kulaWebApp')
    .filter('areaTitle', function (AreaService, Area) {
        return function (areas) {
            if (angular.isDefined(areas)) {
                var res= [];
                for(var i in areas) {
                    res.push(AreaService.getArea(areas[i]).title);
                }
                return res.join(', ');
            } else {
                return '';
            }
        };
    });