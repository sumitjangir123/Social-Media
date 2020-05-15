const db=require('../config/mongoose');
const Post = require("../models/post");
const User = require("../models/user")
//home controller
module.exports.home=function(req,res){

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comment',
        populate: {
            path : 'user'
        }
    })
    .exec(
        function(err,post_list){
            if(err){console.log('error in fetching the posts'); return ;}

            User.find({},function(err,users){
                return res.render('home',{
                    list : post_list,
                    users_list : users,
                    title:"Social Media"
                });
            })
            
        }
    )      
}