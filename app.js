var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var usersRouter = require('./routes/users');
let PORT = process.env.PORT || 3000;
var app = express();
const dotenv = require('dotenv').config()

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Database Connected.....') })
    .catch((err) => { console.log(err) })

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