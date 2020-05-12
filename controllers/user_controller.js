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

    return res.render('profile', {
        title: "profile page"
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

// module.exports.create_session=function(req,res){
//     //handle sign in
//     //if user exists and password is incorrect

//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             //error in finding the user
//             console.log("error in finding the user in signing In !!!");
//             return res.redirect('back');
//         }

//         if(user){
//             //if user found
//             //if(password don't match
//             if(user.password!=req.body.password){
//                 console.log("wrong password");
//                 return res.redirect('back');
//             }else{
//                     res.cookie('user_id',user.id);
//                     return res.redirect("/user/profile");
//             }
//         }
//         else{
//             //if user not found
//             console.log('user not found !!!');
//             return res.redirect('back');
//         }

//     })

// }

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

//to sign out the user
module.exports.destroySession =function(req,res){
    req.logout();
    return res.redirect('/');
}