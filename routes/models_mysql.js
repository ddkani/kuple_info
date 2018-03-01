const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../db').sequelize;


let AdminAccount = sequelize.define('ADMIN_ACCOUNT', {
    id : {primaryKey : true, type : Sequelize.INTEGER, autoIncrement: true},
    userid : {type: sequelize.STRING, length: 128, nullable: false},
    password : {type: sequelize.STRING, length: 128, nullable: false}
}, {
    timestamps: false
});


// type:


let HaksikBasic = sequelize.define('HAKSIK_BASIC', {
    id : {primaryKey : true, type : Sequelize.INTEGER, autoIncrement: true},
    date : {type: Sequelize.DATE, nullable: false}

}, {
    timestamps: false
});


let HakSikDescription = sequelize.define('HAKSIK_DESCRIPTION', {
    id : {primaryKey : true, type : Sequelize.INTEGER, autoIncrement: true},


}, {
    timestamps: false
});