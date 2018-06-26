function candidateController($scope, $http, $routeParams, $mdToast, $window) {

    function init() {

        if ($routeParams.id) {

            // se for diferente de new busca o registro
            if ($routeParams.id != 'new') {

                $http.get('http://localhost:9000/api/candidates/' + $routeParams.id)
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

            $http.get('http://localhost:9000/api/candidates/termoResponsabilidadeTrue')
                .then(function (response) {
                    $scope.candidates = response.data;
                });
        }
    };

    $scope.save = function () {

        if($scope.userForm.$valid) {

            let user = $scope.user;

            $http({
                method: user.id ? 'PUT' : 'POST',
                url: 'http://localhost:9000/api/candidates' + (user.id ? '/' + user.id : ''),
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