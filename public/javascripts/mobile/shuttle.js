angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('mobileShuttleController', function (APIFactory, $scope) {

    /* TODO
    select (학교 or 조치원)


    */


    var type = 'shuttle';

    $scope.shuttle = {};
    $scope.def = false;

    $scope.click = {
        changeLocation : function (location) {
            $scope.select.location = location;
        }
    };

    $scope.get = {
        // 가장 가까운 배차시간
        nearTime : function () {
            /*
            shuttle.weekend[] => jochiwon or school

            */
        },

        // 다음 배차까지의 간격
        gap : function () {
            // get nearTime => calc gap!
        },

        location: function () {
            switch ($scope.select.location) {
                case 'jochiwon': return "조치원역";
                case 'school': return "학교";
            }
        },

        week: function () {
            var weekday = new Array(7);
            weekday[0] =  "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            return weekday[new Date().getDay()]
        }
    };

    $scope.date = formatDate(new Date());
    $scope.select = {
        location : null
    };


    function callback_retriveData(err, data) {
        waitingDialog.hide();
        if (err) alert("알수없는 오류가 발생했습니다. 페이지를 새로고침 해주세요.");
        if (!data) return;
        else {
            $scope.def = true;
            console.log("retriveData OK: received.");
            $scope.haksik = angular.copy(data);
        }
    }

    function init() {
        console.log('init');
        $scope.select.location = 'school';

        waitingDialog.show('불러오는중...');
        APIFactory.retriveData(callback_retriveData, type, new Date());
    }
    init();


});

