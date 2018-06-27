const URL_BACKEND = 'http://localhost:9000/api/'

function candidateController($scope, $http, $routeParams, $mdToast, $window, $mdDialog) {

    function init() {

        if ($routeParams.id) {

            // se for diferente de new busca o registro
            if ($routeParams.id != 'new') {

                $http.get(URL_BACKEND + 'candidates/' + $routeParams.id)
                    .then(function (response) {
                        let candidate = response.data;

                        $scope.user = {
                            'id': candidate._id,
                            'name': candidate.nome,
                            'cpf': candidate.cpf,
                            'phone': candidate.telefone,
                            'address': candidate.endereco,
                            'gender': candidate.sexo,
                            'age': candidate.idade,
                            'tos': candidate.termoResponsabilidade
                        };
                    });

            }
        } else {

            $http.get(URL_BACKEND + 'candidates/termoResponsabilidadeTrue')
                .then(function (response) {
                    $scope.candidates = response.data;
                });
        }
    };

    $scope.save = function (ev) {

        if($scope.userForm.$valid) {

            let user = $scope.user;

            $http({
                method: user.id ? 'PUT' : 'POST',
                url: URL_BACKEND + 'candidates' + (user.id ? '/' + user.id : ''),
                data: {
                    'nome': user.name,
                    'cpf': user.cpf,
                    'telefone': user.phone,
                    'endereco': user.address,
                    'sexo': user.gender,
                    'idade': user.age,
                    'termoResponsabilidade': user.tos
                }
            }).then(function successCallback(response) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent(user.id ? 'Registro atualizado com sucesso' : 'Registro inserido com sucesso')
                        .position('bottom right')
                        .hideDelay(3000)
                );

                $window.location.href = '#/candidate';

            }, function errorCallback(response) {

                let errorsMessage = '';

                if(response.status == 409) {
                    errorsMessage = 'Candidato já cadastrado';
                } else {
                    debugger
                    response.data.errors.forEach(i => {
                        console.log(i)
                    })
                    errorsMessage = response.data.errors;
                }

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#editCandidate')))
                        .clickOutsideToClose(true)
                        .title('Ops')
                        .textContent(errorsMessage)
                        .ok('Ok')
                        .targetEvent(ev)
                );
            });
        } else {

            $scope.userForm.$$setSubmitted();
        }
    };

    $scope.toEdit = function(id) {

        $window.location.href = '#/candidate/' + id;
    };

    $scope.cancelEdit = function () {

        $window.location.href = '#/candidate';
    };

    init();
}