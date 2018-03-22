app.service('prihomoService', function ($http, config) {
    var service = this;

    service.getLandoj = getLandoj;
    service.getIpapi = getIpapi;
    service.getInfoPriLanda = getInfoPriLanda;
    service.doEnsaluti = doEnsaluti;
    service.getEkzistantaRetposxto = getEkzistantaRetposxto;
    service.getUzanto = getUzanto;

    function getUzanto(id, token) {
      var req = {
          method: 'GET',
          url: config.api_url + '/uzantoj/' + id,
          headers: {'x-access-token': token}
      };
      return $http(req);
    }

    function getLandoj() {
        return $http.get(config.api_url + "/landoj");
    };

    function doEnsaluti(data){
  		return $http.post(config.api_url + '/uzantoj/ensaluti', data);
  	}

    function getInfoPriLanda(landkodo) {
       return $http.get("https://restcountries.eu/rest/v2/alpha/" + landkodo);
    };

    function getIpapi() {
        return $http.get('https://ipapi.co/json');
    };

    function getEkzistantaRetposxto(data) {
      return $http.get(config.api_url + "/uzantoj/cxuMembro/" + data);
    }

    return service;
});
