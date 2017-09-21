app.controller("prihomoCtrl", function ($scope, $rootScope,
                                      $window, $http, config) {
    $scope.init = function() {
      $http.get(config.api_url + "/landoj").then(function(response) {
          $scope.landoj = response.data;
          console.log($scope.landoj);
      });
    }
});
