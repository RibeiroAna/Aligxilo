app.controller("membrigxiCtrl", function ($scope, $rootScope, $window, config, membrigxiService, prihomoService) {

  $scope.init = function () {
    $scope.jaro = parseInt((new Date()).getFullYear());
    $rootScope.entuto = 0;
    $rootScope.kanuto = false;
    prihomoService.getLandoj().then(success, error);
    $scope.jaroj = 1;

    if(!$rootScope.uzanto) {
      $rootScope.uzanto = {};
    }

    if(!$rootScope.jaroj) {
      $scope.jaroj = 1;
      $rootScope.jaroj = 1;
      $rootScope.mj = [];
      $rootScope.mj[0] = true;
    } else {
      $scope.jaroj = $rootScope.jaroj;
    }

    if(!$rootScope.agxo) {
      $rootScope.agxo = 26;
    }  

    $scope.updateEntuto();
  }

  $scope.updateAgxo = function() {
    if($rootScope.agxo <= 19) {
      $rootScope.r75 = true;
      $rootScope.r50 = false;
    } else if ($rootScope.agxo <= 25) {
      $rootScope.r75 = false;
      $rootScope.r50 = true;
    } else {
      $rootScope.r75 = false;
      $rootScope.r50 = false;
    }
  }

  $scope.updateNeVolas = function() {
    if($scope.neVolas) {
      $rootScope.memelektita = null;
      $scope.updateEntuto()
    }
  }

  var error = function (err) {
    console.log(err);
  };

  var success = function(response) {
    $scope.landoj = response.data;

    var successIpapi = function(response) {
      var landkodo = response.data.country.toLowerCase();

      prihomoService.getInfoPriLanda(landkodo).then(function(response){
        $rootScope.landInformoj = response.data;
      });

      for(var i = 0; i < $scope.landoj.length; i++) {
        if($scope.landoj[i].landkodo == landkodo) {
            $rootScope.uzanto.lando = $scope.landoj[i];
            $rootScope.uzanto = $scope.uzanto;
            return;
        }
        $rootScope.uzanto.lando = $scope.landoj[i];
        $rootScope.uzanto = $scope.uzanto;
        $rootScope.valuto = $rootScope.uzanto.lando.valuto;

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
            $rootScope.memelektita =  $rootScope.membrecgrupoj[0];
            for(var i = 0; i < $rootScope.membrecgrupoj.length; i++){
              getKotizo($rootScope.membrecgrupoj[i]);
            }
          }, error);
        }, error);
      }
    }
    if($rootScope.uzanto.lando) {
      $rootScope.valuto = $rootScope.uzanto.lando.valuto;
    } else {
      prihomoService.getIpapi().then(successIpapi);
    }
  }

  $scope.updateMem = function(mem) {
    $rootScope.memelektita = mem;
    $scope.updateEntuto();
  }

  $scope.gxisdatigiLandon = function() {
    prihomoService.getInfoPriLanda($scope.uzanto.lando.landkodo).
    then(function(response){
      $rootScope.landInformoj = response.data;
      for(var i = 0; i < $rootScope.membrecgrupoj.length; i++){
        getKotizo($rootScope.membrecgrupoj[i]);
      }
      for(var i = 0; i < $rootScope.krommembrecoj.length; i++){
        getKotizo($rootScope.krommembrecoj[i]);
      }
    });
  };

  var getKotizo = function(elemento){
    membrigxiService.getKotizo(elemento.id, $rootScope.uzanto.lando.id)
    .then(function(response) {
        elemento.kotizo = response.data[0].prezo/100;
        elemento.junaRabato = response.data[0].junaRabato/100;
        $scope.updateEntuto();
    }, error);
  }

 $scope.updateEntuto = function() {
  $scope.updateAgxo();
   $rootScope.entuto = 0;
   for(var i = 0; i < $rootScope.krommembrecoj.length; i++) {
     if($rootScope.krommembrecoj[i].elektita) {
      $rootScope.entuto += $rootScope.krommembrecoj[i].kotizo;
     }
   }
   if($rootScope.r75 && $scope.jaroj == 1 && $rootScope.memelektita.id == 3) {
     $rootScope.entuto += Math.ceil($rootScope.memelektita.kotizo * 0.25);
   }
   else if($rootScope.r50 && $scope.jaroj == 1 && $rootScope.memelektita.id == 3) {
     $rootScope.entuto += Math.ceil($rootScope.memelektita.kotizo * 0.5);
   } else {
     $rootScope.entuto += $rootScope.memelektita.kotizo;
   }
   $rootScope.entuto = $rootScope.entuto * Math.round($scope.jaroj);
 }

 $scope.roundUp = function(value) {
    return Math.ceil(value);
 }

 $scope.$on("$destroy", function(){
     $rootScope.jaroj = $scope.jaroj;
     $rootScope.memelektita = $scope.memelektita;
 });
});
