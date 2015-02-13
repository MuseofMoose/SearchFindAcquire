class CartProductsController < ApplicationController
	before_action :set_cart_product
	
	def destroy
		@cart_product.destroy
	    respond_to do |format|  
	      format.html { redirect_to '/carts', notice: 'Product was successfully destroyed.' }
	      format.json { head :no_content }
	    end
	end

	def set_cart_product
	  @cart_product = CartProduct.find(params[:id])
	end
end