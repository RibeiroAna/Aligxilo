app.controller("plusendiCtrl", function ($scope, $rootScope,
                                      $window, $http, config, plusendiService) {

  $scope.init = function() {
    $window.scrollTo(0, 0);
    if(!$rootScope.monero) {
      $window.location.href = '#!/form/membrigxi';
    }

      var success = function (response) {
          $scope.perantoj = response.data;
      };

      var error = function (err) {
          console.log(err);
      };

      //Get Perantoj
      plusendiService.getPerantoByLando($rootScope.uzanto.lando.id).then(success, error);
  }

  function replacer (key, value) {
    if (key == "$$hashKey") {
      return undefined;
    }
    return value;
  }

  $scope.financajObservoj = function() {
    var observo = "Financaj informoj por " + $rootScope.uzanto.personanomo +
                " " +  $rootScope.uzanto.familianomo + " " + $rootScope.uzanto.retposxto;
    observo += "<br>Ĉiuj valoroj estas en " + $rootScope.monero + "<br>";
    observo += "<b>Baza membreco: </b>"
    observo += "Entuta prezo sugestita de la homo: " + ($rootScope.entutoKotizo
      * $rootScope.jaroj) + "<br>";
    if($rootScope.kanuto) {
      observo += "La homo kandidatiĝis por ricevi subvencion. Klarigoj: ";
      observo += $rootScope.kanutkialo + "<br>";
    }

    observo += "<b>Aliaj krommembrecoj: </b><br>";
    for(var i = 0; i < $rootScope.krommembrecoj.length; i++) {
      if($rootScope.krommembrecoj[i].elektita) {
        observo += "-" + $rootScope.krommembrecoj[i].nomo + " prezo:";
        if($rootScope.tejoagxo) {
          observo += $rootScope.krommembrecoj[i].prezo - $rootScope.krommembrecoj[i].junaRabato + "<br>";
        } else {
          observo += $rootScope.krommembrecoj[i].prezo + "<br>";
        }
      }
    }

    if($rootScope.fondajxoj){
      observo += "<b>Donacoj</b><br>";
      for (var i = 0; i < $rootScope.fondajxoj.length; i++) {
        if($rootScope.fondajxoj[i].donaco > 0) {
          observo += "-" + $rootScope.fondajxoj[i].nomo + " valoro: ";
          observo += $rootScope.fondajxoj[i].donaco + "<br>";
        }
      }
    }

     observo += "<b>Pagmaniero</b>" + $scope.pago + "<br>";
     observo += "<b>Pagdetaloj</b>" + JSON.stringify($scope.pagdetaloj, replacer);

      var data = {mesagxo: observo, temo: 'Nova aliĝpeto en UEA'};

      plusendiService.postMesagxi(data);
  }

  $scope.registriMembrecojn = function(idAno) {
        var dumviva = false;
        var jaro = (new Date()).getFullYear();
        if($rootScope.mj[1] && !$rootScope.mj[0]) {
          var komencdato = (jaro) + "-12-20";
        } else {
          var komencdato = (jaro - 1) + "-12-20";
        }
        var findato = jaro + "-12-20"
        if($rootScope.mj[1]) {
          findato = (jaro + 1) + "-12-20";
        }
        if($rootScope.mj[2]) {
          findato = (jaro + 5) + "-12-20";
        }
        if($rootScope.mj[3]) {
          findato = undefined;
          dumviva = true;
        }

        //Enmetas en baza membreca grupo
        var datumoj = {
          idAno: idAno,
          komencdato: komencdato,
          findato: findato,
          dumviva: dumviva
        };

        var data = datumoj;

        plusendiService.postGrupo(config.idBazaMembreco, data);

        if($rootScope.krommem){
          for(var i = 0; i < $rootScope.krommem.length; i++) {
            if($rootScope.krommem[i]) {
               plusendiService.postGrupo($rootScope.krommembrecoj[i].id, datumoj);
            }
          }
        }

      window.alert("Dankon, via aliĝo estis registrita");
      $window.location.href = '#!/form/membrigxi';
      $window.location.reload()
  }

  $scope.plusendi = function() {
    //Kreas uzanton kaze ĝi ne ekzistas
    if($scope.pagmaniero.$valid) {
      if(!$rootScope.uzanto.id) {
        $rootScope.uzanto.uzantnomo =  $rootScope.uzanto.retposxto;
        $rootScope.uzanto.idLando = $rootScope.uzanto.lando.id;
        var nt = $rootScope.uzanto.naskigxtagoSenFormo;
        $rootScope.uzanto.naskigxtago = (nt[4] + nt[5] + nt[6] + nt[7] + "-" +
                                         nt[2] + nt[3] + "-" + nt[0] + nt[1]).toString();
        $scope.financajObservoj();

          var data = $rootScope.uzanto

          var success = function (response) {
              $rootScope.uzanto.id = response.data.id;
              $scope.registriMembrecojn(response.data.id);
          };

          var error = function (err) {
              console.log(err);
          };

          plusendiService.postUzanto(data).then(success, error);

      } else {
        $scope.registriMembrecojn($rootScope.uzanto.id);
      }
    }
}
});
