var app = angular.module('modalApp', ['ui.bootstrap', 'ui.router', 'angularSpinner', 'staticLoader', 'door3.css', 'ngDialog']).config(['$stateProvider', '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.
            state('site', {
                'abstract': true

            }).
            state('modal', {
                url:"/modal",
                templateUrl : 'partial/modal.html'
                //controller : 'LoginCtrl'
            }).
            state('modal/bootstrap', {
                url:"/modal/bootstrap",
                templateUrl : 'partial/modal/bootstrap.html',
                css: 'css/bootstrap.min.css'
                //controller : 'LoginCtrl'
            }).
            state('modal/ngdialog', {
                url:"/modal/ngdialog",
                templateUrl : 'partial/modal/ngdialog.html',
                css: ['css/ngDialog.css','css/ngDialog-theme-plain.css']
                //controller : 'LoginCtrl'
            }).
            state('select', {
                url:"/select",
                templateUrl : 'partial/select.html',
                controller : 'SelectCtrl'
            }).
            state('spinner', {
                url:"/spinner",
                templateUrl : 'partial/spinner.html',
                controller : 'SpinnerCtrl'
            }).
            state('home', {
                url:"/",
                templateUrl : 'partial/home.html'
            })
        ;

    }
]);