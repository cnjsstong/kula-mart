angular.module('services.area', [
    'resources',
    'ivpusic.cookie'
]);

angular.module('services.area')
    .factory('AreaService', ['Area', 'ipCookie', function (Area, ipCookie) {
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
            },

            setDefault: function(area) {
                ipCookie('area', area._id, { expires: 365, path: '/' });
            },

            getDefault: function() {
                var id = ipCookie('area');
                ipCookie('area', id, { expires: 365, path: '/' });
                return id;
            }
        };

        return service;
    }]);