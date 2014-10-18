/**
* Created with jerous.github.io.
* User: tlu37317
* Date: 2014-10-18
* Time: 03:28 AM
* To change this template use Tools | Templates.
*/
(function($) {
	$.ajax({
		dataType: 'json',
		url: 'http://api.openweathermap.org/data/2.5/weather?q=taipei',
	    success: function(response, jqXHR, textStatus) {
			$('#postTemplate')
				.tmpl(response.weather)
				.appendTo('#content'); 
	    },
	    complete: function(jqXHR, textStatus) {
			
	    }
	});
}) ($);