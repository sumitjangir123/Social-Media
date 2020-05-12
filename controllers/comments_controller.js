const Post =require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){

                post.comment.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}

module.exports.destroy = function(req,res){

    Comment.findById(req.params.id,function(err,comment){

        //we need to delete object id of comment from 1.array that is present in post model and 2.the comment itself from the comment model for that we have to store the postId of comment 
        //because we dont want to lose it after deleting the 2. we have to delete 1. also
        let postId = comment.post;

        //find a post using the postId
        Post.findById(postId,function(err,post){
            //if the user of post wants to delete any unappropriate comment from that post that is commented by anyone so for that kind of authorisation
            if(post.user==req.user.id){
                //comment deleted
                comment.remove();
                //comment id is also poped out from the array of comments
                Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}},function(err,post){
                    return res.redirect('back');
                })
            }
            //if user who is commented on any post and want to take back that comment or wants to delete that comment than he/she is able to do that :)
            else{
                if(comment.user==req.user.id){
                    comment.remove();
                    Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}},function(err,post){
                        return res.redirect('back');
                    })
                }
                else{
                    return res.redirect('back');
                }
            }
        })

        
        // if(comment.user==req.user.id){
        // let postId = comment.post;
        //     comment.remove();
        //     Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}},function(err,post){
        //         return res.redirect('back');
        //     })
        // }
        // else{
        //     return res.redirect('back');
        // }
    })
}