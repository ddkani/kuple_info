angular.module('kuple_info')

.controller('loginController', function (APIFactory, $scope) {

    $scope.click = {};
    $scope.formLogin = {
        userid : '', password : ''
    };

    $scope.click.login = function () {

        function callbackLogin (result, data) {
            if (!result) alert("로그인 실패");
            else location.href = '/admin/haksik'
        }

        APIFactory.doLogin(callbackLogin, $scope.formLogin);
    }



});