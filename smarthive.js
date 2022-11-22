const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const cookieParser    = require('cookie-parser');
const morgan          = require('morgan');
const path            = require('path');
const session         = require('express-session');
const dotenv          = require('dotenv');

dotenv.config();
const indexRouter     = require('./routes');
const {sequelize}     = require('./models');
const { application } = require('express');

var http  = require('http');
const HTTP_PORT  = process.env.PORT || 3004;
const app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);

sequelize.sync({ force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(`연결실패 - ${err}`);
    });

app.use(morgan('dev'));
app.use('/public',express.static(__dirname +'/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

//
app.use('/', indexRouter);

//
app.use((req, res, next) => {
    const error = new Error('${req.method} ${req.url} 라우터가 없습니다.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({result:false, data:"Invalid router"});
});

let httpServer  = http.createServer(app);
httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log("Web server is listening on port %s \n", HTTP_PORT);
});