let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/haksik', function(req, res, next) {
    res.render('mobile/haksik', {title : '쿠플존 - 오늘의 학식'})
});


router.get('/shuttle', function(req, res, next) {
    res.render('mobile/shuttle', {title : '쿠플존 - 셔틀버스 시간표'})
});



module.exports = router;
