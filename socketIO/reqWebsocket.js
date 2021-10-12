const http = require('http')

// http.get('ws://192.168.52.128:3000', (response) => {
http.get('http://192.168.52.128:3000', (response) => {
    console.log('object', response.data);
}).on('error', (error) => {
    console.log('error', error);
})

// const socket = new WebSocket('ws://192.168.52.128:3000')

// // Connection opened
// socket.addEventListener('open', (event) => {
//     socket.send('客户端初始化呼叫服务器')
// })
// // Connection opened
// socket.addEventListener('close', (event) => {
//     console.log('客户端关闭')
// })
// // Connection opened
// socket.addEventListener('error', (error) => {
//     console.log('客户端发生错误：', error)
// })

// // Listen for messages
// socket.addEventListener('message', (event) => {
//     console.log('客户端收到数据：', event.data)
//     // this.serverText = event.data
// })