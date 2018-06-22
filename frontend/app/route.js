module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/candidate', {
            templateUrl: 'candidate/list.html',
            controller: candidateController
        })
        .when('/candidate/:id', {
            templateUrl: 'candidate/edit.html',
            controller: candidateController
        })
        .otherwise({redirectTo: '/'});
}]);