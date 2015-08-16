(function () {
    'use strict';

    angular
        .module('app')
        .controller('index', IndexController);

    IndexController.$inject = ['$firebaseArray'];

    function IndexController($firebaseArray) {
        var vm = this;

        var ref = new Firebase("https://gcwe.firebaseio.com/users");

        vm.users = $firebaseArray(ref);

        vm.addUser = function () {
            vm.users.$add({
                name: vm.username
            });
        };

    }
})();
