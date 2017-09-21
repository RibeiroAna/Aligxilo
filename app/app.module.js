var app = angular.module('wizardApp', ['ui.router'])

// Configuring our states
// =============================================================================
app.config(['$stateProvider', '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/form/personal');

        $stateProvider
            // PARENT STATE: form state
            .state('form', {
                url: '/form',
                templateUrl:  'template/form.htm',
                controller: 'formCtrl'
              })

            // NESTED STATES: child states of 'form' state
            // URL will become '/form/personal'
            .state('form.personal', {
                url: '/personal',
                component: 'personalComponent'
            })

            // URL will become /form/work
            .state('form.work', {
                url: '/work',
                component: 'workComponent'
            })

            // URL will become /form/address
            .state('form.address', {
                url: '/address',
                component: 'addressComponent'
            })

            // URL will become /form/result
            .state('form.result', {
                url: '/result',
                component: 'resultComponent'
            })
    }
]);
