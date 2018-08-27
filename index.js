const express = require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

let users = [];

io.on('connection', function (socket) {    
    //昵称设置
    socket.on('login', function (nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            socket.emit('system', nickname, users.length, 'login'); //向所有连接到服务器的客户端发送当前登陆用户的昵称 
        };
    });

    //接收新消息
    socket.on('postMsg', function (msg) {
        //将消息发送到除自己外的所有用户
        socket.broadcast.emit('newMsg', socket.nickname, msg);
    });
})

http.listen(7000, () => {
    console.log('listen on 7000')
});