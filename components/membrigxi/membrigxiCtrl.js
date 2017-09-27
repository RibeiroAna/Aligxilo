app.controller("membrigxiCtrl", function ($scope, $http, $rootScope, $window, config) {

  $scope.init = function () {
    $window.scrollTo(0, 0);
    $scope.jaro = (new Date()).getFullYear();
    $scope.entuto = 0;
    $scope.kanuto = false;

    if(!$rootScope.uzanto) {
      $window.location.href = '#!/form/prihomo';
    }

    if(!$rootScope.jaroj) {
      $scope.jaroj = 1;
      $rootScope.jaroj = 1;
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
        $rootScope.sesdekKotizo = $scope.kotizo.prezo * 0.6;
        $rootScope.monero = $scope.kotizo.monero;
        if($rootScope.entutoKotizo) {
          $scope.kotizo.prezo = $rootScope.entutoKotizo;
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
    if(valoro < $rootScope.sesdekKotizo) {
      $scope.kanuto = true;
    } else {
      $scope.kanuto = false;
    }
    $rootScope.entutoKotizo = valoro;
  }

 $scope.updateJaroj = function() {
   $rootScope.jaroj = $scope.jaroj;
 }

});
