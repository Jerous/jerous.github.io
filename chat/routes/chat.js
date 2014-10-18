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

exports.send = function(req, res){
    var msg = req.params.message;
    var milliseconds = new Date().getTime();
    
    var obj = {};
        obj.message = msg;
        obj.timestamp = milliseconds;
    
    history.push(obj);
    
    res.send("Receive message " + msg);
};