app.controller("membrigxiCtrl", function ($scope, $rootScope, $window, config, membrigxiService) {

  $scope.init = function () {
    $scope.jaro = parseInt((new Date()).getFullYear());
    $rootScope.entuto = 0;
    $rootScope.kanuto = false;
    
    if($rootScope.kanutkialo){
      $scope.kanutkialo = $rootScope.kanutkialo;
      $rootScope.kanuto = true;
    }

    if($rootScope.novkotizo) {
      $scope.novkotizo = $rootScope.novkotizo;
    }

    if(!$rootScope.uzanto) {
      $window.location.href = '#!/form/prihomo';
    }

    var nt = $rootScope.uzanto.naskigxtagoSenFormo;
    if(!nt) {
      $window.location.href = '#!/form/prihomo';
    } else{
      var agxo = $scope.jaro - parseInt(nt[4] + nt[5] + nt[6] + nt[7]);
      config.getConfig("junaAgxo").then(function(response){
          var tejoagxo = response.data.junaAgxo;
          $rootScope.tejoagxo = (agxo < tejoagxo)? true: false;
       });
    }

    if(!$rootScope.jaroj) {
      $scope.jaroj = 1;
      $rootScope.jaroj = 1;
      $rootScope.mj = [];
      $rootScope.mj[0] = true;
    } else {
      $scope.jaroj = $rootScope.jaroj;
    }

    if(($rootScope.uzanto) && ($rootScope.uzanto.lando)) {
        var idLando = $rootScope.uzanto.lando.id;
        $rootScope.valuto = $rootScope.uzanto.lando.valuto;
    }

    var error = function (err) {
        console.log(err);
    };

    var getKotizo = function(elemento){
      membrigxiService.getKotizo(elemento.id, $rootScope.uzanto.lando.id)
      .then(function(response) {
          elemento.kotizo = response.data[0].prezo/100;
          elemento.junaRabato = response.data[0].junaRabato/100;
          $scope.updateEntuto();
      }, error);
    }

    if(!$rootScope.krommembrecoj) {
      config.getConfig("idAldonaMembrecgrupo").then(function(response) {
        $scope.idAldonaMembrecgrupo = response.data.idAldonaMembrecgrupo;
        membrigxiService.getGrupKat($scope.idAldonaMembrecgrupo).then(function(response) {
          $rootScope.krommembrecoj = response.data;
          for(var i = 0; i < $rootScope.krommembrecoj.length; i++){
            getKotizo($rootScope.krommembrecoj[i]);
            $rootScope.krommembrecoj[i].elektita = false;
          }
        }, error);
      }, error);
    } else {
      for(var i = 0; i < $rootScope.krommembrecoj.length; i++){
        getKotizo($rootScope.krommembrecoj[i]);
      }
    }

    if(!$rootScope.membrecgrupoj) {
      config.getConfig("idMembrecgrupo").then(function(response) {
        $scope.idMembrecgrupo = response.data.idMembrecgrupo;
        membrigxiService.getGrupKat($scope.idMembrecgrupo).then(function(response) {
          $rootScope.membrecgrupoj = response.data;
          for(var i = 0; i < $rootScope.membrecgrupoj.length; i++){
            if($rootScope.membrecgrupoj[i].nomo.toLowerCase().indexOf("ret") > -1) {
              $rootScope.retmembreco = $rootScope.membrecgrupoj[i];
            }
            getKotizo($rootScope.membrecgrupoj[i]);
          }
        }, error);
      }, error);
    } else {
      for(var i = 0; i < $rootScope.membrecgrupoj.length; i++){
        getKotizo($rootScope.membrecgrupoj[i]);
      }
    }

    $scope.updateEntuto();
 }

 $scope.updateEntuto = function() {
   $rootScope.entuto = 0;
   for(var i = 0; i < $rootScope.krommembrecoj.length; i++) {
     if($rootScope.krommembrecoj[i].elektita) {
       if($rootScope.tejoagxo) {
         $rootScope.entuto += $rootScope.krommembrecoj[i].kotizo -
         $rootScope.krommembrecoj[i].junaRabato;
       } else {
          $rootScope.entuto += $rootScope.krommembrecoj[i].kotizo;
       }
     }
   }

   if($rootScope.tejoagxo) {
       $rootScope.entuto += $scope.memelektita.kotizo - $scope.memelektita.junaRabato;
     } else {
       $rootScope.entuto += $scope.memelektita.kotizo;
    }
    $rootScope.entuto = $rootScope.entuto * Math.round($scope.jaroj);

    $scope.petiRabaton($scope.novkotizo);
 }

 $scope.petiRabaton = function(novaValoro) {
   $scope.novkotizo = novaValoro;
   if(novaValoro) {
     var sepdekEntuto = $rootScope.entuto * 0.7;
     if(novaValoro < sepdekEntuto) {
       $rootScope.kanuto = true;
     } else {
       $rootScope.kanuto = false;
     }
     if(novaValoro == $rootScope.entuto) {
       $scope.novkotizo = undefined;
     }
   }
 }

 $scope.$on("$destroy", function(){
     $rootScope.jaroj = $scope.jaroj;
     $rootScope.kanutkialo = $scope.kanutkialo;
     $rootScope.memelektita = $scope.memelektita;
     $rootScope.novkotizo = $scope.novkotizo;
 });
});
