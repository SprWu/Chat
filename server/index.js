var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var login = require('./login')
const HOST = "129.211.17.57"
const PORT = 9000;

var userList = [];
var Id = [];

app.post('/login', (req, res) => {
    login.login(req, res, HOST);
})

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        if(userList.indexOf(data.name) === -1){
            userList.push(data.name);
            Id.push(socket.id);
            io.sockets.emit('getList',{list: userList})
            socket.broadcast.emit('inform',{msg: data.name + "加入了聊天!"})
        } else {
            io.sockets.emit('getList',{list: userList})
            socket.emit('fail',{error: '您已经加入过了'})
        }
    })

    socket.on('quit', (data) => {
        if(userList.indexOf(data.name) === -1) return;
        userList = userList.filter( user => user != data.name)
        Id = Id.filter( id => id != socket.io)
        io.sockets.emit('getList',{list: userList})
        socket.broadcast.emit('inform', {msg: data.name + "退出了聊天"})
        //console.log(userList);
    })
    socket.on('send', (data) => {
        socket.broadcast.emit('listen', data);
    })
    // 客户端断开触发(结束进程、直接关闭浏览器等)
    socket.on('disconnect', () => {
        let index = Id.findIndex( id => id === socket.id)
        Id.splice(index,1)
        userList.splice(index,1)
        io.sockets.emit('getList', {list: userList})
    })
})


http.listen(PORT, HOST, () => console.log("服务启动"));