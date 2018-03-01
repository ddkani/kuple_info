angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('adminShuttleController', function (APIFactory, $scope) {

    var datePicker = $('#date-picker');
    var type = 'shuttle';
    var SHUTTLEURL = 'http://sejong.korea.ac.kr/campuslife/facilities/shuttle_bus';

    $scope.opt = {}; // TODO -> migration to service or factory!

    $scope.shuttle = {

    };

    $scope.msg = {

    };

    // 0 - 평일 / 1 - 주말
    $scope.sel = {
        week : 0
    };

    $scope.click = {};
    $scope.click.save = function () {

    };

    
    function init() {
        // initialize datetimepicker
        datePicker.datetimepicker({
            format : 'YYYY. MM. DD',
            defaultDate: moment.now(),
            // useCurrent : false
        }).on('dp.change', function (e) {
            // alert(e.date)
            console.log(e.date);
            waitingDialog.show("Processing API...");
            APIFactory.retriveData(callback_retriveData, e.date, 'haksik')
        });


        $scope.select.gwan = 'future';
        APIFactory.retriveData(callback_retriveData, getDate(), 'haksik')
        // $scope.obj.init()
    }
    init();






});

