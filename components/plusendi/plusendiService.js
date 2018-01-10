app.service('plusendiService', function ($http, config) {
    var service = this;

    service.getPerantoByLando = getPerantoByLando;
    service.postMesagxi = postMesagxi;
    service.postUzanto = postUzanto;
    service.postMembreco = postMembreco;

    function getPerantoByLando(idLando) {
        return $http.get(config.api_url + "/perantoj?idLando=" + idLando);
    };

    function postMesagxi(data) {
        return $http.post(config.api_url + '/financoj/mesagxi', data);
    };

    function postUzanto(data) {
        return $http.post(config.api_url + '/uzantoj', data);
    };

    function postMembreco(idGrupo, data) {
        return $http.post(config.api_url + '/grupoj/' + idGrupo + '/anoj', data);
    }

    return service;
});
