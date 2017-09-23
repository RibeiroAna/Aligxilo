var app = angular.module("formularoj", ["ui.router", "ui.mask", "xeditable"])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/form/prihomo");

        $stateProvider
            .state("form", {
                url: "/form",
                templateUrl: "template/form.htm"
            })
            .state("form.prihomo", {
                url: "/prihomo",
                templateUrl: "template/prihomo.htm",
                controller: "prihomoCtrl"
            })
            .state("form.membrigxi", {
                url: "/membrigxi",
                templateUrl: "template/membrigxi.htm",
                controller: "membrigxiCtrl"
            })
            .state("form.donaci", {
                url: "/donaci",
                templateUrl: "template/donaci.htm",
                controller: "donaciCtrl"
            })
            .state("form.plusendi", {
                url: "/plusendi",
                templateUrl: "template/plusendi.htm"
                //controller: "plusendiCtrl"
            })
    });

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
