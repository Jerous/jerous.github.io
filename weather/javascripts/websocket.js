// 建立前台的WebSocket連接
// 
// 愚笨的作法  不好Maintain
// $('.status').html("<h2>Error occured!</h2>")
// 
// 用id也不好  
// $('#statusSuccess').removeClass('hide');
// $('#statusError').addClass('hide');
// 
// 最潮的是用HTML data arrtibute較佳

(function() {
    $.fn.createWebSocket = function(cb) {
        var self = this;
        
        var ws = new WebSocket("ws://demand-orient.codio.io:3000/", "echo-protocol"); 
        ws.onopen = function(evt) {
            $('[data-status]').addClass('hide');
            $('[data-status=success]').removeClass('hide');
        };
        ws.onclose = function(evt) {
            $('[data-status]').addClass('hide');
            $('[data-status=close]').removeClass('hide'); 
        };
        ws.onerror = function(evt) {
            $('[data-status]').addClass('hide');
            $('[data-status=error]').removeClass('hide');
        };
        ws.onmessage = function(evt) {
            var messages = JSON.parse(evt.data);
			$('#chatTemplate')
				.tmpl(messages.reverse().slice(0, 1))  //陣列反向讀取，並且選重的範圍中只包含第0與1範圍
				.prependTo(self); //在選中的元素中頭部插入內容  appendTo是在元素尾部中插入
            
            if (cb && cb.onmessage === 'function') {  //JS中判斷兩者是否一致建議使用===
                cb.onmessage();
            }
        };    
    }; 
}) ();


