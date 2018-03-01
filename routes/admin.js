const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin/login')
});

router.get('/haksik', function (req, res, next) { res.render('admin/haksik'); });
router.get('/shuttle', function (req, res, next) { res.render('admin/shuttle'); });

module.exports = router;
