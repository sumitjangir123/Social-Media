class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(o){o.preventDefault();$.ajax({type:"post",url:"/comment/create",data:$(this).serialize(),success:function(o){let n=t.newCommentDom(o.data.comment);$("#post-comments-"+e).append(n),t.deleteComment($(" .delete-comment-button",n)),new ToggleLike(".toggle-like-button",n),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n                    <p>\n                        ${e.content} : ${e.user.name} <a class="delete-comment-button" href="comment/destroy/${e._id}"> <span><i class="fas fa-window-close"></i></span></a>\n\n                        <small>\n                            <a class="toggle-like-button" data-likes="${e.likes.length}"\n                            href="/likes/toggle/?type=Comment&id=${e._id}">0 Likes <i class="fa fa-thumbs-down" aria-hidden="true"></i></a>\n                        </small>\n                    </p>\n                </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}