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
    $.fn.createWebSocket = function() {
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
				.tmpl(messages.reverse().slice(0, 1))
				.appendTo('#content'); 
        };    
    }; 
}) ();


