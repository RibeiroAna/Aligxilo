app.service('config', function($http){
  var service = this;

  service.api_url = "https://api.uea.splab.ufcg.edu.br";

  service.getConfig = getConfig;

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
