app.service('membrigxiService', function ($http, config) {
    var service = this;

    service.getKotizo = getKotizo;
    service.getMemreco = getMembreco;
    service.getGrupKat = getGrupKat;


    function getKotizo(idMembreco, idLando) {
        return $http.get(config.api_url + "/grupoj/" + idMembreco + "/kotizoj?idLando=" + idLando);
    }

    function getGrupKat(idKat) {
        return $http.get(config.api_url + "/grupoj/kategorioj/" + idKat + "/sub");
    }

    function getMembreco(idMembreco) {
        return $http.get(config.api_url + "/grupoj/" + idMembreco);
    }
    return service;
});
