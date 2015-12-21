app.controller('SpinnerCtrl',['$scope', function($scope){

    $scope.runSpinner = function(){
        $scope.showSpinner = true;
    };

    $scope.stopSpinner = function(){
        $scope.showSpinner = false;
    }

}]);