const User = require("../models/user");
const fs = require('fs');
const path = require('path');
// const { use } = require("passport");
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('profile', {
            title: "profile page",
            profile_user: user
        })
    })
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "SM ! Sign Up"
    })
}

module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "SM ! Sign In"
    })

}

module.exports.create_user = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log("error in creating user");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding the user in signing up !!!");
            return res.redirect('back');
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("error in creating the user :( ");
                    return res.redirect('back');
                }
                return res.redirect("/users/signIn");
            })
        }
        else {
            req.flash('error', 'User Is Already Registered')
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

//to sign out the user
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'session destroyed');
    return res.redirect('/');
}

module.exports.update = async function (req, res) {
    // if(req.params.id==req.user.id){
    //     User.findByIdAndUpdate(req.params.id,{name : req.body.name,email : req.body.email},function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }  

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req, res, function (err) {
                if (err) {
                    console.log('****multer error', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    // if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }

}