// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
    
$(function(){
	var clicks = 0;
	$('.show-product').click(function(e){ //When the show button is clicked...
		e.preventDefault(); //prevent the default action.

		if(clicks===0){ //Used to prevent generation of duplicate popups.
			var floating_div = "<div class='popup'></div>"; //Creates the housing div.
			$('body').append(floating_div); //adds it to the document body
			clicks++;
			
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
	  	};
	});

	//Removes the show popup on mouseleave.
	$('.show-product').mouseleave(function(e){
		e.preventDefault();

		$('div.popup').remove();	
		clicks = 0; //Resets click so it can popup again when you re-mouseenter
	});

	//Defines the click event of the create new item button.
	$('.new-product').click(function(e){
		e.preventDefault();

		var new_item_div = "<form class='popup'>Name:<br><input type='text' id='product_name'><br>" +
			"Description:<br><textarea id='product_description'></textarea><br>" +
			"Price in cents:<br><input type='number' id='product_price_in_cents'><br>" +
			"<input type='submit' value='Submit' class='submit-new'></form>";
				
		$('body').append(new_item_div);

		$('input.submit-new').click(function(e){
			e.preventDefault();

			if(clicks===0){
				$.ajax({
					type: "POST",
					url: "/products",
					data: { product: { name: "Bicycle", description: "It has two fully working wheels, and nice little bell.", price_in_cents: "23949"}},
					success: function(){
						$.ajax({type: "GET", url:'/products/', dataType: "JSON", success: function(data){
							var tablerow = data[data.length-1];

							var id = tablerow["id"];
							var name = tablerow["name"];
							var description = tablerow["description"];
							var price_in_cents = tablerow["price_in_cents"];

							var new_product_row = "<tr class='product' product='"+ id +
								"'><td>" + name + "</td><td>" + description + "</td><td>" +
								price_in_cents + "</td><td><a class='show-product' href='/products/" +
								"6'>Show</a></td><td><a href='/products/" +
								"6/edit'>Edit</a></td><td><a data-confirm='Are you sure?' rel='nofollow'" +
								" data-method='delete' href='/products/" +
								"6'>Destroy</a></td></tr>";

							$('tbody').append(new_product_row);

						}});
						// return false;
					},
					error: function(){
						alert('There was an error. Please try again.');
						//return false;
					}
				});
			};

			$('form.popup').remove();
			clicks=0;
		});
	});
});