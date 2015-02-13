class CartsController < ApplicationController

	def index
		@cart = current_user.cart
	end

	def show

	end

end
