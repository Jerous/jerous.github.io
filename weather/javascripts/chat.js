(function($) {
	$.ajax({
		dataType: 'json',
		url: 'http://demand-orient.codio.io:3000/start',
	    success: function(response, jqXHR, textStatus) {
            // 成功但錯誤的做法，因為裝data的叫model，MODEL不可改
            /*for (i = 0; i < response.data.length; i++){
                // 自己用的
                // response.date[i].timestamp = moment(response.data[i].timestamp).format('dddd');
                // 上課時的版本
                response.data[i].timestamp = moment(response.data[i].timestamp).fromNow();   
            }*/
            
			$('#chatTemplate')
				.tmpl(response.data)
				.appendTo('#content');  // 上面那排產生的HTML 附加在#contect後面
            
	    },
	    complete: function(jqXHR, textStatus) {
            // 比較好的做法
            // SPA Principle: MVC Architecture
            //  - Modify View instead of Model  
            $('.timestamp').each(function() {   //選出來後像迴圈一樣去找每一個
                var me = $(this);
                var timestamp = me.html();
                alert(timestamp);
                me.html(moment(timestamp).fromNow());
            });
	    }
	});
}) ($);
