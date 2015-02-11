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
	    $.ajax({type: "GET", url:'/products/' + idNumber, dataType: "JSON", success: function(data) {
	    	var reviews = "<p class='reviewItem'>Review:" + data.description + "</p>";


	    	$('div.popup').append(reviews);

			console.log(data);

	    }});
	});
});