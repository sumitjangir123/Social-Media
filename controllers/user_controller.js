const User = require("../models/user");

module.exports.profile = function (req, res) {
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.render('profile',{
    //                 title:"profile page",
    //                 user:user
    //             })
    //         }
    //         else{
    //             return res.redirect('signIn');
    //         }
    //     })
    // }
    // else{
    //     console.log('pehle data to dal be !!! ;() ');
    //     return res.redirect('signIn');
    // }
    User.findById(req.params.id,function(err,user){
        return res.render('profile', {
            title: "profile page",
            profile_user : user
        })
    })
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up', {
        title: "todo | Sign Up"
    })
}

module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
       return res.redirect('/user/profile');
    }

    return res.render('user_sign_in', {
        title: "todo | sign In"
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
                return res.redirect("/user/signIn");
            })
        }
        else {
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

//to sign out the user
module.exports.destroySession =function(req,res){
    req.logout();
    return res.redirect('/');
}

module.exports.update = function(req,res){
    if(req.params.id==req.user.id){
        User.findByIdAndUpdate(req.params.id,{name : req.body.name,email : req.body.email},function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }  
}