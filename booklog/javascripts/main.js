(function($) {
	$.ajax({
		dataType: 'json',
		url: 'https://www.mokoversity.com/1/post/tags/startup',
	    success: function(response, jqXHR, textStatus) {
			$('#postTemplate')
				.tmpl(response.posts)
				.appendTo('#content');
	    },
	    complete: function(jqXHR, textStatus) {
			
	    }
	});
}) ($);
