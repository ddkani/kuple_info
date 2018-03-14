const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin/login')
});

router.get('/haksik', function (req, res, next) {
    if (req.session.user === 'admin') res.render('admin/haksik', {admin: true});
    else res.redirect('/admin')
});


router.get('/shuttle', function (req, res, next) {
    if (req.session.user === 'admin') res.render('admin/shuttle', {admin: true});
    else res.redirect('/admin')
});


// router.get('/haksik_test', function (req, res, next) {
//     if (req.session.user === 'admin')
//     res.render('admin/haksik_test', {admin: true});
//     else res.redirect('/admin')
// });


module.exports = router;
