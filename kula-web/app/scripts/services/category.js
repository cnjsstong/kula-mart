angular.module('services.category', [
    'resources'
]);

angular.module('services.category')
    .factory('CategoryService', ['Category', function (Category) {
        var categoryMapping = {};
        var categoryTitleMapping = {};
        var categories = Category.query({}, function () {
            for (var i in categories) {
                if (categories[i].hasOwnProperty('_id')) {
                    categoryMapping[categories[i]._id] = categories[i];
                    categoryTitleMapping[categories[i].title.toLowerCase()] = categories[i];
                }
            }
            console.log(categoryTitleMapping);
        });

        var service = {

            getCategories: function () {
                return categories;
            },

            getCategory: function (categoryId) {
                if (categoryMapping.hasOwnProperty(categoryId)) {
                    return categoryMapping[categoryId];
                } else {
                    return {title: ''};
                }
            },

            getCategoryByTitle: function (title) {
                if (categoryMapping.hasOwnProperty(title)) {
                    return categoryTitleMapping[title];
                } else {
                    return null;
                }
            }
        };

        return service;
    }]);