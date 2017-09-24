app.controller("plusendiCtrl", function ($scope, $rootScope,
                                      $window, $http, config) {

  $scope.init = function() {
    $window.scrollTo(0, 0);
    if(!$rootScope.uzanto) {
      $window.location.href = '#!/form/prihomo';
    }

    //Get Perantoj
      var perantoj = "/perantoj?idLando=" + $rootScope.uzanto.lando.id;
      $http.get(config.api_url + perantoj)
          .then(function(response) {
            $scope.perantoj = response.data;
      });
  }

  $scope.plusendi = function() {
    window.alert("Dankon! Via aliĝo estis sendita al CO por plia trakdado");
    $window.location.href = '#!/form/prihomo';
    $window.location.reload();
  }
});
