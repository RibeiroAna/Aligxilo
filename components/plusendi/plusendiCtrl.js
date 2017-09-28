app.controller("plusendiCtrl", function ($scope, $rootScope,
                                      $window, $http, config) {

  $scope.init = function() {
    $window.scrollTo(0, 0);
    if(!$rootScope.monero) {
      $window.location.href = '#!/form/membrigxi';
    }

    //Get Perantoj
      var perantoj = "/perantoj?idLando=" + $rootScope.uzanto.lando.id;
      $http.get(config.api_url + perantoj)
          .then(function(response) {
            $scope.perantoj = response.data;
      });
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

    if($rootScope.krommem) {
      observo += "<b>Aliaj krommembrecoj: </b><br>";
      for(var i = 0; i < $rootScope.krommem.length; i++) {
        if($rootScope.krommem[i]) {
          observo += "-" + $rootScope.krommembrecoj[i].nomo + " prezo:";
          observo += $rootScope.prezo[i].prezo   * $rootScope.jaroj + "<br>";
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

     var req = {
         method: 'POST',
         url: config.api_url + '/financoj/mesagxi',
         data: {mesagxo: observo, temo: 'Nova aliĝpeto en UEA'}
       };
    $http(req);
  }

  $scope.registriMembrecojn = function(idAno) {
        console.log(idAno);
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
        var req = {
          method: 'POST',
          url: config.api_url + '/grupoj/' + config.idBazaMembreco + '/anoj',
          data: datumoj
        };
        $http(req);

        if($rootScope.krommem){
          for(var i = 0; i < $rootScope.krommem.length; i++) {
            if($rootScope.krommem[i]) {
              var req = {
                method: 'POST',
                url: config.api_url + '/grupoj/' +  $rootScope.krommembrecoj[i].id + '/anoj',
                data: datumoj
              };
              $http(req);
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
        var req = {
          method: 'POST',
          url: config.api_url + '/uzantoj',
          data: $rootScope.uzanto
        };
        $http(req).then(
          function(sucess) {
           $rootScope.uzanto.id = sucess.data.id;
           $scope.registriMembrecojn(sucess.data.id);
          });
      } else {
        $scope.registriMembrecojn($rootScope.uzanto.id);
      }
    }
}
});
