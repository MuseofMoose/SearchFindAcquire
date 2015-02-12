// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
    
$(function(){
	var clicks = 0;
	$('.show-product').click(function(e){
		e.preventDefault();

		if(clicks===0){
			var floating_div = "<div class='popup'></div>";
			$('body').append(floating_div);
			console.log("Hello");
			clicks++;
		};
		var idNumber = $(this).closest(".product").attr("product");
	    $.ajax({type: "GET", url:'/products/' + idNumber + '/reviews/', dataType: "JSON", success: function(data) {
	    	var review_string = "<p class='reviewItem'>Reviews:";

	    	for(var key in data){
	    		review_string+=data[key].comment;
	    		review_string+="<br>";
	    	}
	    	review_string+="</p>";

	    	$('div.popup').append(review_string);

			console.log(data);
			console.log(review_string);

	    }});
	});

	$('.show-product').mouseleave(function(e){
		e.preventDefault();

		$('div.popup').remove()
		clicks = 0;
	});

	$('.new-product').click(function(e){
		e.preventDefault;

		if(clicks===0){
			var new_item_div = "<div class='popup'></div>";
			$('body').append(floating_div);

		}

	});
});