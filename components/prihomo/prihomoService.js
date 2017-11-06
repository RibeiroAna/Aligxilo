app.service('prihomoService', function ($http, config) {
    var service = this;

    service.getLandoj = getLandoj;
    service.getIpapi = getIpapi;

    function getLandoj() {
        return $http.get(config.api_url + "/landoj");
    };


    function getIpapi() {
        return $http.get('https://ipapi.co/json');
    };

    return service;
})