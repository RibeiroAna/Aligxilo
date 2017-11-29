app.service('config', function($http){
  var service = this;

  service.api_url = "http://localhost:3000";

  $http.get(service.api_url + "/config/idBazaMembreco").then(
    function sucess(response) {
      service.idBazaMembreco = response.data.idBazaMembreco;
    }
  );

  $http.get(service.api_url + "/config/idAldonaMembrecgrupo").then(
    function sucess(response) {
      service.idAldonaMembrecgrupo = response.data.idAldonaMembrecgrupo;
    }
  );
});
