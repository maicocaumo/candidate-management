function loginService($http) {

    function saveData(dataAuth) {
        removeData();
        localStorage.setItem('auth_data', JSON.stringify(dataAuth));
    }
    
    function getData() {
        return JSON.parse(localStorage.getItem('auth_data'));
    }

    function removeData() {
        localStorage.removeItem('auth_data');
    }

    function retrieveSavedData() {
        if (getData()) {
            setHttpAuthHeader();
        }
    }

    function getToken() {
        return getData().token;
    }

    function setHttpAuthHeader() {
        $http.defaults.headers.common.Authorization = getToken();
    }

    this.isAuthenticated = function () {

        let data = getData();

        if (!data || !(data.isAuthenticated)) {
            try {
                retrieveSavedData();
            } catch (e) {
                return false;
            }
        }

        return true;
    };

    this.removeAuthentication = function () {
        removeData();
        $http.defaults.headers.common.Authorization = null;
    };

    this.authenticate = function (username, password, persistData, successCb, errorCb) {
        this.removeAuthentication();

        $http({
            method: 'POST',
            url: 'http://localhost:9000/oapi/login',
            data: {
                email: username,
                password: password
            }
        }).then(function successCallback(response) {

            let dataAuth = {
                    'isAuthenticated': true,
                    'username': response.data.name,
                    'token': response.data.token
                }
            ;

            if (persistData === true) {
                saveData(dataAuth);
            }

            setHttpAuthHeader();

            if (typeof successCallback === 'function') {
                successCb();
            }

        }, function errorCallback(response) {

            if (typeof errorCallback === 'function') {
                if (response && response.error_description) {
                    errorCb(response.error_description);
                } else {
                    errorCb('Unable to contact server; please, try again later.');
                }
            }
        });
    };


    retrieveSavedData();
}