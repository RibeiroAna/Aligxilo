app.controller("prihomoCtrl", function ($scope, $rootScope, $window, prihomoService) {

    $scope.init = function() {
      if($rootScope.uzanto) {
        $scope.uzanto = $rootScope.uzanto;
      } else {
        $scope.uzanto = {};
      }
      $scope.irita = false;
      $scope.ensalutado = false;
      prihomoService.getLandoj().then(success, error);
    }

    var success = function (response) {
      $scope.landoj = response.data;
      if(!$rootScope.entuto) {
        $window.location.href = '#!/form/membrigxi';
        $window.location.reload();
      }

      var successIpapi = function(response) {
        var landkodo = response.data.country.toLowerCase();

        prihomoService.getInfoPriLanda(landkodo).then(function(response){
          $rootScope.landInformoj = response.data;
        });

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

        if($rootScope.uzanto) {
            $scope.uzanto = $rootScope.uzanto;
        } else {
            prihomoService.getIpapi().then(successIpapi);
        }

    };

    $scope.ensaluti = function() {
      $scope.msg = null;
      prihomoService.doEnsaluti($scope.u).then(function(response) {
        prihomoService.getUzanto(response.data.uzanto.id, response.data.token).then(
          function(response) {
            $scope.uzanto = response.data[0];
            var nt = $scope.uzanto.naskigxtago.slice(0, 10);
            $scope.uzanto.naskigxtagoSenFormo = nt[8] + nt[9] + nt[5] + nt[6] + nt[0] + nt[1] + nt[2] + nt[3];
            $rootScope.malkovrita = true;
            $scope.uzanto.pasvorto = $scope.u.pasvorto;
            for(var i = 0; i < $scope.landoj.length; i++) {
              if($scope.landoj[i].id == $scope.uzanto.idLando) {
                $scope.uzanto.lando = $scope.landoj[i];
                console.log($scope.uzanto);
                $scope.gxisdatigiLandon();
                break;
              }
            }
            $scope.ensalutado = false;
          });
        }, function(response) {
          $scope.msg = response.data.message;
      });
    }

    var error = function (err) {
      console.log(err);
    };

    $rootScope.elPriUzanto = function() {
      $scope.irita = true;

      var formTraktado = function() {
        if($scope.prihomo.$valid) {
          $rootScope.uzanto = $scope.uzanto;
          $window.location.href = '#!/form/donaci';
        } else {
          $window.scrollTo(0, 0);
          if ('parentIFrame' in window) {
            parentIFrame.scrollToOffset(0,0);
          }
        }
      }

      var err = function(err) {
        if($scope.prihomo.$valid) {
          window.alert("Okazis ne atendita eraro! Reprovu iam!");
          console.log(err);
        }
        $window.scrollTo(0, 0);
        if ('parentIFrame' in window) {
          parentIFrame.scrollToOffset(0,0);
        }
      }

      formTraktado();
    };
});
