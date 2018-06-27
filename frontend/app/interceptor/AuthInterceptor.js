function AuthInterceptor ($location, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            if (localStorage.getItem('auth_data')) {
                config.headers['Authorization'] = JSON.parse(localStorage.getItem('auth_data')).token;
            }

            return config;
        },

        responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
                $location.path('/signin');
            }

            return $q.reject(response);
        }
    }
}