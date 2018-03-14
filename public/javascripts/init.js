angular.module('kuple_info', ['ui.bootstrap']);


function getInputDayLabel() { var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'); var today = new Date('2014-12-25').getDay(); var todayLabel = week[today];
return todayLabel.slice(0, 1); }


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // return [year, month, day].join('.') + ' ' + getInputDayLabel();

    return year + '. ' + month + ' .' + day + ' ' + getInputDayLabel();
}