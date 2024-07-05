
const answers = new Array(40); 
var i = 0;
var socket = new WebSocket('ws://127.0.0.1:8181/', 'chat');
var name = 'u1'
name = "name" + Math.floor(Math.random() * Math.floor(700));

socket.onopen = function () {
    
    
    socket.send('{"type": "join", "name":"'+name+'"}');
}
$('#sendBtn').on('click', function (e) {
    e.preventDefault();
    //name = 'u1',
    msg = $('#msg').val();
    socket.send('{"type": "msg", "msg": "' + msg + '","sender":"'+name+'"}');
    $('#msg').val('');
});
socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case 'msg':
            // if((data.name=="MegaBot" && data.sender==name)||(data.name=="MegaBot" && data.sender=="MegaBot") )
            // var msg = $('<div class="msg">' + data.name + ': ' + data.msg +
            //         '</div>');
            // $('#scrollbar1').append(msg);

            if ((name == data.sender && data.name=="MegaBot")) {
                var msg = $('<div class="msg">' + data.msg +
                    '</div>');
                $('#scrollbar1').append(msg);
            }
            else if(data.name == data.sender  && data.sender==name) {
                var msg = $('<div class="msg-send">' + data.msg +
                    '</div>');
                $('#scrollbar1').append(msg);
            }

            break;
        case 'join':
            console.log(data.name);
            console.log(name);
            // if (data.name == name || name == name) {
            //     for (var i = 0; i < data.names.length; i++) {
            //     var user = $('<div class="msg-send">' + data.names[i] + '</div>');
            //     $('#scrollbar1').append(user);
            // }
            // break;
            // }

    }

    const scrollableDiv = document.getElementById('scrollbar1');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;

};

