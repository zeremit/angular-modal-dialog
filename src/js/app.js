var modalApp = angular.module('modalApp', ['ui.bootstrap', 'ui.router', 'spinner', 'angularSpinner', 'staticLoader']);

modalApp.config(['$stateProvider', '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.
            state('site', {
                'abstract': true

            }).
            state('/modal', {
                url:"/modal",
                templateUrl : 'partial/modal.html'
                //controller : 'LoginCtrl'
            }).
            state('/select', {
                url:"/select",
                templateUrl : 'partial/select.html',
                controller : 'SelectCtrl'
            }).
            state('/spinner', {
                url:"/spinner",
                templateUrl : 'partial/spinner.html',
                controller : 'SpinnerCtrl'
            })
        ;

    }
]);