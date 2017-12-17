 app.controller("donaciCtrl", function ($scope, $rootScope, $window) {

   $scope.init = function() {
     $scope.montritajFondajxoj = 5;
     //En perfekta sistemo, tio venus el financa datumbazo
     if(!$rootScope.fondajxoj) {
       $rootScope.fondajxoj =
       [
         {
           nomo: "Ĝenerala Kaso",
           priskribo:"Plifortigas la ĝeneralajn financojn de UEA",
           donaco: 5
         },
         {
           nomo: "Fondaĵo kanuto",
           priskribo: "Helpas al limigita nombro de aktivuloj," +
                      " kiuj mem ne povas pagi plenan kotizon",
           donaco: 5
         },
         {
           nomo: "Volontula Fondaĵo",
           priskribo: "Subtenas la Volontulan Servon, kadre de kiu esperantistoj" +
                      "laboras kaj spertiĝas en la Centra Oficejo de UEA",
           donaco: 5
         },
         {
           nomo: "Volontula Domo",
           priskribo: "Subtenas kaj financas la Volontulan Domon",
           donaco: 5
         },
         {
           nomo: "Junularo",
           priskribo: "Subtenas TEJO, la junularan sekcion de UEA",
           donaco: 5
         },
         {
           nomo: "Konto Espero",
           priskribo: "Helpas esperantistajn viktimojn"+
                      " de militoj kaj naturaj katastrofoj",
           donaco: 0
         },
         {
           nomo: "Afriko",
           priskribo: "Helpas la laboron por disvastigi Esperanton en Afriko",
           donaco: 0
         },
         {
           nomo: "Ameriko",
           priskribo: "Helpas la Sud- kaj Centran Amerikan Esperanto-movadon",
           donaco: 0
         },
         {
           nomo: "Azio",
           priskribo: "Subtenas la disvastigon de Esperanto en Azio",
           donaco: 0
         },
         {
           nomo: "Universala Kongreso",
           priskribo: "Subteno por la organizado de Universala Kongreso" +
                      " de Esperanto",
           donaco: 0
         },
         {
           nomo: "Belarta Fondaĵo",
           priskribo: "Subtenas la Belartajn Konkursojn de UEA",
           donaco: 0
         },
         {
           nomo: "Biblioteka Fondaĵo",
           priskribo: "Akceptas donacojn por ebligi ordigadon kaj katalogadon"
                       + " de Biblioteko Hector Hodler",
           donaco: 0
         },
         {
           nomo: "CED",
           priskribo: "Subtenas la agadon de Centro de Esploro" +
                      " kaj Dokumentado",
           donaco: 0
         },
         {
           nomo: "Grabowski",
           priskribo: "Subtenas Esperanto-kulturon per premioj kaj subvencioj," +
                      " kaj per kuraĝigo de junaj verkistoj",
           donaco: 0
         },
         {
           nomo: "Unesko",
           priskribo: "Subtenas la agadon de UEA ĉe Unesko",
           donaco: 0
         },
         {
           nomo: "Oficeja Ilaro",
           priskribo: "Servas por ekipi la Centran Oficejon de" +
                      " UEA per modernaj laborhelpiloj",
           donaco: 0
         },
         {
           nomo: "Informado",
           priskribo: "Financas informan agadon pri Esperanto" +
                      " (flugfolioj, afiŝoj, anoncoj)",
           donaco: 0
         },
         {
           nomo: "Novjorka Oficejo",
           priskribo: "Donacu 10 USD por iĝi Amiko de la oficejo, 25 USD por" +
                      " Subtenanto aŭ 100 USD por Patrono",
           donaco: 0
         },
         {
           nomo: "Wüster",
           priskribo: "Helpas financi la aktivadon de UEA por evoluigi" +
                       " la Esperanto-terminologion de diversaj fakoj",
           donaco: 0
         }
       ];
     }

     $scope.updateEntuto();
   }

   $scope.updateEntuto = function () {
     $window.scrollTo(0, 0);
     $scope.entuto = 0;
     for(var i = 0; i < $scope.fondajxoj.length; i++) {
       $scope.entuto += $scope.fondajxoj[i].donaco;
     }
     $rootScope.entutoDonaco = $scope.entuto;
   }
});
