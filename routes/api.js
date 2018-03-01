const express = require('express');
const router = express.Router();

const models = require('./models');
const AdminUser = models.AdminUserModel;
const HaksikModel = models.HaksikModel;
const HaksikDetail = models.HaksikDetailModel;

// https://stackoverflow.com/questions/33383207/mongoose-casterror-cast-to-array-failed-for-value-when-trying-to-save-a-model

router.get('/create_haksik', function (req, res, next) {


    const d = {
        date : new Date().setHours(0,0,0,0),
        truth : {
            breakfirst: [
                {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
                {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
            ],
            dinner : [
                {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
                {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
            ]
        },

        professor : {
            launch : [
                {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
                {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
            ]
        }
    };


    const haksik = models.HaksikModel(d);
    // const test = ;

    // haksik.breakfirst = test;
    // haksik.date = new Date().setHours(0,0,0,0);
    haksik.save(function (err) {
        if (err) { next(err); return; }
        res.send(haksik);
    });

});

router.get('/create_user', function (req, res, next) {

    let adminUser = new AdminUser({userid : 'admin', password : 'password'});
    adminUser.save(function (err) {
        if (err) { next(err); return }

        res.json({result : true})
    })
});


router.post('/login', function(req, res, next) {

    let result = {result: true};
    AdminUser.findOne(req.body, function (err, adminUser) {
        if (err) { next(err);  return }

        if (!adminUser) {result.result = false; res.json(result)}
        else res.json(result)
    });

});



router.post('/retrive', function (req, res, next) {

    let type = req.body.type;
    let date = new Date(req.body.date);

    date.setHours(0,0,0,0);

    switch (type) {
        case 'haksik':
            HaksikModel.findOne({date: date}, function (err, haksik) {
                if (err) { next(err); return }
                res.send(haksik)
            });
            break;

        default:
            res.send('')

    }


});

module.exports = router;
