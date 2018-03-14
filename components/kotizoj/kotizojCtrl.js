app.controller("kotizojCtrl", function ($scope, $rootScope, $window, config,
                                        prihomoService, membrigxiService) {

  $scope.init = function() {
    prihomoService.getLandoj().then(success, error);
  }

  $scope.getKotizoj = function() {
    var getKotizo = function(elemento){
      membrigxiService.getKotizo(elemento.id, $scope.lando.id)
      .then(function(response) {
          elemento.kotizo = response.data[0].prezo/100;
          elemento.junaRabato = response.data[0].junaRabato/100;
          $scope.updateEntuto();
      }, error);
    }

    config.getConfig("idAldonaMembrecgrupo").then(function(response) {
      $scope.idAldonaMembrecgrupo = response.data.idAldonaMembrecgrupo;
      membrigxiService.getGrupKat($scope.idAldonaMembrecgrupo).then(function(response) {
        $rootScope.krommembrecoj = response.data;
        for(var i = 0; i < $rootScope.krommembrecoj.length; i++){
          getKotizo($rootScope.krommembrecoj[i]);
        }
      }, error);
    }, error);

    config.getConfig("idMembrecgrupo").then(function(response) {
      $scope.idMembrecgrupo = response.data.idMembrecgrupo;
      membrigxiService.getGrupKat($scope.idMembrecgrupo).then(function(response) {
        $rootScope.membrecgrupoj = response.data;
        for(var i = 0; i < $rootScope.membrecgrupoj.length; i++){
          getKotizo($rootScope.membrecgrupoj[i]);
        }
      }, error);
    }, error);
  }

  var success = function (response) {
          $scope.landoj = response.data;

      var successIpapi = function(response) {
          var landkodo = response.data.country;
          prihomoService.getInfoPriLanda(landkodo).then(function(response){
            $rootScope.landInformoj = response.data;
          }, error);

          for(var i = 0; i < $scope.landoj.length; i++) {
              if($scope.landoj[i].landkodo.toUpperCase() == landkodo) {
                  $scope.lando = $scope.landoj[i];
                  $scope.getKotizoj();
                  return;
              }
          }
      }

      prihomoService.getIpapi().then(successIpapi, function(error){
        $scope.lando = $scope.landoj[0];
        $scope.getKotizoj();
      });
    }

    $scope.gxisdatigiLandon = function() {
      prihomoService.getInfoPriLanda($scope.lando.landkodo).
      then(function(response){
        $rootScope.landInformoj = response.data;

      });
    };

    var error = function (err) {
      console.log(err);
    };
});
