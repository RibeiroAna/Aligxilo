var app = angular.module("formularoj", ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/form");

        $stateProvider
            .state("form", {
                url: "/form",
                templateUrl: "template/form.htm"
            })
            .state("form.prihomo", {
                url: "/prihomo",
                templateUrl: "template/prihomo.html",
                controller: "prihomoCtrl"
            })

    });
