const Post = require("../models/post");
const  Comment= require('../models/comment');
module.exports.create = function (req, res) {
      Post.create({
          content : req.body.content,
          user : req.user._id
      },function(err,post){
          if(err){console.log('error in creating a post , enter some data');return res.redirect('back');}
          return res.redirect('back');
      })
}

module.exports.destroy = function(req,res){

    Post.findById(req.params.id,function(err,post){

        console.log(post);
        if(err){
            console.log("err in finding the post !!!");return;;
        }
        //here we use user.id instead of user._id because user.id convertes object  id into the string 
        if(post.user==req.user.id){
            console.log('post and the comments related to the post have been deleted')
            post.remove();
            Comment.deleteMany({post : req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            console.log('you  are not the admin of this post')
            return res.redirect('back');
        }
    })
}