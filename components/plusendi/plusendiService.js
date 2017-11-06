app.service('plusendiService', function ($http, config) {
    var service = this;

    service.getPerantoByLando = getPerantoByLando;
    service.postMesagxi = postMesagxi;
    service.postUzanto = postUzanto;
    service.postGrupo = postGrupo;

    function getPerantoByLando(idLando) {
        return $http.get(config.api_url + "/perantoj?idLando=" + idLando);
    };


    function postMesagxi(data) {
        return $http.post(config.api_url + '/financoj/mesagxi', data);
    };


    function postUzanto(data) {
        return $http.post(config.api_url + '/uzantoj', data);
    };

    function postGrupo(idMembro, data) {
        return $http.post(config.api_url + '/grupoj/' + idMembro + '/anoj', data);
    }

    return service;
});