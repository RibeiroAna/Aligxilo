app.controller("prihomoCtrl", function ($scope, $rootScope, $window, prihomoService) {

    $scope.init = function() {
      $scope.uzanto = {};
      $scope.irita = false;
      prihomoService.getLandoj().then(success, error);
    }

    var success = function (response) {
        $scope.landoj = response.data;

        var successIpapi = function(response) {
            var landkodo = response.data.country;

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

    var error = function (err) {
      console.log(err);
    };

    $scope.gxisdatigiLandon = function() {
      prihomoService.getInfoPriLanda($scope.uzanto.lando.landkodo).
      then(function(response){
        $rootScope.landInformoj = response.data;
      });
    };

    $rootScope.elPriUzanto = function() {
      $scope.irita = true;

      var formTraktado = function() {
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

        if($scope.prihomo.$valid) {
          $rootScope.uzanto = $scope.uzanto;
          $window.location.href = '#!/form/membrigxi';
        } else {
          $window.scrollTo(0, 0);
          if ('parentIFrame' in window) {
            parentIFrame.scrollToOffset(0,0);
          }
        }
      }

      var sucess = function(response) {
          if(response.data.uzantoID != -1) {
            $scope.prihomo.retposxto.$setValidity("ekzistas", false);
          } else {
            $scope.prihomo.retposxto.$setValidity("ekzistas", true);
          }
          formTraktado();
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

      if($scope.uzanto.retposxto){
        prihomoService.getEkzistantaRetposxto($scope.uzanto.retposxto)
                      .then(sucess, err);
      } else {
        formTraktado();
      }
    };
});
