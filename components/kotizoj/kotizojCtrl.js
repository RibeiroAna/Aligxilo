app.controller("kotizojCtrl", function ($scope, $rootScope, $window, config, 
  prihomoService, membrigxiService) {

  $scope.init = function() {
    prihomoService.getLandoj().then(function(response) {
      $scope.landoj = response.data;
    });
    
    var katA = getKategorioj("idMembrecgrupo");
    var katB = getKategorioj("idAldonaMembrecgrupo");
    Promise.all([katA, katB]).then(function(values){
      $scope.kategorioj = values[0].concat(values[1]);
    });

    function getKategorioj(nomo){
      return config.getConfig(nomo).then(function(response) {
        var id = response.data[nomo];
        return membrigxiService.getGrupKat(id).then(function(response) {
          var kategorioj = response.data;
          for(var i = 0; i < kategorioj.length; i++){
            getKotizo(kategorioj[i]);
          }
          return kategorioj;
        });
      });
    }

    function getKotizo(kategorio) {
      membrigxiService.getKotizoj(kategorio.id).then(function(response){
        kategorio.kotizoj = new Map();
        response.data.map(function(e){
          kategorio.kotizoj[e.idLando] = e.prezo;
         });
      });
    }
  }
});
