angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('adminHaksikController', function (APIFactory, $scope) {

    var datePicker = $('#date-picker');
    var type = 'haksik';
    var DORMURL = 'http://dorm.ourhome.co.kr/reqKoSJ.aspx';

    $scope.message = {
        CONFIRM_DELETE_CORNER : '해당 코너를 삭제 하시겠습니까?',
        LOADFAILED : '서버 연동 실패. 페이지를 새로고침 해주세요.',
        LOADOK : '서버 연동 완료.'
    };

    $scope.loopGwan = [['future', '미래관'], ['truth', '진리관'], ['professor', '교직원식당']];
    $scope.loopMeal = [['breakfirst', "아침"], ['launch', "점심"], ['dinner', "저녁"]];

    $scope.ObjMeal = {
        breakfirst : [],
        launch : [],
        dinner : []
    };
    $scope.ObjCorner = {
        name : '',
        dish : '',
        side : ''
    };

    // haksik data
    $scope.haksik = {

    };

    $scope.select = {
        date : '',
        gwan : ''
    };


    $scope.obj = {};
    $scope.obj.init = function () {
        const h = $scope.haksik;

        for (var i in $scope.loopGwan) {
            const p = $scope.loopGwan[i][0];
            h[p] = angular.copy($scope.ObjMeal);
        }
    };
    $scope.obj.addCourse = function (meal) {
        const m = $scope.haksik[$scope.select.gwan][meal];
        m.push(angular.copy($scope.ObjCorner))
    };


    $scope.click = {};
    $scope.click.changeGwan = function (gwan) {
        $scope.select.gwan = gwan
    };
    $scope.click.deleteCourse = function (meal, idx) {
        console.log(meal, idx);
        // know selected gwan
        if (confirm($scope.message.CONFIRM_DELETE_CORNER)) {
            const m = $scope.haksik[$scope.select.gwan][meal];
            m.splice(idx, 1);
            // $scope.$apply();
        }
    };
    $scope.click.addCourse = function (meal) {
        $scope.obj.addCourse(meal);
    };
    $scope.click.save = function () {
        if (confirm("이대로 저장할까요?")) {
            waitingDialog.show("Processing API...");
            APIFactory.saveData(callback_saveData, getDate(), type, $scope.haksik)
        }
    };
    $scope.click.delete = function () {
        if (confirm("정말 삭제합니까?")) {
            if ($scope.haksik._id === undefined) $scope.haksik.init();
            else {
                waitingDialog.show('Processing API...');
                APIFactory.deleteData(callback_deleteData, type, getDate());
            }
        }
    };

    $scope.click.goDorm = function () {
        window.open(DORMURL);
    };


    // Gwan -> Meal -> Corner -> (name, dish, side)


    function callback_retriveData(err, data) {
        waitingDialog.hide();        
        if (err) alert("error: " + err);
        if (!data) {
            $scope.obj.init();
            $.notify({
                message: "저장한 학식 정보가 없으므로 새로 만듭니다."
            }, {
                // settings
                type: 'danger',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
        }
        else {
            $scope.haksik = angular.copy(data);
            $.notify({
                message: "학식 정보를 불러왔습니다."
            }, {
                // settings
                type: 'success',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
        }
    }

    function callback_saveData(err, data) {
        waitingDialog.hide();
        if (err || !data) {
            $.notify({
                message: $scope.message.LOADFAILED
            }, {
                // settings
                type: 'danger',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
        }
        else {
            $.notify({
                message: $scope.message.LOADOK
            }, {
                // settings
                type: 'success',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
        }
    }


    function callback_deleteData(err, data) {
        waitingDialog.hide();
        if (err || !data) {
            $.notify({
                message: $scope.message.LOADFAILED
            }, {
                // settings
                type: 'danger',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
        }
        else {
            $.notify({
                message: "삭제했습니다."
            }, {
                // settings
                type: 'success',
                allow_dismiss: false,
                delay: 2000,
                // width: "50%"
            });
            APIFactory.retriveData(callback_retriveData, type, getDate())
        }
    }

    function getDate() {
        var d = datePicker.datepicker('getDate');
        console.log('getDate() : ' + d);
        return d;
        // var d = datePicker.data("DateTimePicker").date();
        // console.log(d);
        // return d;
    }


    function init() {
        // initialize datetimepicker
        datePicker.datepicker({});
        datePicker.datepicker("setDate", "today");

        datePicker.on('changeDate', function (ev) {
            console.log(ev.date);
            waitingDialog.show("Processing API...");
            APIFactory.retriveData(callback_retriveData, type, ev.date);
        });

        $scope.select.gwan = 'future';
        APIFactory.retriveData(callback_retriveData, type, getDate())
        // $scope.obj.init()
    }
    init();






});

