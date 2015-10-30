var modalApp = angular.module('modalApp', ['ui.bootstrap', 'ui.router']);

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
            })
        ;

    }
]);