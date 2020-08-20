
function live(data){
     document.getElementById(data.user_email).style.display="inline-block";
     new Noty({
        theme: 'metroui',
        text: data.user_email+' is '+'live',
        type: 'success',
        layout: 'topRight',
        timeout: 2000
    }).show();
}

function notlive(data){
    console.log(data);
    document.getElementById(data.user_email).style.display="none";
    new Noty({
       theme: 'metroui',
       text: data.user_email+' is '+'offline',
       type: 'success',
       layout: 'topRight',
       timeout: 2000
   }).show();
}

class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail= userEmail;
        this.socket= io.connect('http://localhost:5000');
        // http://107.21.187.244:5000
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self= this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets...!');

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
                live(data);
            });

            self.socket.on('diss',function(data){

                notlive(data);
                console.log('user dissconnected ',data);
            });
        
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            document.getElementById('chat-message-input').value='';

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}