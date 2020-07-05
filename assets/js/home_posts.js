{

    document.getElementById('search-bar').style.display="block";    
    //search function to find friends
    function findFriends() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        document.getElementById('after').style.display="block";
        for (i of li) {
            a = i.getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                i.style.display = "";
            } else {
                i.style.display = "none";
            }
        }
    }
    
    //someHow done the toggle button
    var x = document.querySelectorAll("#check");
    for(i of x){
        if(i.innerText=="Liked"){
            i.innerHTML = '<i class="fas fa-heart" style="color:red"></i>';
        }else{
            i.innerHTML = '<i class="far fa-heart" style="color:black"></i>';
        }
    }
    

    //method to submit data the data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                //place a backslace before the post
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));


                    // call the create comment class
                    new PostComments(data.data.post._id);

                    //enable the functionality of the toggle like button on the new post

                    new ToggleLike($('.toggle-like-button', newPost));

                    new Noty({
                        text: 'woohoo ! Post Created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1000,
                        theme: 'metroui'
                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }

            })
        });
    }


    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">

            <a class="delete-post-button" href="post/destroy/${post._id}"><span><i class="fas fa-times-circle"></i></span></a>
            <span>${post.content}</span>: <span id="user-name">${post.user.name}</span>
            <small>
            
            <a class="toggle-like-button" data-likes="${post.likes.length}"
                    href="/likes/toggle/?type=Post&id=${post._id}"> 0 Likes <i class="far fa-heart" style="color:black"></i></a>
            </small>
            <div class="post-comments">
                    <form action="comment/create" id="post-<%= post._id %>-comments-form" method="POST">
                            <input type="text" name="content" placeholder="type here to add a comment. . .">
                            <input type="hidden" name="post" value="${post._id}">
                            <button type="submit" value="add comment" class="btn btn-primary btn-md">Add Comment</button>
                    </form>
        
                    <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                    </div>
            </div>
        
        </li>`)
    }

    //method to delete a post from DOM

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    new Noty({
                        theme: 'metroui',
                        text: 'Post Deleted :(',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }



    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
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