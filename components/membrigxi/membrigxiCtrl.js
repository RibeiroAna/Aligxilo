app.controller("membrigxiCtrl", function ($scope, $rootScope, $window, config, membrigxiService) {

  $scope.init = function () {
    $window.scrollTo(0, 0);
    $scope.jaro = parseInt((new Date()).getFullYear());
    $rootScope.entuto = 0;
    $rootScope.kanuto = false;

    if($rootScope.kanutkialo){
      $scope.kanutkialo = $rootScope.kanutkialo;
    }

    if(!$rootScope.uzanto) {
      $window.location.href = '#!/form/prihomo';
    }

    var nt = $rootScope.uzanto.naskigxtagoSenFormo;
    if(!nt) {
      $window.location.href = '#!/form/prihomo';
    } else{
      var agxo = $scope.jaro - parseInt(nt[4] + nt[5] + nt[6] + nt[7]);
      $rootScope.tejoagxo = (agxo < config.tejoagxo)? true: false;
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
    }

    var success = function (response) {
        $scope.kotizo = response.data[0];
        $scope.kotizo.prezo = $scope.kotizo.prezo / 100;
        if($rootScope.agxo <= config.tejoagxo) {
            $scope.kotizo.prezo = $scope.kotizo.prezo - $scope.kotizo.junaRabato / 100;
        }
        $rootScope.sepdekKotizo = $scope.kotizo.prezo * 0.7;
        $rootScope.monero = $scope.kotizo.monero;
        if($rootScope.entutoKotizo) {
            $scope.kotizo.prezo = $rootScope.entutoKotizo;
            if($rootScope.entutoKotizo < $rootScope.sepdekKotizo)
                $rootScope.kanuto = true;
        } else {
            $rootScope.entutoKotizo = $scope.kotizo.prezo;
        }
    };

    var error = function (err) {
        console.log(err);
    };

      membrigxiService.getKotizajPeto(config.idBazaMembreco, idLando).then(success, error);

      membrigxiService.getAldonoj().then(function(response) {
         $rootScope.krommembrecoj = response.data;
         $rootScope.prezo = [];

         var success = function (response) {
             response.data[0].prezo = response.data[0].prezo / 100;
             if($rootScope.agxo <= config.tejoagxo) {
                 response.data[0].prezo = response.data[0].prezo - response.data[0].junaRabato  / 100;
             }
             $rootScope.prezo.push(response.data[0]);
         };

         var error = function (err) {
             console.log(err);
         };

         for (var i = 0; i < $rootScope.krommembrecoj.length; i++) {
             var id = $rootScope.krommembrecoj[i].id;
             membrigxiService.getKotizajPeto(id, idLando).then(success, error);
         }
     }, error);
 }

 $scope.updateEntuto = function() {
   $rootScope.entuto = 0;

   for(var i = 0; i < $rootScope.krommembrecoj.length; i++) {
     if($rootScope.krommembrecoj[i].elektita) {
       if($rootScope.tejoagxo) {
         $rootScope.entuto += $rootScope.krommembrecoj[i].prezo - $rootScope.krommembrecoj[i].junaRabato;
       } else {
          $rootScope.entuto += $rootScope.krommembrecoj[i].prezo;
       }
     }
   }
 }

 $scope.updateJaroj = function() {
   $scope.jaroj = 0;
   for(key in $rootScope.mj) {
     if($rootScope.mj[key]){
      if(key < 2)
        $scope.jaroj += 1;
      else
        if (key == 2)
          $scope.jaroj += 5;
        else
          $scope.jaroj += 25;
     }
   }
   $rootScope.jaroj = $scope.jaroj;
 }

 $scope.$on("$destroy", function(){
     $rootScope.kanutkialo = $scope.kanutkialo;
 });

});
