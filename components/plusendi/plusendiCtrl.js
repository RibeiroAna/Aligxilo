app.controller("plusendiCtrl", function ($scope, $rootScope, $q,
                                         $window, $http, config,
                                         plusendiService) {

  $scope.init = function() {
      if(!$rootScope.valuto) {
        $window.location.href = '#!/form/prihomo';
      }

      var success = function (response) {
          $scope.perantoj = response.data;
      };

      var error = function (err) {
          console.log(err);
      };

      var dumviva = false;
      var dato = new Date();

      var jaro = dato.getFullYear();
      var tago = dato.getDate();
      var monato = dato.getMonth() + 1;

      if($rootScope.jaroj != 1.5) {
        var komencdato = jaro + "-" + monato + "-" + tago;
      } else {
        var komencdato = jaro + 1 + "-01-01";
      }
      var findato = jaro + 1 + "-01-20"
      if($rootScope.jaroj == 1.5 || $rootScope.jaroj == 2) {
        findato = (jaro + 2) + "-01-20";
      }
      if($rootScope.jaroj == 5) {
        findato = (jaro + 5) + "-01-20";
      }
      if($rootScope.jaroj == 25) {
        findato = undefined;
        dumviva = true;
      }

      //Enmetas en baza membreca grupo
      $scope.datumoj = {
        idAno: '',
        komencdato: komencdato,
        findato: findato,
        observoj: '',
        dumviva: dumviva
      };
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
                  " " +  $rootScope.uzanto.familianomo + " " +
                  $rootScope.uzanto.retposxto;
    observo += "<br>Ĉiuj valoroj estas en " + $rootScope.valuto + "<br>";
    observo += "<b>Baza membreco elektita: </b>" + $rootScope.memelektita.nomo;

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
    if($rootScope.novkotizo) {
      observo += "Petita novkotizo de la homo " + $rootScope.novkotizo;
    }

     observo += "<b>Pagmaniero</b>" + $scope.pago + "<br>";

     $scope.datumoj.observoj = observo.toString();

     observo += "<b>Pagdetaloj</b>" + JSON.stringify($scope.pagdetaloj, replacer);

     var data = {mesagxo: observo, temo: 'Nova aliĝpeto en UEA'};

     plusendiService.postMesagxi(data);
  }

  var error = function (err) {
      if(err.status == 400) {
        window.alert("Vi ŝajne uzas ne permesitan karakterojn en via aliĝpeto!");
      } else {
        window.alert("Iu ne atendita eraro okazis. Provu denove");
      }
      console.log(err);
      $window.location.href = '#!/form/membrigxi';
  };

  $scope.registriMembrecojn = function() {
      var promises = [];
      promises.push(
              plusendiService.postMembreco($rootScope.memelektita.id,
                                           $scope.datumoj));
      if($rootScope.krommem){
        for(var i = 0; i < $rootScope.krommem.length; i++) {
          if($rootScope.krommem[i]) {
             promises.push(
                     plusendiService.postMembreco($rootScope.krommembrecoj[i].id,
                                                  $scope.datumoj));
          }
        }
      }

     $q.all(promises).then(function(success) {
         window.alert("Dankon, via aliĝo estis registrita");
         $window.location.href = '#!/form/membrigxi';
         $window.location.reload();
      }, error);
  }

  $scope.plusendi = function() {
    //Kreas uzanton kaze ĝi ne ekzistas
    if($scope.pagmaniero.$valid) {
      if(!$rootScope.uzanto.id) {
        $rootScope.uzanto.uzantnomo =  $rootScope.uzanto.retposxto;
        $rootScope.uzanto.idLando = $rootScope.uzanto.lando.id;

          var success = function (response) {
              $rootScope.uzanto.id = response.data.id;
              $scope.datumoj.idAno = response.data.id;
              $scope.financajObservoj();
              $scope.registriMembrecojn();
          };

          plusendiService.postUzanto($rootScope.uzanto).then(success, error);

      } else {
        $scope.registriMembrecojn($rootScope.uzanto.id);
      }
    }
}
});
