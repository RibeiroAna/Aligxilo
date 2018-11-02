app.controller("prihomoCtrl", function ($scope, $rootScope, $window, prihomoService) {

    $scope.init = function() {
      $scope.uzanto = $rootScope.uzanto;
      $scope.irita = false;
      $scope.ensalutado = false;
    }

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
          var nt = $rootScope.uzanto.naskigxtagoSenFormo;

          if(nt) {
            $rootScope.uzanto.naskigxtago = (nt[4] + nt[5] + nt[6] + nt[7] + "-" +
                                            nt[2] + nt[3] + "-" + nt[0] + nt[1]).toString();
            var timestamp = Date.parse($rootScope.uzanto.naskigxtago);
            var minDate = new Date("1877-06-26");
            var maxDate = new Date();
            var naskigxtago = new Date($rootScope.uzanto.naskigxtago);
            if(isNaN(timestamp)) {
              $scope.prihomo.naskigxitago.$setValidity("date", false);
            } else {
              if((naskigxtago < minDate) || (naskigxtago > maxDate)){
                $scope.prihomo.naskigxitago.$setValidity("date", false);
              } else {
                $scope.prihomo.naskigxitago.$setValidity("date", true);
              }
            }
          }
          $rootScope.uzanto = $scope.uzanto;
          $window.location.href = '#!/form/donaci';
        } else {
          $window.scrollTo(0, 0);
          if ('parentIFrame' in window) {
            parentIFrame.scrollToOffset(0,0);
          }
        }
      }

      formTraktado();
    };
});
