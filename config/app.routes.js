angular.module('formularoj').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/form/prihomo");

    $stateProvider
        .state("form", {
            url: "/form",
            templateUrl: "components/form/form.htm"
        })
        .state("form.prihomo", {
            url: "/prihomo",
            templateUrl: "components/prihomo/prihomo.htm",
            controller: "prihomoCtrl"
        })
        .state("form.membrigxi", {
            url: "/membrigxi",
            templateUrl: "components/membrigxi/membrigxi.htm",
            controller: "membrigxiCtrl"
        })
        .state("form.donaci", {
            url: "/donaci",
            templateUrl: "components/donaci/donaci.htm",
            controller: "donaciCtrl"
        })
        .state("form.plusendi", {
            url: "/plusendi",
            templateUrl: "components/plusendi/plusendi.htm",
            controller: "plusendiCtrl"
        })
        .state("form.kotizoj", {
            url: "/kotizoj",
            templateUrl: "components/kotizoj/kotizoj.htm",
            controller: "kotizojCtrl"
        })
});
