angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('adminShuttleController', function (APIFactory, $scope) {

    // https://angular-ui.github.io/bootstrap/#!#getting_started

    var type = 'shuttle';
    var SHUTTLEURL = 'http://sejong.korea.ac.kr/campuslife/facilities/shuttle_bus';

    // TODO : create notify service! (코드가 길어져서 보기에 좋지 않음.)
    $scope.opt = {}; // TODO -> migration to service or factory!
    $scope.click = {};
    $scope.callback = {};

    $scope.loopWeek = [['weekday', '평일'], ['weekend', '주말']];
    $scope.loopDest = [['school', '학교'], ['jochiwon', '조치원역']];

    $scope.ObjTable = {
        // departureTime : null,
        // arrivalTime : null
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
        $scope.shuttle['weekday'].push({
            school : new Date(),
            jochiwon : new Date()
        });
        $scope.shuttle['weekend'].push({
            school : new Date(),
            jochiwon : new Date()
        })
        // $scope.shuttle['weekday']['jochiwon'] = [];
        // $scope.shuttle['weekday']['school'] = [];
        //
        // $scope.shuttle['weekend']['jochiwon'] = [];
        // $scope.shuttle['weekend']['school'] = [];


        // const h = $scope.shuttle;

        // for (var i in $scope.loopWeek) {
        //     const p = $scope.loopWeek[i][0];
        //     h[p]
        // }

    };


    $scope.msg = {

    };

    // weekday - 평일 / weekend - 주말
    $scope.sel = {
        week : ''
    };


    $scope.click.changeSelection = function (sel) { $scope.sel.week = sel; };
    $scope.click.save = function () {

    };
    $scope.click.delete = function (index) {
        // delete $scope.shuttle[$scope.sel.week][index];
        var t = $scope.shuttle[$scope.sel.week];
        t.splice(index, 1);
    };
    $scope.click.add = function () {
        console.log('add');
        $scope.shuttle[$scope.sel.week].push({
            school : new Date(),
            jochiwon : new Date()
        })
        // $scope.shuttle[$scope.sel.week]["school"].push(new Date());
        // $scope.shuttle[$scope.sel.week]["jochiwon"].push(new Date());
        // $scope.shuttle[$scope.sel.week].push('123');
    };


    $scope.callback.retriveData = function (err, data) {
        waitingDialog.hide();
        if (err) alert("error : " + err);
        else if (!data) {
            // 데이터 없음
            console.log('d not exist: $scope.obj.init()');
            $.notify({
                message: "저장한 셔틀버스 시간표가 없으므로 새로 만듭니다."
            }, {
                // settings
                type: 'danger',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
            $scope.obj.init();
        }
        else {
            // 데이터 있음
            console.log('d exist');
            $.notify({
                message: "셔틀버스 시간표를 불러왔습니다."
            }, {
                // settings
                type: 'success',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
            $scope.shuttle = angular.copy(data);
        }
    };
    $scope.callback.saveData = function (err, data) {
        waitingDialog.hide();
        if (err) {

        }
        else if (data) {

        }
        else {

        }
    };



    function init() {
        $scope.sel.week = 'weekday';
        waitingDialog.show("Progress API...");
        APIFactory.retriveData($scope.callback.retriveData, type, null);

        // $('#timepicker1').timepicker();


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

