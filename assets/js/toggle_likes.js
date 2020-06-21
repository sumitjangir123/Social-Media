// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
        var temp=document.getElementsByClassName('toggle-like-button');
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            
            e.preventDefault();
            let self = this;
            console.log($(self).attr('id'));
            let temp = 'green';
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    $(self).html(`${likesCount} Likes <i class="fa fa-thumbs-down" aria-hidden="true"></i> `);
                }else{
                    likesCount += 1;
                    $(self).html(`${likesCount} Likes <i class="fa fa-thumbs-up" aria-hidden="true"></i>`);
                }


                $(self).attr('data-likes', likesCount);
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
