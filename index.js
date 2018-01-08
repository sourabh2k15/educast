var http = require('http');
var express = require('express');
var app = express();
var port = 5000||process.env.PORT;

app.use(express.static(__dirname+'/public/'));

server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port,function(req,res){
    console.log("server running on "+ port);
});

app.get('/webrtc',function(req,res){
    console.log(req);
});

var sockets = [];
var broadcastPeer = 0;

io.on('connection',function(socket){
    sockets.push(socket);
    
    console.log("client connected!!");
    socket.emit('welcome',{ data : 'hello from server!! , clientID:'+sockets.length});
    
    socket.on('welcomeack',function(data){
        console.log("welcomeack "+data.data);
    });
    
    socket.on('server',function(data){
        console.log("server "+data.data);
        broadcastPeer = data.data.split(':')[1];
    });
    
    socket.on('idata',function(data){
        for(var i=0;i<=sockets.length;i++){
            if(sockets[i]) sockets[i].emit('irec',{ data:data.data});
        }
    });
    
    socket.on('disconnect',function(){
        console.log("a client disconnected :( !!");
    });
});
