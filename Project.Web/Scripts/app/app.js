var app = angular.module('app', ['personModule', 'ngRoute']);

app.config(function ($routeProvider, $compileProvider) {
    $routeProvider.when('/', {
        templateUrl: 'Person/Index.html'
    })
    .when('/Person/ModalTable', {
        templateUrl: 'Person/ModalTable.html',
        controller: 'personController'
    })
    .when('/Person/DynamicTable',{
        templateUrl: 'Person/DynamicTable.html',
        controller: 'dynamicPersonController'
    });
});
