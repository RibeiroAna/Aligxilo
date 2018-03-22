app.controller("prihomoCtrl", function ($scope, $rootScope, $window, $mdDialog, prihomoService, config) {

    $scope.init = function() {
      $scope.irita = false;
      $scope.msg = "ATENTO: Se via lasta aliĝo por UEA estis antaŭ renovigo de sistemoj, \
                    verŝajne UEA ne plu havas viajn datumojn. Do, bonvole, aliĝu\
                    kiel nova membro"
      $scope.membrospaco_url = config.membrospaco_url;
      prihomoService.getLandoj().then(success, error);
    }

    $scope.ensaluti = function() {
        prihomoService.doEnsaluti($scope.u).then(function(response) {
          prihomoService.getUzanto(response.data.uzanto.id, response.data.token).then(
            function(response) {
                $rootScope.uzanto = response.data[0];
                var nt = $rootScope.uzanto.naskigxtago.slice(0, 10);
                $rootScope.uzanto.naskigxtagoSenFormo = nt[8] + nt[9] + nt[5] + nt[6] + nt[0] + nt[1] + nt[2] + nt[3];
                $scope.malkovrita = true;
                $rootScope.uzanto.pasvorto = $scope.u.pasvorto;
                for(var i = 0; i < $scope.landoj.length; i++) {
                  if($scope.landoj[i].id == $rootScope.uzanto.idLando) {
                    $rootScope.uzanto.lando = $scope.landoj[i];
                    $scope.gxisdatigiLandon();
                    break;
                  }
                }
                $scope.cancel();
            });
          }, function(response) {
            $scope.msg = response.data.message;
        });
    }


    var success = function (response) {
        $scope.landoj = response.data;
        var successIpapi = function(response) {
            var landkodo = response.data.country;
            prihomoService.getInfoPriLanda(landkodo).then(function(response){
              $rootScope.landInformoj = response.data;
            });

            for(var i = 0; i < $scope.landoj.length; i++) {
                if($scope.landoj[i].landkodo.toUpperCase() == landkodo) {
                    $rootScope.uzanto.lando = $scope.landoj[i];
                    $rootScope.uzanto = $rootScope.uzanto;
                    return;
                }
                $rootScope.uzanto.lando = $scope.landoj[i];
                $rootScope.uzanto = $rootScope.uzanto;
            }
        };

        if($rootScope.uzanto) {
            $rootScope.uzanto = $rootScope.uzanto;
        } else {
            $rootScope.uzanto = {};
            prihomoService.getIpapi().then(successIpapi, function(err){
              $scope.uzanto.lando = $scope.landoj[0];
              $scope.gxisdatigiLandon();
            });
        }

    };

    var error = function (err) {
      console.log(err);
    };

    $scope.gxisdatigiLandon = function() {
      prihomoService.getInfoPriLanda($rootScope.uzanto.lando.landkodo).
      then(function(response){
        $rootScope.landInformoj = response.data;
      });
    };

    $scope.montriDetalojn = function(ev, element) {
      $mdDialog.show({
        contentElement: element,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.cancel = function() {
       $mdDialog.cancel();
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
          $rootScope.uzanto = $rootScope.uzanto;
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

      if($rootScope.uzanto.id){
        $rootScope.uzanto = $rootScope.uzanto;
        $window.location.href = '#!/form/membrigxi';
      } else {
        if($rootScope.uzanto.retposxto){
          prihomoService.getEkzistantaRetposxto($rootScope.uzanto.retposxto)
                        .then(sucess, err);
        } else {
          formTraktado();
        }
      }
    };
});
