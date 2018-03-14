let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/haksik', function(req, res, next) {
    res.render('mobile/haksik')
});


router.get('/shuttle', function(req, res, next) {
    res.render('mobile/shuttle')
});



module.exports = router;
