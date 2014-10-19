//1018上課聊天室實作node.js + express.js範例

/*
 * GET chat message.
 */


var history = [];

exports.start = function(req, res){
    var json;  //沒有宣告類型  以第一次給值的型式定義
    
    json = {
        data: history
    };
    
    res.send(json);
};


/*
 * POST chat message.
 */
/*  舊版的寫法
exports.send = function(req, res){
    var msg = req.params.message;
    var milliseconds = new Date().getTime();
    
    var obj = {};
        obj.message = msg;
        obj.timestamp = milliseconds;
    
    history.push(obj);
    
    res.send("Receive message " + msg);
};*/


exports.send = function(req, res){
    var clients = req.app.clients;
    var msg = req.params.message;
    var obj = {};
    var milliseconds = new Date().getTime();
    
    obj.message = msg;
    obj.timestamp = milliseconds;
    
    history.push(obj);
    
    res.send("Receive message: " + msg);
    
    // Push to all clients via WebSocket
    clients.forEach(function(client) {
        // Stringify
        client.sendUTF(JSON.stringify(history));
    });
};