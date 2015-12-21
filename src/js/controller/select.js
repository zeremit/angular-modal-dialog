angular.module('sampleApp').controller('SelectCtrl',['staticLoader', '$scope', function(staticLoader, $scope){
    $scope.types = [];
    staticLoader.getType().success(function (data) {
        $scope.types = data;
    });
}]);