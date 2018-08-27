var socket = io();//与服务器进行连接


socket.on('connect', () => {
    document.getElementById('info').text = 'get yourself a nickname :)';
    document.getElementById('nickWrapper').style.display = 'block';
    document.getElementById('nicknameInput').focus();
});

button = document.getElementById('sendBtn');
button.onclick = function () {
    console.log(213);
    socket.emit('foo', 'hello');//发送一个名为foo的事件，并且传递一个字符串数据‘hello’

    var messageInput = document.getElementById('messageInput'),
        msg = messageInput.value;
    messageInput.value = '';
    messageInput.focus();
    if (msg.trim().length != 0) {
        socket.emit('postMsg', msg); //把消息发送到服务器
        displayNewMsg('me', msg); //把自己的消息显示到自己的窗口中
    };
}

// window.onload = function () {
//     //实例并初始化我们的hichat程序
//     var hichat = new HiChat();
//     hichat.init();
// };

//定义我们的hichat类
// var HiChat = function () {
//     this.socket = null;
// };

// //向原型添加业务方法
// HiChat.prototype = {
//     init: function () {//此方法初始化程序
//         that = this;
//         //建立到服务器的socket连接
//         this.socket = io.connect();
//         //监听socket的connect事件，此事件表示连接已经建立
//         this.socket.on('connect', function () {
//             //连接到服务器后，显示昵称输入框
//             document.getElementById('info').textContent = 'get yourself a nickname :)';
//             document.getElementById('nickWrapper').style.display = 'block';
//             document.getElementById('nicknameInput').focus();
//         });
//     }
// };


//昵称设置的确定按钮
document.getElementById('loginBtn').addEventListener('click', function () {
    var nickName = document.getElementById('nicknameInput').value;
    //检查昵称输入框是否为空
    if (nickName.length != 0) {
        //不为空，则发起一个login事件并将输入的昵称发送到服务器
        socket.emit('login', nickName);
    } else {
        //否则输入框获得焦点
        document.getElementById('nicknameInput').focus();
    };
}, false);

socket.on('nickExisted', function () {

    document.getElementById('info').textContent = '!nickname is taken, choose another pls'; //显示昵称被占用的提示
});

socket.on('loginSuccess', function () {
    console.log('loginSuccess');
    document.title = 'hichat | ' + document.getElementById('nicknameInput').value;
    document.getElementById('loginWrapper').style.display = 'none';//隐藏遮罩层显聊天界面
    document.getElementById('messageInput').focus();//让消息输入框获得焦点
});

socket.on('system', function (nickName, userCount, type) {
    //判断用户是连接还是离开以显示不同的信息
    var msg = nickName + (type == 'login' ? ' joined' : ' left');
    var p = document.createElement('p');
    p.textContent = msg;
    document.getElementById('historyMsg').appendChild(p);
    //将在线人数显示到页面顶部
    document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';

    displayNewMsg('system ', msg, 'red');
});

function displayNewMsg(user, msg, color) {
    var container = document.getElementById('historyMsg'),
        msgToDisplay = document.createElement('p'),
        date = new Date().toTimeString().substr(0, 8);
    msgToDisplay.style.color = color || '#000';
    msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
    container.appendChild(msgToDisplay);
    container.scrollTop = container.scrollHeight;
}

socket.on('newMsg', function(user, msg) {
    displayNewMsg(user, msg);
});