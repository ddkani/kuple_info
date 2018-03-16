angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('mobileHaksikController', function (APIFactory, $scope) {

    $scope.haksik = {};
    $scope.select = {
        tab : '',
        meal : ''
    };

    $scope.date = formatDate(new Date());
    var type = 'haksik';


    $scope.click = {};
    $scope.click.tab = function (t) {
        console.log(t);
        $scope.select.tab = t;
    };
    $scope.click.meal = function (m) {
        console.log(m);
        $scope.select.meal = m;
    };


    function getMealTime() {
        var d = new Date();
        var h = d.getHours();

        /*
        아침 21~10
        점심 10~15
        저녁 15~21
        */

        if ((h >= 21) && (h < 10)) return "breakfirst";
        if ((h >= 10) && (h < 15)) return "launch";
        if ((h >= 15) && (h < 21)) return "dinner";

    }


    function callback_retriveData(err, data) {
        waitingDialog.hide();
        if (err) alert("error: " + err);
        // alert(data);
        if (!data) {
            $scope.haksik = null;
        }
        else {
            $scope.haksik = angular.copy(data);
        }
    }

    function init() {
        console.log('init');

        $scope.select.tab = 'future';
        $scope.select.meal = getMealTime();

        waitingDialog.show('불러오는중...');
        APIFactory.retriveData(callback_retriveData, type, new Date());
    }
    init();


});

