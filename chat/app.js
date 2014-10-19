
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');
var discussion = require('./routes/discussion');

/*1018 聊天室範例教學*/
var chat = require('./routes/chat');

/*1018 解決No 'Access-Control-Allow-Origin' header*/
var cors = require('cors')

/*1019 加入websocket模組*/
var WebSocketServer = require('websocket').server;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user/:username', user.index);

app.post('/discussion/:message', discussion.create);
app.get('/discussion/latest/:items', discussion.read);

/*1018 聊天室範例教學  中間加上解決Cors的東西*/
app.get('/start', cors(), chat.start);
app.post('/send/:message', cors(), chat.send);


/*1019 改寫講義211頁 導入express.js*/
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

/*1019 建立WebSocket Section*/
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
}); 

//1019 建立Websocket連接後處理事項 講義212

app.clients = [];

function onWsConnMessage(message) {
    if (message.type == 'utf8') {
      console.log('Received message: ' + message.utf8Data);
    } else if (message.type == 'binary') {
      console.log('Received binary data.');
    }
    
}

function onWsConnClose(reasonCode, description) {
    console.log(' Peer disconnected with reason: ' + reasonCode);
}

function onWsRequest(request) {
    var connection = request.accept('echo-protocol', request.origin);
    console.log("WebSocket connection accepted.");
    
    app.clients.push(connection);

    connection.on('message', onWsConnMessage);
    connection.on('close', onWsConnClose);
}

wsServer.on('request', onWsRequest); 
