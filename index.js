if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const CronJob = require('cron').CronJob;

const job = new CronJob(
	'0 15 * * * *',
    function () {
        let date_ob = new Date();
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        // let seconds = date_ob.getSeconds();
        console.log(`Ding! The current time is ${hours}:${minutes}, ${date}/${month}/${year}.`);
        console.log('You will see this message at :15 of every hour.');
        console.log('Perhaps a method could be written to backup your database in this time.')
	},
	null,
	true,
	'Australia/Sydney'
);

mongoose.set('strictQuery', true); // suppresses deprecation warning
mongoose.connect(`mongodb://localhost:27017/ism-leichhardt`, {
    useNewURLParser: true,
    useUnifiedTopology: true
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires in a week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session(sessionConfig));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routes

const ismRoutes = require('./routes/ism');
const adminRoutes = require('./routes/admin');

app.use('/ism', ismRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, (error) => {
    if(error) return console.log(error);
    console.log('ISM server running on 3000');
})