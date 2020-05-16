const Post =require('../models/post');
const Comment = require('../models/comment');

module.exports.create =async function(req,res){
    try {
        let post=await Post.findById(req.body.post);
   
        if(post){
            let comment =await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            
                post.comment.push(comment);
                post.save();
                res.redirect('/');
        }
    } catch (err) {
        console.log('Error',err); return;
    }
}

module.exports.destroy =async function(req,res){
    try {
        let comment =await Comment.findById(req.params.id);


        //we need to delete object id of comment from 1.array that is present in post model and 2.the comment itself from the comment model for that we have to store the postId of comment 
        //because we dont want to lose it after deleting the 2. we have to delete 1. also
        let postId = comment.post;

        //find a post using the postId
        let post =await Post.findById(postId);

            //if the user of post wants to delete any unappropriate comment from that post that is commented by anyone so for that kind of authorisation
            if(post.user==req.user.id){
                //comment deleted
                comment.remove();
                //comment id is also poped out from the array of comments
               let post = Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}});
               req.flash('success','Comment is destroyed');
                return res.redirect('back');
            }
            //if user who is commented on any post and want to take back that comment or wants to delete that comment than he/she is able to do that :)
            else{
                if(comment.user==req.user.id){
                    comment.remove();
                    let post = Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}});
                    req.flash('success','Comment is destroyed');
                    return res.redirect('back');
                }
                else{
                    req.flash('error','you are not the authorized user');
                    return res.redirect('back');
                }
            }
    } catch (err) {
        req.flash('error','Error in deleting the comment !');
        return res.redirect('back');
    }
}