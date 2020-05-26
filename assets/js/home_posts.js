{
    //method to submit data the data for new post using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                //place a backslace before the post
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));

                    
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    
                    new Noty({
                        text: 'woohoo ! Post Created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1000,
                        theme: 'metroui'
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
                
            })
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">

            <a class="delete-post-button" href="post/destroy/${post._id}"><span><i class="fas fa-times-circle"></i></span></a>

            <span>${post.content}</span>: <span id="user-name">${post.user.name}</span>
            <div class="post-comments">
                    <form action="comment/create" id="post-<%= post._id %>-comments-form" method="POST">
                            <input type="text" name="content" placeholder="type here to add a comment. . .">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="add comment">
                    </form>
        
                    <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                    </div>
            </div>
        
        </li>`)
    }

    //method to delete a post from DOM

    let deletePost= function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    new Noty({
                        theme: 'metroui',
                        text:'Post Deleted :(',
                        type : 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }



        // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
        let convertPostsToAjax = function(){
            $('#posts-list-container>ul>li').each(function(){
                let self = $(this);
                let deleteButton = $(' .delete-post-button', self);
                deletePost(deleteButton);
    
                // get the post's id by splitting the id attribute
                let postId = self.prop('id').split("-")[1]
                new PostComments(postId);
            });
        }

    convertPostsToAjax();
    createPost();
}