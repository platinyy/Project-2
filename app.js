const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')
var reviewsRouter = require('./server/routes/reviews');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
require('./server/models/database');
require('./server/models/passport');
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(methodOverride('_method'));



app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
})
app.use('/', reviewsRouter);
app.use(flash());
app.use(fileUpload());

app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: true
}));
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));