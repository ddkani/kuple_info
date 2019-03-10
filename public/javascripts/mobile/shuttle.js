angular.module('kuple_info')


// http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format


.controller('mobileShuttleController', function (APIFactory, $scope, $anchorScroll, $location) {

    /* TODO
    select (학교 or 조치원)


    */


    var type = 'shuttle';

    $scope.time = new Date();
    // $scope.time = new Date("Wed Mar 14 2018 19:55:13 GMT+0900 (KST)");
    $scope.shuttle = {};
    $scope.def = false;

    $scope.click = {
        changeLocation : function (location) {
            $scope.select.location = location;
        }
    };


    $scope.formatTime = function (t) {
        try {
            return t.getHours() + "시 " + t.getMinutes() + "분"
        } catch (ex) {
            t = new Date(t);
            if ((t.getHours() + t.getMinutes()) === 0) return "";
            return t.getHours() + "시 " + t.getMinutes() + "분"
        }
    };

    // test : Wed Mar 14 2018 22:55:13 GMT+0900 (KST)
    // test : Wed Mar 14 2018 19:55:13 GMT+0900 (KST)

    $scope.get = {
        // 가장 가까운 배차시간
        nearTime : function () {
            /*
            shuttle.weekend[] => jochiwon or school
            */

            // 토요일은 고려하지 않아도 됩니다.
            console.log('nearTime');

            // var week = $scope.get.week() !== 'Sunday' ? 'weekday' : 'weekend';
            var week = $scope.get.week();
            var loc = $scope.select.location;

            // var cur = new Date();
            // var cur = new Date("Wed Mar 14 2018 19:55:13 GMT+0900 (KST)");
            var cur = $scope.time;
            var chk = (cur.getHours() * 60) + cur.getMinutes();


            for (var i in $scope.shuttle[week]) {
                var t = new Date($scope.shuttle[week][i][loc]);

                // 12:00 AM!
                if ((t.getHours() + t.getMinutes()) === 0) continue;

                var _chk = (t.getHours() * 60) + t.getMinutes();
                if ((_chk - chk) < 0) continue;

                console.log(t);

                $scope.select.index = Number(i);

                $location.hash('time-' + i);
                $anchorScroll();

                return t;
            }

        },

        // 다음 배차까지의 간격
        gap : function () {
            var next = $scope.get.nearTime();
            if (next === null) return null;
	    var n = (next.getHours() * 60) + next.getMinutes();
            var c = ($scope.time.getHours() * 60) + $scope.time.getMinutes();

            return n - c;
        },

        location: function () {
            switch ($scope.select.location) {
                case 'jochiwon': return "조치원역";
                case 'school': return "학교";
            }
        },

        week: function () {
            // 2018. 03. 16 Patched
            // 평일과 주말 구분 외에도 금요일을 추가했습니다.

            var w = $scope.time.getDay();
            var r = "";

            switch (w) {
                case 0: r = "weekend"; break;
                case 5: r = "friday"; break;
                case 6: r = "Saturday"; break;
                default: r = "weekday"; break;
            }

            console.log(r);
            return r;

            // var weekday = new Array(7);
            // weekday[0] =  "Sunday";
            // weekday[1] = "Monday";
            // weekday[2] = "Tuesday";
            // weekday[3] = "Wednesday";
            // weekday[4] = "Thursday";
            // weekday[5] = "Friday";
            // weekday[6] = "Saturday";

            // return weekday[new Date().getDay()]
        },
    };

    $scope.select = {
        location : null,
        index : 0
    };


    function callback_retriveData(err, data) {
        waitingDialog.hide();
        if (err) alert("알수없는 오류가 발생했습니다. 페이지를 새로고침 해주세요.");
        if (!data) return;
        else {
            console.log(data);
            $scope.def = true;
            console.log("retriveData OK: received.");
            $scope.shuttle = angular.copy(data);
        }
    }

    function init() {
        console.log('init');
        $scope.select.location = 'school';

        waitingDialog.show('불러오는중...');
        APIFactory.retriveData(callback_retriveData, type, new Date());

        setTimeout(function () { location.reload(); }, 60000);
    }
    init();


});

