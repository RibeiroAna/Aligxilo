app.controller("membrigxiCtrl", function ($scope, $http, $rootScope, $window, config) {

  $scope.init = function () {
    $window.scrollTo(0, 0);
    $scope.jaro = parseInt((new Date()).getFullYear());
    $scope.entuto = 0;
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
    }
    $scope.naskigxiaro = parseInt(nt[4] + nt[5] + nt[6] + nt[7]);
    $rootScope.agxo = $scope.jaro - $scope.naskigxiaro;

    if(!$rootScope.jaroj) {
      $scope.jaroj = 1;
      $rootScope.jaroj = 1;
      $rootScope.mj = [];
      $rootScope.mj[0] = true;
    } else {
      $scope.jaroj = $rootScope.jaroj;
    }

    $scope.krommem = [];

    if($rootScope.krommem) {
      $scope.krommem = $rootScope.krommem;
      $scope.entuto =  $rootScope.entutoKrom;
    }

    if(($rootScope.uzanto) && ($rootScope.uzanto.lando)) {
        var idLando = $rootScope.uzanto.lando.id;
    }

    var kotizajPeto = "/grupoj/" + config.idBazaMembreco +
    "/kotizoj?idLando=" + idLando;
    $http.get(config.api_url + kotizajPeto)
    .then(function (response) {
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
      });


    $http.get(config.api_url + "/grupoj/membrecoj/aldonoj").then(
      function(response) {
        $rootScope.krommembrecoj = response.data;
        $rootScope.prezo = [];
        for (var i = 0; i < $rootScope.krommembrecoj.length; i++) {
          var id = $rootScope.krommembrecoj[i].id;
          var kromprezo = "/grupoj/" + id +
                          "/kotizoj?idLando=" + idLando;
          $http.get(config.api_url + kromprezo)
              .then(function (response) {
              response.data[0].prezo = response.data[0].prezo / 100;
              if($rootScope.agxo <= config.tejoagxo) {
                response.data[0].prezo = response.data[0].prezo - response.data[0].junaRabato  / 100;
              }
              $rootScope.prezo.push(response.data[0]);
          });
        }
    });
 }

 $scope.updateEntuto = function(index) {
   if(!$rootScope.prezo) {
     $scope.krommem[index] = false;
   } else {
     if($scope.krommem[index]) {
       $scope.entuto += ($rootScope.prezo[index].prezo);
     } else {
       $scope.entuto -= ($rootScope.prezo[index].prezo);
     }
   }
   $rootScope.krommem = $scope.krommem;
   $rootScope.entutoKrom = $scope.entuto;
 }

  $scope.updateKotizo = function(valoro) {
    if(valoro < $rootScope.sepdekKotizo) {
      $rootScope.kanuto = true;
    } else {
      $rootScope.kanuto = false;
    }
    $rootScope.entutoKotizo = valoro;
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
