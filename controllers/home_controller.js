const db=require('../config/mongoose');
const Post = require("../models/post");
const User = require("../models/user")
//home controller
module.exports.home=async function(req,res){

    try {
        //populate the user of each post
    let post_list= await  Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comment',
        populate: {
            path : 'user'
        }
    });
   
    let users =await User.find({});

    return res.render('home',{
        post_list: post_list,
        users_list : users,
        title:"Social Media"
    });
    } catch (err) {
        console.log('Error',err);
        return;
    }
}