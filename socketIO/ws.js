const ws =  require('ws');

const WebSocketServer = ws.WebSocketServer 

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        console.log(`${message}`); // 这里的 message 要转化为 字符串才能正常输出 
        ws.send(`${message}：${Math.random().toString().slice(2)}`)
    });

    loop(ws)
});

const loop = (ws) => {
    setInterval(() => {
        ws.send(`定时返回：${Math.random().toString().slice(2)}`)
    }, 2000);
}