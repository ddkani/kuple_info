const express = require('express');
const router = express.Router();
const deepcopy = require('deepcopy');

const models = require('./models');
const AdminUser = models.AdminUserModel;
const HaksikModel = models.HaksikModel;
// const HaksikDetail = models.HaksikDetailModel;
const ShuttleModel = models.ShuttleModel;

// https://stackoverlow.com/questions/33383207/mongoose-casterror-cast-to-array-failed-for-value-when-trying-to-save-a-model

// router.get('/create_haksik', function (req, res, next) {
//
//
//     const d = {
//         date : new Date().setHours(0,0,0,0),
//         truth : {
//             breakfirst: [
//                 {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
//                 {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
//             ],
//             dinner : [
//                 {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
//                 {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
//             ]
//         },
//
//         professor : {
//             launch : [
//                 {name : '코너1', dish : '뚝)콩나물밥/달레양념장', side : '무채국, 야채튀김, 단무지, 배추김치'},
//                 {name : '코너2', dish : '청양풍닭고기덮밥', side : '무채국, 야채튀김, 단무지, 배추김치'}
//             ]
//         }
//     };
//
//
//     const haksik = models.HaksikModel(d);
//     // const test = ;
//
//     // haksik.breakfirst = test;
//     // haksik.date = new Date().setHours(0,0,0,0);
//     haksik.save(function (err) {
//         if (err) { next(err); return; }
//         res.send(haksik);
//     });
//
// });
//
// router.get('/create_user', function (req, res, next) {
//
//     let adminUser = new AdminUser({userid : 'admin', password : 'password'});
//     adminUser.save(function (err) {
//         if (err) { next(err); return }
//
//         res.json({result : true})
//     })
// });


router.post('/login', function(req, res, next) {

    let result = {result: true};
    AdminUser.findOne(req.body, function (err, adminUser) {
        if (err) { next(err);  return }

        if (!adminUser) {result.result = false; res.json(result)}
        else {
            req.session.user = 'admin';
            res.json(result);
        }
    });

});


router.get('/logout', function (req, res, next) {
   req.session.destroy();
   res.redirect('/admin');
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

        case 'shuttle':
            ShuttleModel.findOne({}, function (err, shuttle) {
                if (err) { next(err); return }
                res.send(shuttle);
                // if (!Shuttle) res.json({result : false});
                // else res.json({result : true, data : })
            });
            break;

        default:
            res.send('')
    }
});


router.post('/save', function (req, res, next) {

    if (req.session.user !== 'admin') { res.json({result : false}); return; }

    let type = req.body.type;

    switch (type) {
        case 'haksik':
            const haksik = req.body.data;
            // haksik.date = new Date(haksik.date);
            haksik.date = new Date(req.body.date);
            haksik.date.setHours(0, 0, 0, 0); // year, month, date만 저장합니다.

            let _date = deepcopy(haksik.date);
            _date.setDate(_date.getDate() + 1);

            // "$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}

            HaksikModel.findOne({date : {$gte : haksik.date, $lt : _date}}, (err, _haksik) => {
                if (err) {
                    next(err); return }
                if (_haksik) { // exist : update
                    delete _haksik._id;
                    HaksikModel.findByIdAndUpdate(_haksik._id, haksik, (err, _res) => {
                        if (err) {
                            next(err); return }
                        res.json({result : true});
                    });
                }
                else { // not exist : create
                    delete haksik._id;
                    const _haksik = new HaksikModel(haksik);
                    _haksik.save((err) => {
                        if (err) {
                            next(err); return }
                        res.json({result : true});
                    })
                }
            });
            break;

        case 'shuttle':
            const shuttle = req.body.data;

            if (shuttle.hasOwnProperty('_id')) {
                ShuttleModel.findByIdAndUpdate(shuttle._id, shuttle, function (err, doc) {
                    if (err) next(err);
                    else if (!doc) res.json({result : false});
                    else res.json({result : true});
                })
            }

            else {
                const _shuttle = new ShuttleModel(shuttle);
                _shuttle.save((err) => {
                    if (err) {
                        next(err); return }
                    res.json({result : true});
                });
            }
            break;

        default:
            res.send('')
    }

    // let type = req.body.type;
    // let date = new Date(req.body.date);
    //
    // date.setHours(0,0,0,0);
    //
    // switch (type) {
    //     case 'haksik':
    //         const haksik = req.body.data;
    //         haksik.date = date;
    //
    //         if (haksik.hasOwnProperty('_id')) {
    //             HaksikModel.findByIdAndUpdate(haksik._id, haksik, function (err, doc) {
    //                 if (err) next(err);
    //                 else if (!doc) res.json({result : false});
    //                 else res.json({result : true});
    //             })
    //         }
    //         else {
    //             const _haksik = new HaksikModel(haksik);
    //             _haksik.save(function (err) {
    //                 if (err) next(err);
    //                 else res.json({result : true});
    //             });
    //         }
    //
    //         // HaksikModel.findById(haksik, function (err, doc) {
    //         //    if (err) res.json({result : false});
    //         //    else if (!doc) { // not created
    //         //         const _haksik = new HaksikModel(haksik);
    //         //         _haksik.save(function (err) {
    //         //             if (err) next(err);
    //         //             else res.json({result : true});
    //         //         });
    //         //    }
    //         //    else { // update it!
    //         //        HaksikModel.findByIdAndUpdate(haksik._id, haksik, function (err, doc) {
    //         //            if (err) next(err);
    //         //            else res.json({result : true});
    //         //        });
    //         //    }
    //         // });
    //         // res.json({result : true});
    //         // HaksikModel.findOne({date: date}, function (err, haksik) {
    //         //     if (err) { next(err); return }
    //         //     res.send(haksik)
    //         // });
    //         break;
    //
    //     default:
    //         res.send('')
    // }
});


// router.post('/delete', function (req, res, next) {
//     let type = req.body.type;
//     let date = req.body.date;
//
//     switch (type) {
//         case 'haksik':
//             HaksikModel.findOneAndRemove({date : date}, function (err) {
//                 if (err) next(err);
//                 else res.json({result : true});
//             });
//
//             break;
//
//         default:
//             res.send('')
//     }
// });


module.exports = router;
