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

  $scope.plusendi = function() {
    $rootScope.uzanto.uzantnomo =  $rootScope.uzanto.retposxto;
    $rootScope.uzanto.idLando = $rootScope.uzanto.lando.id;
    var nt = $rootScope.uzanto.naskigxtagoSenFormo;
    $rootScope.uzanto.naskigxtago = (nt[4] + nt[5] + nt[6] + nt[7] + "-" +
                                    nt[2] + nt[3] + "-" + nt[0] + nt[1]).toString();
    var req = {
      method: 'POST',
      url: config.api_url + '/uzantoj',
      data: $rootScope.uzanto
    }
    $http(req).then(
      function(sucess) {
        window.alert("Dankon! Via aliĝo estis sendita al CO por plia trakdado");
        $window.location.href = '#!/form/prihomo';
        $window.location.reload();
      }
    );
  }
});
