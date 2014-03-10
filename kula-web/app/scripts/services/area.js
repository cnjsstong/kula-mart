angular.module('services.area', [
    'resources'
]);

angular.module('services.area')
    .factory('AreaService', ['Area', function (Area) {
        var areaMapping = {};
        var areaTitleMapping = {};
        var areas = Area.query({},function(){
            for(var i in areas) {
                if(areas[i].hasOwnProperty('_id')) {
                    areaMapping[areas[i]._id] = areas[i];
                    areaTitleMapping[areas[i].title.toLowerCase()] = areas[i];
                }
            }
            console.log(areaMapping, areaTitleMapping);
        });

        var service = {

            getAreas: function() {
                return areas;
            },

            getArea: function(areaId) {
//                console.log(areaMapping, areaId, areaMapping[areaId]);
                if(areaMapping.hasOwnProperty(areaId)) {
                    return areaMapping[areaId];
                } else {
                    return {title: ''};
                }
            },

            getAreaByTitle: function(title) {
                if(areaMapping.hasOwnProperty(title)) {
                    return areaTitleMapping[title];
                } else {
                    return null;
                }
            }
        };

        return service;
    }]);