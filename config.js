app.service('config', function($http){
  var service = this;

  service.membrospaco_url = "http://localhost:1887/membraspaco/#!/login";
  service.api_url = "https://api.uea.splab.ufcg.edu.br";

  service.getConfig = getConfig;

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
