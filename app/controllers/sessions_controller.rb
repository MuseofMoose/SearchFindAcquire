class SessionsController < ApplicationController
	def new
	end

	def create
		user = User.find_by_email(params[:email])
		# Checks if e-mail exists AND password matches
		if user && user.authenticate(params[:password])
			# save user id
			session[:user_id] = user.id
			redirect_to '/'
		else
			# redirect to log in if it doesn't work
			redirect_to '/login'
			flash[:notice] = "Invalid e-mail/password combination. Please try again."
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/login'
		flash[:notice] = "You have successfully logged out of the system. For security reasons, you should close and reopen your browser."
	end

end