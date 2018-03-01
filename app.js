const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLess = require('express-less');

const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const mongoose = require('mongoose');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// var client = redis.createClient({host : process.env.redis_server, port : Number(process.env.redis_port)});
const redisClient = redis.createClient({host : '127.0.0.1', port : 6379, db : 2});
app.use(session(
    {
        key: 'sid',
        // secret: process.env.redis_secret,
        secret: "123412341234",
        store: new redisStore({
            host: '127.0.0.1',
            // host: process.env.redis_server,
            port: 6379,
            // port: Number(process.env.redis_port),
            client: redisClient,
            prefix : "session:",
            db : 0
        }),
        saveUninitialized: false, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }
));

app.use('/css', expressLess(path.join(__dirname, 'public/stylesheets')));
app.use('/css-import', express.static(path.join(__dirname, 'public/stylesheets-asset')));

app.use('/asset', express.static(path.join(__dirname, 'bower_components')));
app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/js-asset', express.static(path.join(__dirname, 'public/javascripts-asset')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/misc', express.static(path.join(__dirname, 'public/misc')));

// mongoose.connect()


const mobile = require('./routes/mobile');
const api = require('./routes/api');
const admin = require('./routes/admin');

app.use('/', mobile);
app.use('/api', api);
app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('_defaults/error');
});

module.exports = app;
