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

  // service.idAdministranto = Object.values(getIdAdministranto())[0];
  // service.junaAgxo = Object.values(getJunaAgxo())[0];
  // service.idBazaMembreco = Object.values(getIdBazaMembreco())[0];
  //
  // function getIdAdministranto() {
  //   return $http.get(service.api_url + "/config/idAdministranto");
  // }
  //
  // function getJunaAgxo() {
  //   return $http.get(service.api_url + "/config/junaAgxo");
  // }
  //
  // function getIdBazaMembreco() {
  //   console.log($http.get(service.api_url + "/config/idBazaMembreco"));
  //   return $http.get(service.api_url + "/config/idBazaMembreco");
  // }
});
