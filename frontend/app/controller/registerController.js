function registerController($scope, $http, $window, $mdDialog, $mdToast) {

    $scope.register = function (ev) {

        $http({
            method: 'POST',
            url: 'http://localhost:9000/oapi/signup',
            data: {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password,
                confirm_password: $scope.confirm_password
            }
        }).then(function successCallback(response) {

            $window.location.href = '#/login';

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Usuário cadastrado com sucesso')
                    .position('bottom right')
                    .hideDelay(3000)
            );

        }, function errorCallback(response) {

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#register')))
                    .clickOutsideToClose(true)
                    .title('Ops')
                    .textContent(response.data.errors.join(' '))
                    .ok('Ok')
                    .targetEvent(ev)
            );
        });

    };
}