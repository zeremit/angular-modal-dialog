var modalApp = angular.module('modalApp', ['ui.bootstrap', 'ui.router', 'staticLoader']);

modalApp.config(['$stateProvider', '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.
            state('site', {
                'abstract': true

            }).
            state('/', {
                url:"/",
                templateUrl : 'partial/modal.html'
                //controller : 'LoginCtrl'
            }).
            state('/select', {
                url:"/select",
                templateUrl : 'partial/select.html',
                controller : 'SelectCtrl'
            })
        ;

    }
]);