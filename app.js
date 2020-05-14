var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var usersRouter = require('./routes/users');
let PORT = 3000;
const dotenv = require('dotenv').config()
    // const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Database Connected.....') })
    .catch((err) => { console.log(err) })

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Start Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
//Mongo-session connect
app.use(session({
    secret: process.env.DB_TOKEN,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 86400000
    }
}));

//Message Flash
app.use(flash());


//End of Middleware

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(PORT, () => {
    console.log(`Server started.........${PORT}`);
});

module.exports = app;