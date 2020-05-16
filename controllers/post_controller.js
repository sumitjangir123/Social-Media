const Post = require("../models/post");
const  Comment= require('../models/comment');
module.exports.create =async function (req, res) {
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id
        })

        req.flash('success','Post Published !')
        return res.redirect('back');
    }catch (err) {
        req.flash('error','Error in creating a post');
        return res.redirect('back');
    }
}

module.exports.destroy =async function(req,res){
   try {
    let post= await Post.findById(req.params.id)
        //here we use user.id instead of user._id because user.id convertes object  id into the string 
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});
            req.flash('success','Post And Related Comments are Deleted !')
            return res.redirect('back');
        } else {
            req.flash('error','You Are Not The Authorised User !')
            return res.redirect('back');
        }
   } catch (err) {
    req.flash('error','Error in destroying the post');
       return res.redirect('/');
   }
}