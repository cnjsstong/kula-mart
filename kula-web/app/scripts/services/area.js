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
        });

        var service = {
            getArea: function(areaId) {
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