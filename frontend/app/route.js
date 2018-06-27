module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/candidate', {
            templateUrl: 'app/view/candidate/list.html',
            controller: candidateController
        })
        .when('/candidate/:id', {
            templateUrl: 'app/view/candidate/edit.html',
            controller: candidateController
        })
        .otherwise({redirectTo: '/candidate'});
}]);