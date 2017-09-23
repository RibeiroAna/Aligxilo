app.controller("membrigxiCtrl", function ($scope, $http, $rootScope, $window, config) {

  $scope.init = function () {
    $scope.jaro = (new Date()).getFullYear();
    $scope.entuto = 0;

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
        $rootScope.entutoKotizo = $scope.kotizo.prezo;
        $rootScope.monero = $scope.kotizo.monero;

        $http.get(config.api_url + "/grupoj/membrecoj/aldonoj").then(
          function(response) {
            $scope.krommembrecoj = response.data;
            $scope.prezo = [];
            for (var i = 0; i < $scope.krommembrecoj.length; i++) {
              var id = $scope.krommembrecoj[i].id;
              var kromprezo = "/grupoj/" + id +
                              "/kotizoj?idLando=" + idLando;
              $http.get(config.api_url + kromprezo)
                  .then(function (response) {
                  response.data[0].prezo = response.data[0].prezo / 100;
                  $scope.prezo.push(response.data[0]);
              });
            }
        });
  });
 }

 $scope.updateEntuto = function(index) {
   if(!$scope.prezo) {
     $scope.krommem[index] = false;
   } else {
     if($scope.krommem[index]) {
       $scope.entuto += ($scope.prezo[index].prezo);
     } else {
       $scope.entuto -= ($scope.prezo[index].prezo);
     }
   }
   $rootScope.krommem = $scope.krommem;
   $rootScope.entutoKrom = $scope.entuto;
 }

 $scope.updateJaroj = function() {
   $rootScope.jaroj = $scope.jaroj;
 }

});
