(function($) {
    $('[data-action=send]'/*'#send'*//*refresh功能我的解法*/).on('click', function(event) {
        event.preventDefault();  //避免按下submit後瀏覽器跳頁動作
        
        //$('#send').addClass('hide');  /*refresh功能我的解法*/
        //$('#refresh').removeClass('hide');  /*refresh功能我的解法*/
        
        // toggle views
        $('[data-action]').addClass('hide');
        $('[data-action=sending]').removeClass('hide').addClass('disabled');  //串接模式，加上disable表示按鈕不能按
        
        var message = $("#message").val();
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'http://demand-orient.codio.io:3000/send/' + message,
            complete: function(jqXHR, textStatus) {
                 $('[data-status]').addClass('hide');
                 $('[data-status=sent]').removeClass('hide'); 
                
                 //$('#send').removeClass('hide');   /*refresh功能我的解法*/
                 //$('#refresh').addClass('hide');   /*refresh功能我的解法*/
                
                // reset views
                $('[data-action]').addClass('hide');
                $('[data-action=send]').removeClass('hide');
            }
        });
    });
    
    
	$.ajax({
		dataType: 'json',
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei',
	    success: function(response, jqXHR, textStatus) {
            var data = [];
            var obj = {};
            
            //生成data內的物件
            obj.temp = response.main.temp;
            obj.humidity = response.main.humidity;
            obj.name = response.name;
            
            // Weather Icons
            switch (response.weather[0].main) {
                case "Clouds": obj.weatherIcon = "wi-day-cloudy";
            }
            
            // Celsius
            obj.celsius = parseInt(response.main.temp - 273.15);
            
            //將物件放入陣列
            data.push(obj);
            
			$('#postTemplate')
				.tmpl(data)
				.appendTo('#content');
            
            $('#weather-icon').addClass('wi-day-cloudy');
	    },
	    complete: function(jqXHR, textStatus) {

            $('#content').createWebSocket();

            
	    }
	});
}) ($);  //比較嚴謹的寫法，所以加入$字號。不加也可以 
