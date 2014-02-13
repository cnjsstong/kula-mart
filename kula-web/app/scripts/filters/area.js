angular.module('kulaWebApp')
    .filter('areasTitle', function (AreaService) {
        return function (areas) {
            if (angular.isDefined(areas)) {
                var res= [];
                for(var i in areas) {
                    res.push(AreaService.getArea(areas[i]).title);
                }
                return res.join(', ') || areas;
            } else {
                return areas;
            }
        };
    })
    .filter('areaTitle', function (AreaService) {
        return function (area) {
            if (angular.isDefined(area)) {
                return AreaService.getArea(area).title || area;
            } else {
                return area;
            }
        };
    });