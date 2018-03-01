angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('adminHaksikController', function (APIFactory, $scope) {

    var datePicker = $('#date-picker');

    $scope.message = {
        'CONFIRM_DELETE_CORNER' : '해당 코너를 삭제 하시겠습니까?'
    };

    $scope.loopMeal = [['breakfirst', "아침"], ['launch', "점심"], ['dinner', "저녁"]];

    var ObjMeal = {
        breakfirst : [],
        launch : [],
        dinner : []
    };
    var ObjCorner = {
        name : '',
        dish : '',
        side : ''
    };

    // haksik data
    $scope.haksik = {
        truth : {
            breakfirst : [{
                name : '코너 이름',
                dish : 'dish 이름',
                side : 'side 이름'
            }, {
                name : '코너 이름',
                dish : 'dish 이름',
                side : 'side 이름'
            },{
                name : '코너 이름',
                dish : 'dish 이름',
                side : 'side 이름'
            }],
            launch : [{

            }],
            dinner : [{

            }]
        },
    };

    $scope.select = {
        gwan : ''
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
         
    };


    // Gwan -> Meal -> Corner -> (name, dish, side)


    function callback_retriveData(err, data) {

        if (err) alert("error: " + err);
        if (!data) {
            alert('데이터 없음')
        }
        else {
            alert('데이터 있음');
            console.log(data)
        }
    }



    function init() {
        // initialize datetimepicker
        datePicker.datetimepicker({
            format : 'YYYY. MM. DD',
            defaultDate: moment.now(),
            // useCurrent : false
        }).on('dp.change', function (e) {
            // alert(e.date)
            console.log(e.date);
            APIFactory.retriveData(callback_retriveData, e.date, 'haksik')
        });

        $scope.select.gwan = 'truth';
    }
    init();






});

