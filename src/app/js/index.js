require("babel-polyfill");

const angular = require("angular");

const app = angular.module("App", []);

(function (app) {
    app.controller("AppController", AppController);

    function AppController(
        $log
        , $http
    ) {
        let vm = this;

        $log.debug("Iniciando aplicação!");

        vm.user = "World from babel + browserify!";
        vm.carregando = 0;

        vm.click = () => {
            $log.debug("Fazendo a requisição.");

            vm.carregando++;

            return $http.get("/api/helloworld")
                .then(function (response) {
                    var obj = response.data;
                    $log.debug(response);
                    vm.user = obj.hello;
                }, function (response) {
                    $log.error("Deu muito ruim.", response);
                })
                .finally(function () {
                    $log.debug("Chegou a resposta.");
                    vm.carregando--;
                });
        };

        return vm;
    }
    AppController.$inject = [
        "$log"
        , "$http"
    ];
})(app);