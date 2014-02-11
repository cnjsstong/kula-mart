angular.module('services.area', [
    'resources'
]);

angular.module('services.area')
    .factory('AreaService', ['Area', function (Area) {
        var areaMapping = {};
        var areas = Area.query({},function(){
            for(var i in areas) {
                areaMapping[areas[i]._id] = areas[i];
            }
            console.log(areaMapping);
        });

        console.log(areaMapping);

        var service = {
            getArea: function(areaId) {
                if(areaMapping.hasOwnProperty(areaId)) {
                    return areaMapping[areaId];
                } else {
                    return '';
                }
            }
        };

        return service;
    }]);