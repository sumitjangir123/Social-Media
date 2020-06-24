const passport= require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');
const env= require('./environment');

//tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
  },
  function(accessToken, refreshToken, profile, cb) {
    //find a user 
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if(err){ console.log('error in google strategy-passport',err); return; }

        console.log(profile);

        if(user){
            //if user is found, set this user as req.user
            return cb(null,user);
        }else{
            //if not found then create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avatar: profile.photos[0].value
            },function(err,user){
                if(err){console.log('error in creating the user in google strategy-passport',err); return;}
                else{
                    return cb(null,user);
                }
            });
        }
      });
  }
));

module.exports= passport;