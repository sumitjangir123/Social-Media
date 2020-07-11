const db = require('../config/mongoose');
const Post = require("../models/post");
const User = require("../models/user");
const Like = require('../models/like');
//home controller
module.exports.home = async function (req, res) {
    try {
        //populate the user of each post
        let post_list = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate('photos')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user likes'
                }
            }).populate('likes');
        
        //populate users
        let users = await User.find({});
      
        //populate the array of friendships that is present in users schema but only if user is signed in
        if(req.user){
            await req.user.populate('friendships').execPopulate();
        }
    

        return res.render('home', {
            post_list: post_list,
            users_list: users,
            title: "Thunder Bird"
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.about= async function(req,res){
    try {
        return res.render('about', {
            title: "Sumit Kumar"
        });
    } catch (error) {
        console.log(error);
    }
}
