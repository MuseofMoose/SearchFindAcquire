// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



var ready = function(){
	var clicks = 0;
	$('body').on('mouseenter','.show-product',function(e){ //When the show button is hovered over...

		if(clicks===0){ //Used to prevent generation of duplicate popups.
			var floating_div = "<div class='popup-show'></div>"; //Creates the housing div.
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

		    	$('div.popup-show').append(review_string);
		    }});
	  	};
	});

	//Removes the show popup on mouseleave.
	$('body').on('mouseleave','.show-product',function(e){
		e.preventDefault();

		$('div.popup-show').remove();	
		clicks = 0; //Resets click so it can popup again when you re-mouseenter
	});

	//////////////////////////////////////////////////////////
	//Defines the click event of the create new item button.//
	//////////////////////////////////////////////////////////
	$('body').on('click','.new-product',function(e){
		e.preventDefault();

		var new_item_div = "<form class='popup-new'><h3 class='formhead'>New Product</h3>Name:<br><input type='text' id='product_name'><br>" +
			"Price in cents:<br><input type='number' id='product_price_in_cents'>" +
			"<br>Category:<br><input type='text' id='product_category'><br>Description:<br>	" +
			"<textarea id='product_description' rows='4' cols='22'></textarea><br>"+
			"<input type='submit' value='Submit' class='submit-new'>"+
			"<input type='submit' value='Close' class='close-new'></form>";
				
		$('body').append(new_item_div);

		$('input.close-new').click(function(e){
			e.preventDefault();
			$(this).closest("form").remove();
			clicks=0;
		});

		$('input.submit-new').click(function(e){
			e.preventDefault();

			//Stores all the values that have been entered into the form.
			var v_name = $(this).siblings("#product_name").val();
			var v_description = $(this).siblings("#product_description").val();
			var v_category = $(this).siblings("#product_category").val();

			//Also converts the price in cents into a formatted dollar price.
			var v_price_in_cents = $(this).siblings("#product_price_in_cents").val();
			var v_price_in_dollars = (v_price_in_cents)/100;
			var v_formatted_price = "$" + v_price_in_dollars.toFixed(2);


			if(clicks===0){
				clicks++;
				$.ajax({
					type: "POST",
					url: "/products/",
					data: { product: { name: v_name, description: v_description, price_in_cents: v_price_in_cents, category: v_category}},
					success: function(){
						$.ajax({type: "GET", url:'/products/', dataType: "JSON", success: function(data){ //Reads in the product page index json...
							var tablerow = data[data.length-1]; //selects the most recently added item...
							var id = tablerow["id"]; //and stores it's id number

							//Constructs an html element with all the info of the newly added product
							var new_product_row = "<tr class='product' product='"+ id +
								"'><td>" + v_name + "</td><td>" + v_description + "</td><td>" +
								v_formatted_price + "</td><td>" + v_category + "</td><td><a class='show-product' href='/products/" +
								id+"'>Show </a><a rel='nofollow' data-method='post' href='/cart/add/" +
								id+"'>Add To Cart </a><a href='/products/" +
								id+"/edit'>Edit </a><a data-confirm='Are you sure?' rel='nofollow'" +
								" data-method='delete' href='/products/" +
								id+"'>Delete</a></td></tr>";

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

			$('form.popup-new').remove();
			clicks=0;
		});
	});


	//////////////////////////////////////////////
	//Defines the click event of the edit button//
	//////////////////////////////////////////////

	$('body').on('click','.edit-product',function(e){
		e.preventDefault();

		var id_pathway = $(this).siblings('.show-product').attr('href');

		console.log(id_pathway);

		var edit_item_div = "<form class='popup-edit'><h3 class='formhead'>Edit Product</h3>Name:<br><input type='text' id='product_name'><br>" +
			"Price in cents:<br><input type='number' id='product_price_in_cents'>" +
			"<br>Category:<br><input type='text' id='product_category'><br>Description:<br>	" +
			"<textarea id='product_description' rows='4' cols='22'></textarea><br>"+
			"<input type='submit' value='Submit' class='submit-edit'>"+
			"<input type='submit' value='Close' class='close-edit'></form>";

		$('body').append(edit_item_div);

		$('input.close-edit').click(function(e){
			e.preventDefault();
			$(this).closest("form").remove();
			clicks=0;
		});

		$('input.submit-edit').click(function(e){
			e.preventDefault();

			//Stores all the values that have been entered into the form.
			var new_name = $(this).siblings("#product_name").val();
			var new_description = $(this).siblings("#product_description").val();
			var new_category = $(this).siblings("#product_category").val();

			//Also converts the price in cents into a formatted dollar price.
			var new_price_in_cents = $(this).siblings("#product_price_in_cents").val();
			var new_price_in_dollars = (new_price_in_cents)/100;
			var new_formatted_price = "$" + new_price_in_dollars.toFixed(2);

			console.log(id_pathway);
			if(clicks===0){
				$.ajax({
					type: "PUT",
					url: (id_pathway),
 					contentType: 'application/json',	
					dataType: 'json',
					data: JSON.stringify({name: new_name, description: new_description, price_in_cents: new_price_in_cents, category: new_category}),
					success: function(){
						$.ajax({type: "GET", url:'/products/', dataType: "JSON", success: function(data){ //Reads in the product page index json...
							var tablerow = data[data.length-1]; //selects the most recently added item...
							var id = tablerow["id"]; //and stores it's id number

							//Constructs an html element with all the info of the newly added product
							var edit_product_row = "<tr class='product' product='"+ id +
								"'><td>" + new_name + "</td><td>" + new_description + "</td><td>" +
								new_formatted_price + "</td><td>" + new_category + "</td><td><a class='show-product' href='/products/" +
								id+"'>Show </a><a rel='nofollow' data-method='post' href='/cart/add/" +
								id+"'>Add To Cart </a><a href='/products/" +
								id+"/edit'>Edit </a><a data-confirm='Are you sure?' rel='nofollow'" +
								" data-method='delete' href='/products/" +
								id+"'>Delete</a></td></tr>";


							//And temporarily appends it so it looks like it was added in real-time.
							$('.edit-product').closest("tr[product = '" + id + "']").replaceWith(edit_product_row);

						}});
					},
					error: function(request, error){
						alert('There was an error. Please try again.');
						console.log(arguments);
					}
				});
			};

			$('form.popup-edit').remove();
			clicks=0;
		});
	});
};

$(document).ready(ready);
$(document).on('page:load', ready);