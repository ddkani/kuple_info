// http://jdm.kr/blog/21

const mongoose = require('mongoose');
const db = require('./db').db;

// 스키마 작성 -> 모델 작성 -> 사용

const adminUserSchema = mongoose.Schema({
    userid : String,
    password : String
}, { collection : 'AdminUser'});
// adminUserSchema.methods.doLogin = function () {
//
// };
// custom method -> 모델 작성 이전 정
const AdminUserModel = db.model("AdminUser", adminUserSchema);



// 현재 방법으로 작업할 경우 haksikDetailSchema는 저장되지 않는다.
const haksikEachSchema = mongoose.Schema({
    name : String,
    dish : String,
    // side : [{type : String}]
    // side : [String]
    side : String
}, { collection : 'HaksikDetailModel'});
const HaksikDetailModel = db.model('HaksikEach', haksikEachSchema);



const haksikGwanSchema = mongoose.Schema({
    breakfirst : [haksikEachSchema],
    launch : [haksikEachSchema],
    dinner : [haksikEachSchema]
});
const HaksikGwanModel = db.model('HaksikGwan', haksikGwanSchema);


// nested된 문서에서 이전 개발문제 : nested 된 데이터 내부 쿼리 옵션?
const haksikSchema = mongoose.Schema({
    date : Date,
    // breakfirst : [{type: mongoose.Schema.ObjectId, ref:'HaksikDetail'}],
    // launch : [{type: mongoose.Schema.ObjectId, ref:'HaksikDetail'}],
    // dinner : [{type: mongoose.Schema.ObjectId, ref:'HaksikDetail'}]

    truth : haksikGwanSchema, // 진리관
    future: haksikGwanSchema, // 미래관
    professor : haksikGwanSchema // 교직원
}, { collection : 'HaksikSchema'});
const HaksikModel = db.model('Haksik', haksikSchema);


// 년, 월, 일이 어떻게 들어오든 상관없습니다. 단지 클라이언트에서 시간(시간, 분, 일) 만 핸들하면 됩니다.
// const shuttleEachSchema = mongoose.Schema({
//
//     // jochiwon : [Date],
//     // school : [Date]
// }, { collection : 'ShuttleEachSchema'});
// const ShuttleEachModel = db.model('ShuttleEach', shuttleEachSchema);


const shuttleSchema = mongoose.Schema({
    weekday : [],
    weekend : []
    // weekday : shuttleEachSchema,
    // weekend : shuttleEachSchema
}, { collection : 'ShuttleSchema'});
const ShuttleModel = db.model('Shuttle', shuttleSchema);


exports.AdminUserModel = AdminUserModel;
exports.HaksikModel = HaksikModel;
exports.HaksikDetailModel = HaksikDetailModel;
exports.HaksikGwanModel = HaksikGwanModel;

exports.ShuttleModel = ShuttleModel;
// exports.ShuttleEachModel = ShuttleEachModel;