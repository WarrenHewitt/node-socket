const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, { 
    cors: {
        origin: "*", // from the screenshot you provided
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
    socket.on('msg',(data)=>{
        //监听msg事件（这个是自定义的事件）
         console.log(data);//你好服务器
         socket.emit('msg','你好浏览器');
         //向socket用户发送信息
     })
});

httpServer.listen(3000);