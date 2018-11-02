app.service('config', function($http){
  var service = this;

  service.api_url = "https://api.uea.org";

  service.getConfig = getConfig;

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
