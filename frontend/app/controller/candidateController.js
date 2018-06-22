function candidateController($scope, $http, $routeParams) {

    if ($routeParams.id) {
        axios.get('http://localhost:9000/api/candidates/' + $routeParams.id)
            .then(function (response) {
                $scope.candidate = response.data;
                $scope.$apply();

                console.log(response.data);
            })

    } else {

        axios.get('http://localhost:9000/api/candidates')
            .then(function (response) {
                $scope.candidates = response.data;
                $scope.$apply();
            })
    }

}
