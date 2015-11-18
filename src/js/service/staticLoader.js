angular.module('staticLoader', []).factory('staticLoader', ['$http', function($http) {
    var service = {
        getType: function () {
            var promise = $http.get('data/type.json');
            return promise;
        }
    };

    return service;
}]);