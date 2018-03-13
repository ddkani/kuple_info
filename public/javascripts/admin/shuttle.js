angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('adminShuttleController', function (APIFactory, $scope) {

    var datePicker = $('#date-picker');
    var type = 'shuttle';
    var SHUTTLEURL = 'http://sejong.korea.ac.kr/campuslife/facilities/shuttle_bus';

    // TODO : create notify service! (코드가 길어져서 보기에 좋지 않음.)
    $scope.opt = {}; // TODO -> migration to service or factory!
    $scope.click = {};
    $scope.callback = {};

    $scope.loopWeek = [['weekday', '평일'], ['weekend', '주말']];
    $scope.loopDest = [['school', '학교'], ['jochiwon', '조치원역']];

    $scope.ObjTable = {
        departureTime : null,
        arrivalTime : null
    };
    $scope.ObjList = {
        // array (school, jochiwon)

        // jochiwon : [],
        // campus : []
    };
    $scope.ObjShuttle = {
        weekday : [],
        weekend : []
    };

    $scope.shuttle = {
    };


    $scope.obj = {};
    $scope.obj.init = function () {
        // ??
        $scope.shuttle = angular.copy($scope.ObjShuttle);

        const h = $scope.shuttle;

        // for (var i in $scope.loopWeek) {
        //     const p = $scope.loopWeek[i][0];
        //     h[p]
        // }

    };


    $scope.msg = {

    };

    // weekday - 평일 / weekend - 주말
    $scope.sel = {
        week : 'weekday'
    };


    $scope.click.changeSelection = function (sel) { $scope.sel = sel; };
    $scope.click.save = function () {

    };
    $scope.click.delete = function (index) {

    };


    $scope.callback.retriveData = function (err, data) {
        if (err) {

        }
        else if (!data) {

        }
        else {

        }
    };
    $scope.callback.saveData = function (err, data) {
        if (err) {

        }
        else if (data) {

        }
        else {

        }
    };



    function init() {

        APIFactory.retriveData($scope.callback.retriveData, type, null)
        // TODO
        /*
        1. retrive current stored information from server
        2. exist :: prepare it! (ng-model)
        3. not exist -> obj.init()
        4. save!


        */

        // initialize datetimepicker
        // datePicker.datetimepicker({
        //     format : 'YYYY. MM. DD',
        //     defaultDate: moment.now(),
        //     // useCurrent : false
        // }).on('dp.change', function (e) {
        //     // alert(e.date)
        //     console.log(e.date);
        //     waitingDialog.show("Processing API...");
        //     APIFactory.retriveData(callback_retriveData, e.date, 'haksik')
        // });
        //
        //
        // $scope.select.gwan = 'future';
        // APIFactory.retriveData(callback_retriveData, getDate(), 'haksik')
        // $scope.obj.init()
    }
    init();






});

