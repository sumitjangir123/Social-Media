const db=require('../config/mongoose');
const Post = require("../models/post");
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
            return res.render('home',{
                list : post_list,
                title:"Social Media"
            });
        }
    )      
}