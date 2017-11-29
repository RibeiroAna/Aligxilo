app.service('prihomoService', function ($http, config) {
    var service = this;

    service.getLandoj = getLandoj;
    service.getIpapi = getIpapi;
    service.getInfoPriLanda = getInfoPriLanda;

    function getLandoj() {
        return $http.get(config.api_url + "/landoj");
    };

    function getInfoPriLanda(landkodo) {
       return $http.get("https://restcountries.eu/rest/v2/alpha/" + landkodo);
    };

    function getIpapi() {
        return $http.get('https://ipapi.co/json');
    };

    return service;
})
