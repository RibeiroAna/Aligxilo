app.service('membrigxiService', function ($http) {
    var service = this;

    service.getKotizajPeto = getKotizajPeto;
    service.getAldonoj = getAldonoj;


    function getKotizajPeto(idMembreco, idLando) {
        return $http.get(config.api_url + "/grupoj/" + idMembreco + "/kotizoj?idLando=" + idLando);
    }
    
    function getAldonoj() {
        return $http.get(config.api_url + "/grupoj/membrecoj/aldonoj");
    }



    return service;

});