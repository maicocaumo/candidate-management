module = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .controller('candidateController', candidateController)
    .controller('registerController', registerController)
    .service('loginService', loginService)
    .factory('AuthInterceptor', AuthInterceptor)
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
;