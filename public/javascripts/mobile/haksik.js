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
        $scope.select.meal = 'launch';

        waitingDialog.show('불러오는중...');
        APIFactory.retriveData(callback_retriveData, type, new Date());
    }
    init();


});

