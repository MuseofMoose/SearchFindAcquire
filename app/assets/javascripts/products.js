// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
    
$(function(){
	var clicks = 0;
	$('.show-product').hover(function(e){ //When the show button is hovered over...
		e.preventDefault(); //prevent the default action.

		if(clicks===0){ //Used to prevent generation of duplicate popups.
			var floating_div = "<div class='popup'></div>"; //Creates the housing div.
			$('body').append(floating_div); //adds it to the document body
			clicks++;
			
			var idNumber = $(this).closest(".product").attr("product");
		    $.ajax({type: "GET", url:'/products/' + idNumber + '/reviews/', dataType: "JSON", success: function(data) {
		    	var review_string = "<p class='reviewItem'>Reviews:<br>";

		    	for(var key in data){
		    		review_string+=data[key].comment;
		    		review_string+="<br><br>";
		    	}
		    	review_string+="</p>";

		    	$('div.popup').append(review_string);
		    }});
	  	};
	});

	//Removes the show popup on mouseleave.
	$('.show-product').mouseleave(function(e){
		e.preventDefault();

		$('div.popup').remove();	
		clicks = 0; //Resets click so it can popup again when you re-mouseenter
	});

	//////////////////////////////////////////////////////////
	//Defines the click event of the create new item button.//
	//////////////////////////////////////////////////////////
	$('.new-product').click(function(e){
		e.preventDefault();

		var new_item_div = "<form class='popup'>Name:<br><input type='text' id='product_name'><br>" +
			"Description:<br><textarea id='product_description' rows='3' cols='22'></textarea><br>" +
			"Price in cents:<br><input type='number' id='product_price_in_cents'><br>" +
			"<input type='submit' value='Submit' class='submit-new'></form>";
				
		$('body').append(new_item_div);

		$('input.submit-new').click(function(e){
			e.preventDefault();

			//Stores all the values that have been entered into the form.
			var v_name = $(this).siblings("#product_name").val();
			var v_description = $(this).siblings("#product_description").val();

			//Also converts the price in cents into a formatted dollar price.
			var v_price_in_cents = $(this).siblings("#product_price_in_cents").val();
			var v_price_in_dollars = (v_price_in_cents)/100;
			var v_formatted_price = "$" + v_price_in_dollars.toString();


			if(clicks===0){
				$.ajax({
					type: "POST",
					url: "/products",
					data: { product: { name: v_name, description: v_description, price_in_cents: v_price_in_cents}},
					success: function(){
						$.ajax({type: "GET", url:'/products/', dataType: "JSON", success: function(data){ //Reads in the product page index json...
							var tablerow = data[data.length-1]; //selects the most recently added item...
							var id = tablerow["id"]; //and stores it's id number

							//Constructs an html element with all the info of the newly added product
							var new_product_row = "<tr class='product' product='"+ id +
								"'><td>" + v_name + "</td><td>" + v_description + "</td><td>" +
								v_formatted_price + "</td><td><a class='show-product' href='/products/" +
								id+"'>Show</a></td><td><a href='/products/" +
								id+"/edit'>Edit</a></td><td><a data-confirm='Are you sure?' rel='nofollow'" +
								" data-method='delete' href='/products/" +
								id+"'>Destroy</a></td></tr>";

							//And temporarily appends it so it looks like it was added in real-time.
							$('tbody').append(new_product_row);

						}});
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


	//////////////////////////////////////////////
	//Defines the click event of the edit button//
	//////////////////////////////////////////////

	$('.show-product').click(function(e){
		e.preventDefault();

		var new_item_div = "<form class='popup'>Name:<br><input type='text' id='product_name'><br>" +
			"Description:<br><textarea id='product_description' rows='3' cols='22'></textarea><br>" +
			"Price in cents:<br><input type='number' id='product_price_in_cents'><br>" +
			"<input type='submit' value='Submit' class='submit-edit'></form>";
					
		$('body').append(new_item_div);

		$('input.submit-edit').click(function(e){
			e.preventDefault();

			//Stores all the values that have been entered into the form.
			var new_name = $(this).siblings("#product_name").val();
			console.log(v_name);
			var new_description = $(this).siblings("#product_description").val();
			console.log(v_description);

			//Also converts the price in cents into a formatted dollar price.
			var new_price_in_cents = $(this).siblings("#product_price_in_cents").val();
			var v_price_in_dollars = (v_price_in_cents)/100;
			var v_formatted_price = "$" + v_price_in_dollars.toString();


			if(clicks===0){
				$.ajax({
					type: "PUT",
					url: "/products",
					data: { product: { name: new_name, description: new_description, price_in_cents: new_price_in_cents}},
					success: function(){
						$.ajax({type: "GET", url:'/products/', dataType: "JSON", success: function(data){ //Reads in the product page index json...
							var tablerow = data[data.length-1]; //selects the most recently added item...
							var id = tablerow["id"]; //and stores it's id number

							//Constructs an html element with all the info of the newly added product
							var new_product_row = "<tr class='product' product='"+ id +
								"'><td>" + v_name + "</td><td>" + v_description + "</td><td>" +
								v_formatted_price + "</td><td><a class='show-product' href='/products/" +
								id+"'>Show</a></td><td><a href='/products/" +
								id+"/edit'>Edit</a></td><td><a data-confirm='Are you sure?' rel='nofollow'" +
								" data-method='delete' href='/products/" +
								id+"'>Destroy</a></td></tr>";

							//And temporarily appends it so it looks like it was added in real-time.
							$('tbody').append(new_product_row);

						}});
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