const passport= require('passport');
const facebookStrategy= require('passport-facebook');
const crypto= require('crypto');
const User= require('../models/user');

//tell passport to use a new strategy for facebook login 
passport.use(new facebookStrategy({
    clientID: "549980429009358",
    clientSecret: "",
    callbackURL: "http://localhost:8000/users/auth/facebook/callback",
    profileFields: ['id','emails', 'first_name', 'last_name', 'displayName', 'link', 'photos' ]
  },
  function(accessToken, refreshToken, profile, cb) {
    //find a user 
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if(err){ console.log('error in facebook strategy-passport',err); return; }

        console.log(profile._json.picture.data);

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
                if(err){console.log('error in creating the user in facebook strategy-passport',err); return;}
                else{
                    return cb(null,user);
                }
            });
        }
      });
  }
));

module.exports= passport;