(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'firebase'])
        .config(routeConfig)
        .constant('toastr', toastr);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/html/components/index/index.html',
                controller: 'index',
                controllerAs: 'index'
            })
            .otherwise({redirectTo: '/'});
    }
})();