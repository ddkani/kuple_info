const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define : {
        freezeTableName : true
    }
});

function authFailed(err) {
    throw err;
}

sequelize.authenticate().then(
    () => {
        console.log("auth ok");
    },

    (err) => {
        process.nextTick(authFailed, err)
    }
);

exports.sequelize = sequelize;