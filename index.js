//setting up express server
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//here we use mongo store to store session cookie b'coz don't want to remove session cookie at every server restart ;)
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle :'extended',
    prefix : '/css'
}));
//express functions
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);


//extract scripts and styles from subpages to the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up view engine
app.set("view engine","ejs");
app.set("views","./views");

//mongo store is used to store the session cookie in the db
app.use(session({

    name:'sumitwa',
    //to change the secret before deployment in production mode
    secret:'something_something',
    saveUninitialized: false,
    resave: false,
    cookie :{
        maxAge :(1000 * 60 * 100)
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok' );
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require("./routes/index.js"));

//setting up server
app.listen(port,function(err){
    if(err){
        console.log('something wrong in starting server !!!');
        return;
    }
     return console.log("server is up and running on port ",port);
});