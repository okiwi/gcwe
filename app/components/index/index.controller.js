(function () {
    'use strict';

    angular
        .module('app')
        .controller('index', IndexController);

    IndexController.$inject = ['$firebaseArray', 'logger'];

    function IndexController($firebaseArray, logger) {
        var vm = this;

        var ref = new Firebase("https://gcwe.firebaseio.com/users");

        vm.users = $firebaseArray(ref);

        vm.addUser = function () {
            if (vm.sure && vm.username) {
                vm.users.$add({
                    name: vm.username
                }).then(function (response) {
                    logger.success('Vous êtes bien inscrit au Geek Camp 2015. Restez connecté sur <a href="https://twitter.com/okiwi_fr">twitter</a> (@okiwi_fr)', 'Inscription réussie');
                });
            } else if (vm.username) {
                logger.error("Inscrivez-vous que si vous êtes sur de venir")
            } else {
                logger.error("Le champ Nom est obligatoire")
            }
        };
    }
})();
