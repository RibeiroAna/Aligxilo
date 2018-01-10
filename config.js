app.service('config', function($http){
  var service = this;

  service.api_url = "http://localhost:3000";

  service.getConfig = getConfig;

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
