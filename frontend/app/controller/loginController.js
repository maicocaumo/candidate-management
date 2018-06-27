function loginController($scope, loginService, $window, $mdDialog) {

    if (loginService.isAuthenticated()) {
        $scope.userData = loginService.userData;
    }

    $scope.login = function (ev) {

        loginService.authenticate($scope.user, $scope.password, true, function () {

            $scope.userData = loginService.userData;

            $window.location.href = '#/candidate';

        }, function () {

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#login')))
                    .clickOutsideToClose(true)
                    .title('Ops')
                    .textContent("Usuário ou senha inválidos")
                    .ok('Ok')
                    .targetEvent(ev)
            );
        });
    };

    $scope.logout = function () {

        loginService.removeAuthentication();
        $scope.userData = loginService.userData;
    };

    $scope.register = function () {

        $window.location.href = '#/register';
    };
}