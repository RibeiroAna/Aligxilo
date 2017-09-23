app.controller("prihomoCtrl", function ($scope, $rootScope,
                                      $window, $http, config) {

    $scope.init = function() {
      $scope.uzanto = {};

      $http.get(config.api_url + "/landoj").then(function(response) {
          $scope.landoj = response.data;

          $http.get("http://ip-api.com/json").then(function(response) {
            var landkodo = response.data.countryCode;
            for(var i = 0; i < $scope.landoj.length; i++) {
              if($scope.landoj[i].landkodo == landkodo) {
                $scope.uzanto.lando = $scope.landoj[i];
                $rootScope.uzanto = $scope.uzanto;
                return;
              }
              $scope.uzanto.lando = $scope.landoj[i];
              $rootScope.uzanto = $scope.uzanto;
            }
          });

          if($rootScope.uzanto) {
            $scope.uzanto = $rootScope.uzanto;
            $scope.ensaluti = false;
          } else {
            $scope.ensaluti = true;
        }
      });

    $rootScope.elPriUzanto = function() {
      if($scope.prihomo.$valid) {
        $rootScope.uzanto = $scope.uzanto;
        $window.location.href = '#!/form/membrigxi';
      }
    }

  }
});
