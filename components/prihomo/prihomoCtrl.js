app.controller("prihomoCtrl", function ($scope, $rootScope, $window, $http, config, prihomoService) {

    $scope.init = function() {
      $window.scrollTo(0, 0);
      $scope.uzanto = {};

      var success = function (response) {
          $scope.landoj = response.data;

          var successIpapi = function(response) {
              var landkodo = response.data.country;

              for(var i = 0; i < $scope.landoj.length; i++) {
                  if($scope.landoj[i].landkodo == landkodo) {
                      $scope.uzanto.lando = $scope.landoj[i];
                      $rootScope.uzanto = $scope.uzanto;
                      return;
                  }
                  $scope.uzanto.lando = $scope.landoj[i];
                  $rootScope.uzanto = $scope.uzanto;
              }

          };

          prihomoService.getIpapi().then(successIpapi);

          if($rootScope.uzanto) {
              $scope.uzanto = $rootScope.uzanto;
              $scope.ensaluti = false;
          } else {
              $scope.ensaluti = false;
          }

      };


      var error = function (err) {

      };

      prihomoService.getLandoj().then(success, error);


    $rootScope.elPriUzanto = function() {
      if($scope.prihomo.$valid) {
        $rootScope.uzanto = $scope.uzanto;
        $window.location.href = '#!/form/membrigxi';
      }
    }

  }
});
