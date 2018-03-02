let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/haksik', function(req, res, next) {
    res.render('mobile/haksik')
});

module.exports = router;
